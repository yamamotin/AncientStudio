import * as THREE from 'three';
import {
  ASCII_COMPOSITE_FRAGMENT_SHADER,
  BLOOM_BLUR_FRAGMENT_SHADER,
  BLOOM_DOWNSAMPLE_FRAGMENT_SHADER,
  FULLSCREEN_VERTEX_SHADER,
} from './asciiShader';
import { createGlyphAtlas, type GlyphAtlasData } from './glyphAtlas';
import type { EngineConfig } from '../types';

/**
 * Self-contained WebGL multi-pass post-processor:
 *  Pass 1: 3D Scene -> Offscreen RGBA HalfFloat/UnsignedByte RenderTarget + DepthTexture
 *  Pass 2: Bright-pass extraction & downsample (1/3 resolution)
 *  Pass 3 & 4: Separable wide Gaussian/Kawase blur (H + V) so warm light bleeds across neighboring ASCII cells
 *  Pass 5: ASCII Realms Composite (DoF + Sobel structural glyphs + luminance ramp + bloom + color grading) -> Screen
 */
export class AsciiPostProcessor {
  private readonly quadScene: THREE.Scene;
  private readonly quadCamera: THREE.OrthographicCamera;
  private readonly quadGeometry: THREE.BufferGeometry;
  private readonly quadMesh: THREE.Mesh;

  private sceneTarget: THREE.WebGLRenderTarget;
  private depthTexture: THREE.DepthTexture;
  private bloomTargetA: THREE.WebGLRenderTarget;
  private bloomTargetB: THREE.WebGLRenderTarget;

  private atlasData: GlyphAtlasData;

  private readonly downsampleMaterial: THREE.ShaderMaterial;
  private readonly blurMaterial: THREE.ShaderMaterial;
  private readonly compositeMaterial: THREE.ShaderMaterial;

  private physicalWidth = 1;
  private physicalHeight = 1;
  private activeCellCssPx = 10;
  private pixelRatio = 1;

  constructor(config: EngineConfig) {
    this.quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quadScene = new THREE.Scene();

    // Single full-screen triangle/quad (PlaneGeometry 2x2)
    this.quadGeometry = new THREE.PlaneGeometry(2, 2);

    this.atlasData = createGlyphAtlas(
      config.characterRamp,
      config.structuralChars,
      config.fontFamily
    );

    this.depthTexture = new THREE.DepthTexture(2, 2);
    this.depthTexture.type = THREE.UnsignedIntType;
    this.depthTexture.minFilter = THREE.NearestFilter;
    this.depthTexture.magFilter = THREE.NearestFilter;

    this.sceneTarget = new THREE.WebGLRenderTarget(2, 2, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: true,
      stencilBuffer: false,
      depthTexture: this.depthTexture,
    });

    this.bloomTargetA = new THREE.WebGLRenderTarget(2, 2, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
    });

    this.bloomTargetB = new THREE.WebGLRenderTarget(2, 2, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
    });

    this.downsampleMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: BLOOM_DOWNSAMPLE_FRAGMENT_SHADER,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        tScene: { value: this.sceneTarget.texture },
        uTexelSize: { value: new THREE.Vector2(1 / 2, 1 / 2) },
        uThreshold: { value: config.bloomThreshold },
        uTime: { value: 0 },
      },
    });

    this.blurMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: BLOOM_BLUR_FRAGMENT_SHADER,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        tInput: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / 2, 1 / 2) },
        uDirection: { value: new THREE.Vector2(1, 0) },
      },
    });

    const bgColor = new THREE.Color(config.palette.background);

    this.compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: ASCII_COMPOSITE_FRAGMENT_SHADER,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        tScene: { value: this.sceneTarget.texture },
        tDepth: { value: this.depthTexture },
        tBloom: { value: this.bloomTargetA.texture },
        tGlyphAtlas: { value: this.atlasData.texture },
        uResolution: { value: new THREE.Vector2(2, 2) },
        uCellSize: { value: new THREE.Vector2(8, 10) },
        uRampCount: { value: this.atlasData.rampCount },
        uStructuralCount: { value: this.atlasData.structuralCount },
        uTotalGlyphs: { value: this.atlasData.totalGlyphs },
        uCameraNear: { value: 0.5 },
        uCameraFar: { value: 110.0 },
        uDofFocus: { value: config.dofFocusDistance },
        uDofStrength: { value: config.dofStrength },
        uEdgeStrength: { value: config.edgeStrength },
        uBloomIntensity: { value: config.bloomIntensity },
        uBgColor: { value: bgColor },
        uTime: { value: 0 },
      },
    });

    this.quadMesh = new THREE.Mesh(this.quadGeometry, this.compositeMaterial);
    this.quadMesh.frustumCulled = false;
    this.quadScene.add(this.quadMesh);
  }

  /**
   * Computes responsive ASCII cell size and resizes offscreen render targets.
   */
  public setSize(
    cssWidth: number,
    cssHeight: number,
    pixelRatio: number,
    config: EngineConfig
  ): { activeCellSize: number; columns: number; rows: number } {
    this.pixelRatio = pixelRatio;
    this.physicalWidth = Math.max(2, Math.floor(cssWidth * pixelRatio));
    this.physicalHeight = Math.max(2, Math.floor(cssHeight * pixelRatio));

    this.sceneTarget.setSize(this.physicalWidth, this.physicalHeight);

    const bloomWidth = Math.max(2, Math.floor(this.physicalWidth / 3));
    const bloomHeight = Math.max(2, Math.floor(this.physicalHeight / 3));
    this.bloomTargetA.setSize(bloomWidth, bloomHeight);
    this.bloomTargetB.setSize(bloomWidth, bloomHeight);

    this.downsampleMaterial.uniforms.uTexelSize.value.set(
      1 / this.physicalWidth,
      1 / this.physicalHeight
    );
    this.blurMaterial.uniforms.uTexelSize.value.set(1 / bloomWidth, 1 / bloomHeight);
    this.compositeMaterial.uniforms.uResolution.value.set(
      this.physicalWidth,
      this.physicalHeight
    );

    return this.recomputeCellGrid(cssWidth, cssHeight, config);
  }

  public recomputeCellGrid(
    cssWidth: number,
    cssHeight: number,
    config: EngineConfig
  ): { activeCellSize: number; columns: number; rows: number } {
    let cellCss = Math.max(5, Math.min(28, config.cellSize));
    const minDim = Math.min(cssWidth, cssHeight);

    if (config.autoResponsiveDensity) {
      // Automatically adapt character cell size on mobile & ultra-compact containers
      // so glyphs remain crisp, legible, and maintain rock-solid 60 FPS
      if (cssWidth < 480 || minDim < 340) {
        cellCss = Math.max(cellCss, Math.round(config.cellSize * 1.25));
      } else if (cssWidth < 768 || minDim < 460) {
        cellCss = Math.max(cellCss, Math.round(config.cellSize * 1.12));
      } else if (cssWidth > 1800) {
        cellCss = Math.max(7, Math.round(config.cellSize * 0.95));
      }
    }

    this.activeCellCssPx = cellCss;

    // Monospace cells look most authentic with slightly taller aspect (~0.82 : 1.0)
    const cellPhysH = Math.max(4, Math.round(cellCss * this.pixelRatio));
    const cellPhysW = Math.max(4, Math.round(cellCss * 0.84 * this.pixelRatio));

    this.compositeMaterial.uniforms.uCellSize.value.set(cellPhysW, cellPhysH);

    const columns = Math.max(1, Math.floor(this.physicalWidth / cellPhysW));
    const rows = Math.max(1, Math.floor(this.physicalHeight / cellPhysH));

    return {
      activeCellSize: this.activeCellCssPx,
      columns,
      rows,
    };
  }

  /**
   * Updates shader uniforms or regenerates the glyph atlas when config changes dynamically.
   */
  public applyConfig(
    config: EngineConfig,
    rebuildAtlas: boolean,
    cssWidth: number,
    cssHeight: number
  ): { activeCellSize: number; columns: number; rows: number } {
    if (rebuildAtlas) {
      const oldAtlas = this.atlasData;
      this.atlasData = createGlyphAtlas(
        config.characterRamp,
        config.structuralChars,
        config.fontFamily
      );
      this.compositeMaterial.uniforms.tGlyphAtlas.value = this.atlasData.texture;
      this.compositeMaterial.uniforms.uRampCount.value = this.atlasData.rampCount;
      this.compositeMaterial.uniforms.uStructuralCount.value = this.atlasData.structuralCount;
      this.compositeMaterial.uniforms.uTotalGlyphs.value = this.atlasData.totalGlyphs;
      oldAtlas.texture.dispose();
    }

    this.downsampleMaterial.uniforms.uThreshold.value = config.bloomThreshold;
    this.compositeMaterial.uniforms.uBloomIntensity.value = config.bloomIntensity;
    this.compositeMaterial.uniforms.uDofFocus.value = config.dofFocusDistance;
    this.compositeMaterial.uniforms.uDofStrength.value = config.dofStrength;
    this.compositeMaterial.uniforms.uEdgeStrength.value = config.edgeStrength;
    this.compositeMaterial.uniforms.uBgColor.value.set(config.palette.background);

    return this.recomputeCellGrid(cssWidth, cssHeight, config);
  }

  /**
   * Renders the 3D scene into the offscreen target, runs bloom passes, and composites ASCII glyphs.
   */
  public render(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    elapsedSeconds: number
  ): { drawCalls: number; triangles: number } {
    this.compositeMaterial.uniforms.uCameraNear.value = camera.near;
    this.compositeMaterial.uniforms.uCameraFar.value = camera.far;
    this.compositeMaterial.uniforms.uTime.value = elapsedSeconds;
    this.downsampleMaterial.uniforms.uTime.value = elapsedSeconds;

    // Pass 1: Render 3D world + depth texture
    renderer.setRenderTarget(this.sceneTarget);
    renderer.clear(true, true, false);
    renderer.render(scene, camera);

    const drawCalls = renderer.info.render.calls;
    const triangles = renderer.info.render.triangles;

    // Pass 2: Bright-pass extraction & downsample into bloomTargetA
    this.quadMesh.material = this.downsampleMaterial;
    renderer.setRenderTarget(this.bloomTargetA);
    renderer.render(this.quadScene, this.quadCamera);

    // Pass 3: Horizontal wide blur (bloomTargetA -> bloomTargetB)
    this.quadMesh.material = this.blurMaterial;
    this.blurMaterial.uniforms.tInput.value = this.bloomTargetA.texture;
    this.blurMaterial.uniforms.uDirection.value.set(1.35, 0.0);
    renderer.setRenderTarget(this.bloomTargetB);
    renderer.render(this.quadScene, this.quadCamera);

    // Pass 4: Vertical wide blur (bloomTargetB -> bloomTargetA)
    this.blurMaterial.uniforms.tInput.value = this.bloomTargetB.texture;
    this.blurMaterial.uniforms.uDirection.value.set(0.0, 1.35);
    renderer.setRenderTarget(this.bloomTargetA);
    renderer.render(this.quadScene, this.quadCamera);

    // Pass 5: Final ASCII composite to canvas backbuffer
    this.quadMesh.material = this.compositeMaterial;
    renderer.setRenderTarget(null);
    renderer.render(this.quadScene, this.quadCamera);

    return { drawCalls, triangles };
  }

  /**
   * Releases all GPU framebuffers, textures, shader programs, and quad geometry.
   */
  public dispose(): void {
    this.quadScene.remove(this.quadMesh);
    this.quadGeometry.dispose();
    this.downsampleMaterial.dispose();
    this.blurMaterial.dispose();
    this.compositeMaterial.dispose();

    this.atlasData.texture.dispose();
    this.depthTexture.dispose();
    this.sceneTarget.dispose();
    this.bloomTargetA.dispose();
    this.bloomTargetB.dispose();
  }
}
