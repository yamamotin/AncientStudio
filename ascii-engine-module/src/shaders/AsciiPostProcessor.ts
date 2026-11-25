import * as THREE from 'three';
import {
  computeAdaptiveResolution,
  ResolutionTransitionController,
} from '../core/ResolutionController';
import {
  ASCII_COMPOSITE_FRAGMENT_SHADER,
  BLOOM_BLUR_FRAGMENT_SHADER,
  BLOOM_DOWNSAMPLE_FRAGMENT_SHADER,
  FULLSCREEN_VERTEX_SHADER,
} from './asciiShader';
import { createGlyphAtlas, type GlyphAtlasData } from './glyphAtlas';
import type { EngineConfig, ResolutionProfile } from '../types';

/**
 * Self-contained WebGL multi-pass post-processor:
 *  Pass 1: 3D Scene -> Offscreen RGBA HalfFloat RenderTarget + DepthTexture
 *  Pass 2: Bright-pass extraction & downsample (1/3 desktop, 1/4 mobile)
 *  Pass 3 & 4: Separable wide Gaussian/Kawase blur (H + V) so neon light bleeds across neighboring ASCII cells
 *  Pass 5: High-Resolution Adaptive ASCII Composite (center-anchored smooth cell-size transition + 5-tap sub-cell supersampling + DoF + Sobel structural glyphs)
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
  private readonly transitionController: ResolutionTransitionController;

  private lastProfile: ResolutionProfile | null = null;
  private allocatedPhysW = 2;
  private allocatedPhysH = 2;
  private allocatedBloomW = 2;
  private allocatedBloomH = 2;

  constructor(config: EngineConfig) {
    this.quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quadScene = new THREE.Scene();
    this.quadGeometry = new THREE.PlaneGeometry(2, 2);
    this.transitionController = new ResolutionTransitionController(14.0);

    this.atlasData = createGlyphAtlas(
      config.characterRamp,
      config.structuralChars,
      config.fontFamily,
      64
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
        uCellSize: { value: new THREE.Vector2(8, 13) },
        uAtlasTileSize: {
          value: new THREE.Vector2(this.atlasData.tileWidth, this.atlasData.tileHeight),
        },
        uSubCellSpread: { value: 0.22 },
        uTransitionMix: { value: 0.0 },
        uRampCount: { value: this.atlasData.rampCount },
        uStructuralCount: { value: this.atlasData.structuralCount },
        uBlockCount: { value: this.atlasData.blockCount },
        uTotalGlyphs: { value: this.atlasData.totalGlyphs },
        uCameraNear: { value: 0.5 },
        uCameraFar: { value: 110.0 },
        uDofFocus: { value: config.dofFocusDistance },
        uDofStrength: { value: config.dofStrength },
        uEdgeStrength: { value: config.edgeStrength },
        uBlockBlendWeight: { value: config.blockBlendWeight },
        uBloomIntensity: { value: config.bloomIntensity },
        uDaylight: { value: config.atmosphere === 'day' ? 1.0 : 0.0 },
        uBgColor: { value: bgColor },
        uTime: { value: 0 },
      },
    });

    this.quadMesh = new THREE.Mesh(this.quadGeometry, this.compositeMaterial);
    this.quadMesh.frustumCulled = false;
    this.quadScene.add(this.quadMesh);
  }

  /**
   * Applies an adaptive `ResolutionProfile` to offscreen render targets (skipping redundant GPU
   * reallocations when dimensions are unchanged) and feeds smooth cell-density interpolation.
   */
  public applyResolutionProfile(
    profile: ResolutionProfile,
    config: EngineConfig,
    immediate = false
  ): ResolutionProfile {
    this.lastProfile = profile;

    if (
      this.allocatedPhysW !== profile.physicalWidth ||
      this.allocatedPhysH !== profile.physicalHeight
    ) {
      this.allocatedPhysW = profile.physicalWidth;
      this.allocatedPhysH = profile.physicalHeight;
      this.sceneTarget.setSize(profile.physicalWidth, profile.physicalHeight);
    }

    const bloomWidth = Math.max(2, Math.floor(profile.physicalWidth / profile.bloomDownsample));
    const bloomHeight = Math.max(2, Math.floor(profile.physicalHeight / profile.bloomDownsample));
    if (this.allocatedBloomW !== bloomWidth || this.allocatedBloomH !== bloomHeight) {
      this.allocatedBloomW = bloomWidth;
      this.allocatedBloomH = bloomHeight;
      this.bloomTargetA.setSize(bloomWidth, bloomHeight);
      this.bloomTargetB.setSize(bloomWidth, bloomHeight);
    }

    this.downsampleMaterial.uniforms.uTexelSize.value.set(
      1 / profile.physicalWidth,
      1 / profile.physicalHeight
    );
    this.blurMaterial.uniforms.uTexelSize.value.set(1 / bloomWidth, 1 / bloomHeight);
    this.compositeMaterial.uniforms.uResolution.value.set(
      profile.physicalWidth,
      profile.physicalHeight
    );

    this.transitionController.setTarget(profile, immediate);
    const initialStep = this.transitionController.step(0);
    this.compositeMaterial.uniforms.uCellSize.value.set(initialStep.cellW, initialStep.cellH);
    this.compositeMaterial.uniforms.uSubCellSpread.value = initialStep.subCellSpread;
    this.compositeMaterial.uniforms.uTransitionMix.value = initialStep.transitionMix;

    // Upgrade or downgrade 2D Canvas glyph atlas resolution when moving between 1x and HiDPI/Retina
    if (this.atlasData.tileSize !== profile.atlasTileSize) {
      this.rebuildGlyphAtlas(config, profile.atlasTileSize);
    }

    return profile;
  }

  /**
   * Backward-compatible resize entry computing an adaptive profile directly.
   */
  public setSize(
    cssWidth: number,
    cssHeight: number,
    devicePixelRatio: number,
    config: EngineConfig,
    isCoarsePointer = false
  ): ResolutionProfile {
    const profile = computeAdaptiveResolution({
      cssWidth,
      cssHeight,
      devicePixelRatio,
      config,
      isCoarsePointer,
    });
    return this.applyResolutionProfile(profile, config);
  }

  /**
   * Updates shader uniforms or regenerates the glyph atlas when config changes dynamically.
   */
  public applyConfig(
    config: EngineConfig,
    rebuildAtlas: boolean,
    cssWidth: number,
    cssHeight: number,
    devicePixelRatio = 1,
    isCoarsePointer = false
  ): ResolutionProfile {
    const profile = computeAdaptiveResolution({
      cssWidth,
      cssHeight,
      devicePixelRatio: this.lastProfile?.effectiveDpr ?? devicePixelRatio,
      config,
      isCoarsePointer,
    });

    if (rebuildAtlas || this.atlasData.tileSize !== profile.atlasTileSize) {
      this.rebuildGlyphAtlas(config, profile.atlasTileSize);
    }

    this.downsampleMaterial.uniforms.uThreshold.value = config.bloomThreshold;
    this.compositeMaterial.uniforms.uBloomIntensity.value = config.bloomIntensity;
    this.compositeMaterial.uniforms.uDofFocus.value = config.dofFocusDistance;
    this.compositeMaterial.uniforms.uDofStrength.value = config.dofStrength;
    this.compositeMaterial.uniforms.uEdgeStrength.value = config.edgeStrength;
    this.compositeMaterial.uniforms.uBlockBlendWeight.value = config.blockBlendWeight;
    this.compositeMaterial.uniforms.uDaylight.value = config.atmosphere === 'day' ? 1.0 : 0.0;
    this.compositeMaterial.uniforms.uBgColor.value.set(config.palette.background);

    return this.applyResolutionProfile(profile, config, false);
  }

  private rebuildGlyphAtlas(config: EngineConfig, tileSize: number): void {
    const oldAtlas = this.atlasData;
    this.atlasData = createGlyphAtlas(
      config.characterRamp,
      config.structuralChars,
      config.fontFamily,
      tileSize
    );
    this.compositeMaterial.uniforms.tGlyphAtlas.value = this.atlasData.texture;
    this.compositeMaterial.uniforms.uAtlasTileSize.value.set(
      this.atlasData.tileWidth,
      this.atlasData.tileHeight
    );
    this.compositeMaterial.uniforms.uRampCount.value = this.atlasData.rampCount;
    this.compositeMaterial.uniforms.uStructuralCount.value = this.atlasData.structuralCount;
    this.compositeMaterial.uniforms.uBlockCount.value = this.atlasData.blockCount;
    this.compositeMaterial.uniforms.uTotalGlyphs.value = this.atlasData.totalGlyphs;
    oldAtlas.texture.dispose();
  }

  public render(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    elapsedSeconds: number,
    dtSeconds = 1 / 60
  ): { drawCalls: number; triangles: number } {
    // Advance smooth resolution / cell-density transition
    const tr = this.transitionController.step(dtSeconds);
    this.compositeMaterial.uniforms.uCellSize.value.set(tr.cellW, tr.cellH);
    this.compositeMaterial.uniforms.uSubCellSpread.value = tr.subCellSpread;
    this.compositeMaterial.uniforms.uTransitionMix.value = tr.transitionMix;

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
