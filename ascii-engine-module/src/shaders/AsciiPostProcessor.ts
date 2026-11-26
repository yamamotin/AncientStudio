import * as THREE from 'three';
import {
  computeAdaptiveResolution,
  ResolutionTransitionController,
} from '../core/ResolutionController';
import type { EngineConfig, ResolutionProfile } from '../types';
import {
  ASCII_COMPOSITE_FRAGMENT_SHADER,
  BLOOM_EXTRACT_FRAGMENT_SHADER,
  FULLSCREEN_VERTEX_SHADER,
} from './asciiShader';
import { createGlyphAtlas, type GlyphAtlasData } from './glyphAtlas';

export interface PostProcessRenderMetrics {
  drawCalls: number;
  triangles: number;
}

/**
 * AsciiPostProcessor: Multi-pass GPU post-processing pipeline:
 * 1. Offscreen Scene Color + Depth RenderTarget (`HalfFloatType` + `DepthTexture`)
 * 2. Offscreen View-Space Normal RenderTarget (`MeshNormalMaterial` — supports both static & skinned glTF meshes)
 * 3. Downsampled 13-tap Soft-Knee Bloom RenderTarget (contained typographic light halos)
 * 4. Full-screen 3D-Wrapping ASCII Composite Shader (sub-cell supersampling + glyph-variety hash
 *    + Linear-Depth/Normal Sobel + vertical rippled ground reflections + 5:8 glyph atlas)
 */
export class AsciiPostProcessor {
  private sceneTarget: THREE.WebGLRenderTarget;
  private normalTarget: THREE.WebGLRenderTarget;
  private bloomTarget: THREE.WebGLRenderTarget;
  private depthTexture: THREE.DepthTexture;

  private readonly normalMaterial: THREE.MeshNormalMaterial;
  private readonly bloomMaterial: THREE.ShaderMaterial;
  private readonly compositeMaterial: THREE.ShaderMaterial;
  private readonly transitionController = new ResolutionTransitionController(14.0);
  private readonly camWorldDir = new THREE.Vector3();
  private readonly tempHiddenNormalObjs: THREE.Object3D[] = [];

  private readonly quadGeometry: THREE.PlaneGeometry;
  private readonly bloomQuad: THREE.Mesh;
  private readonly compositeQuad: THREE.Mesh;
  private readonly postScene: THREE.Scene;
  private readonly bloomScene: THREE.Scene;
  private readonly orthoCamera: THREE.OrthographicCamera;

  private atlas: GlyphAtlasData;
  private currentAtlasSignature = '';
  private currentBloomDownsample = 3;

  constructor(
    configOrWidth: EngineConfig | number,
    initialHeight?: number,
    maybeConfig?: EngineConfig,
    initialTileSize = 64
  ) {
    const isShortCtor = typeof configOrWidth === 'object';
    const config = isShortCtor ? configOrWidth : maybeConfig!;
    const w = Math.max(2, Math.floor(isShortCtor ? 320 : configOrWidth));
    const h = Math.max(2, Math.floor(isShortCtor ? 240 : (initialHeight ?? 240)));

    this.depthTexture = new THREE.DepthTexture(w, h);
    this.depthTexture.type = THREE.UnsignedInt248Type;
    this.depthTexture.format = THREE.DepthStencilFormat;

    this.sceneTarget = new THREE.WebGLRenderTarget(w, h, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthTexture: this.depthTexture,
      depthBuffer: true,
    });

    this.normalTarget = new THREE.WebGLRenderTarget(w, h, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: true,
    });

    const bw = Math.max(2, Math.floor(w / this.currentBloomDownsample));
    const bh = Math.max(2, Math.floor(h / this.currentBloomDownsample));
    this.bloomTarget = new THREE.WebGLRenderTarget(bw, bh, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
    });

    this.normalMaterial = new THREE.MeshNormalMaterial();

    this.atlas = createGlyphAtlas(
      config.characterRamp,
      config.structuralChars,
      config.fontFamily,
      initialTileSize
    );
    this.currentAtlasSignature = this.computeAtlasSignature(config, initialTileSize);

    this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quadGeometry = new THREE.PlaneGeometry(2, 2);

    this.bloomMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: BLOOM_EXTRACT_FRAGMENT_SHADER,
      uniforms: {
        tScene: { value: this.sceneTarget.texture },
        uTexelSize: { value: new THREE.Vector2(1 / w, 1 / h) },
        uThreshold: { value: config.bloomThreshold },
      },
      depthTest: false,
      depthWrite: false,
    });

    const bg = new THREE.Color(config.palette.background);
    const cool = new THREE.Color(config.palette.coolAmbient);
    const warm = new THREE.Color(config.palette.warmLight);

    this.compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: ASCII_COMPOSITE_FRAGMENT_SHADER,
      uniforms: {
        tScene: { value: this.sceneTarget.texture },
        tNormal: { value: this.normalTarget.texture },
        tDepth: { value: this.depthTexture },
        tBloom: { value: this.bloomTarget.texture },
        tGlyphAtlas: { value: this.atlas.texture },
        uResolution: { value: new THREE.Vector2(w, h) },
        uCellPixelSize: { value: new THREE.Vector2(6, 10) },
        uAtlasTileSize: {
          value: new THREE.Vector2(this.atlas.tileWidth, this.atlas.tileHeight),
        },
        uSubCellSpread: { value: 0.22 },
        uRampCount: { value: this.atlas.rampCount },
        uStructCount: { value: this.atlas.structuralCount },
        uBlockCount: { value: this.atlas.blockCount },
        uTotalGlyphs: { value: this.atlas.totalGlyphs },
        uEdgeStrength: { value: config.edgeStrength },
        uBlockBlendWeight: { value: config.blockBlendWeight },
        uBloomIntensity: { value: config.bloomIntensity },
        uDofFocus: { value: config.dofFocusDistance },
        uDofStrength: { value: config.dofStrength },
        uDaylight: { value: config.atmosphere === 'day' ? 1.0 : 0.0 },
        uWetness: { value: AsciiPostProcessor.resolveWetness(config) },
        uCamPitchCos: { value: 0.75 },
        uCamPitchSin: { value: 0.66 },
        uCameraNear: { value: 0.1 },
        uCameraFar: { value: 140.0 },
        uVolumeWrapStrength: { value: config.mode === 'mascot' ? 0.0 : 1.0 },
        uBgColor: { value: bg },
        uCoolTint: { value: cool },
        uWarmTint: { value: warm },
        uTime: { value: 0 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this.bloomQuad = new THREE.Mesh(this.quadGeometry, this.bloomMaterial);
    this.bloomScene = new THREE.Scene();
    this.bloomScene.add(this.bloomQuad);

    this.compositeQuad = new THREE.Mesh(this.quadGeometry, this.compositeMaterial);
    this.postScene = new THREE.Scene();
    this.postScene.add(this.compositeQuad);
  }

  private static resolveWetness(config: EngineConfig): number {
    if (config.mode === 'mascot') return 0.0;
    if (config.atmosphere === 'rain') return 1.0;
    if (config.atmosphere === 'day') return 0.22;
    return 0.62;
  }

  private computeAtlasSignature(config: EngineConfig, tileSize: number): string {
    return `${config.characterRamp}::${config.structuralChars}::${config.fontFamily}::${tileSize}`;
  }

  private rebuildAtlasIfNeeded(config: EngineConfig, tileSize: number, force = false): void {
    const nextSig = this.computeAtlasSignature(config, tileSize);
    if (!force && nextSig === this.currentAtlasSignature) return;

    const oldAtlas = this.atlas;
    this.atlas = createGlyphAtlas(
      config.characterRamp,
      config.structuralChars,
      config.fontFamily,
      tileSize
    );
    this.currentAtlasSignature = nextSig;

    this.compositeMaterial.uniforms.tGlyphAtlas!.value = this.atlas.texture;
    this.compositeMaterial.uniforms.uAtlasTileSize!.value.set(
      this.atlas.tileWidth,
      this.atlas.tileHeight
    );
    this.compositeMaterial.uniforms.uRampCount!.value = this.atlas.rampCount;
    this.compositeMaterial.uniforms.uStructCount!.value = this.atlas.structuralCount;
    this.compositeMaterial.uniforms.uBlockCount!.value = this.atlas.blockCount;
    this.compositeMaterial.uniforms.uTotalGlyphs!.value = this.atlas.totalGlyphs;
    oldAtlas.texture.dispose();
  }

  public applyResolutionProfile(
    profile: ResolutionProfile,
    config: EngineConfig,
    immediate = false
  ): void {
    const w = Math.max(2, profile.physicalWidth);
    const h = Math.max(2, profile.physicalHeight);

    this.currentBloomDownsample = profile.bloomDownsample;
    const bw = Math.max(2, Math.floor(w / this.currentBloomDownsample));
    const bh = Math.max(2, Math.floor(h / this.currentBloomDownsample));

    this.sceneTarget.setSize(w, h);
    this.normalTarget.setSize(w, h);
    this.bloomTarget.setSize(bw, bh);

    this.bloomMaterial.uniforms.uTexelSize!.value.set(1 / w, 1 / h);
    this.compositeMaterial.uniforms.uResolution!.value.set(w, h);

    this.transitionController.setTarget(profile, immediate);
    const stepped = this.transitionController.step(0);
    this.compositeMaterial.uniforms.uCellPixelSize!.value.set(stepped.cellW, stepped.cellH);
    this.compositeMaterial.uniforms.uSubCellSpread!.value = stepped.subCellSpread;

    this.rebuildAtlasIfNeeded(config, profile.atlasTileSize, false);
  }

  public applyConfig(
    config: EngineConfig,
    forceAtlasRebuild = false,
    cssWidth = 640,
    cssHeight = 360,
    devicePixelRatio = 1,
    isCoarsePointer = false
  ): ResolutionProfile {
    const profile = computeAdaptiveResolution({
      cssWidth,
      cssHeight,
      devicePixelRatio,
      config,
      isCoarsePointer,
    });

    this.rebuildAtlasIfNeeded(config, profile.atlasTileSize, forceAtlasRebuild);
    this.transitionController.setTarget(profile, true);
    this.compositeMaterial.uniforms.uCellPixelSize!.value.set(
      profile.cellPhysW,
      profile.cellPhysH
    );
    this.compositeMaterial.uniforms.uSubCellSpread!.value = profile.subCellSampleSpread;

    this.bloomMaterial.uniforms.uThreshold!.value = config.bloomThreshold;
    this.compositeMaterial.uniforms.uEdgeStrength!.value = config.edgeStrength;
    this.compositeMaterial.uniforms.uBlockBlendWeight!.value = config.blockBlendWeight;
    this.compositeMaterial.uniforms.uBloomIntensity!.value = config.bloomIntensity;
    this.compositeMaterial.uniforms.uDofFocus!.value = config.dofFocusDistance;
    this.compositeMaterial.uniforms.uDofStrength!.value = config.dofStrength;
    this.compositeMaterial.uniforms.uDaylight!.value = config.atmosphere === 'day' ? 1.0 : 0.0;
    this.compositeMaterial.uniforms.uWetness!.value = AsciiPostProcessor.resolveWetness(config);
    this.compositeMaterial.uniforms.uVolumeWrapStrength!.value =
      config.mode === 'mascot' ? 0.0 : 1.0;

    (this.compositeMaterial.uniforms.uBgColor!.value as THREE.Color).set(
      config.palette.background
    );
    (this.compositeMaterial.uniforms.uCoolTint!.value as THREE.Color).set(
      config.palette.coolAmbient
    );
    (this.compositeMaterial.uniforms.uWarmTint!.value as THREE.Color).set(
      config.palette.warmLight
    );

    return profile;
  }

  public render(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    elapsedSeconds: number,
    dt = 0
  ): PostProcessRenderMetrics {
    this.compositeMaterial.uniforms.uTime!.value = elapsedSeconds;

    if (dt > 0) {
      const stepped = this.transitionController.step(dt);
      this.compositeMaterial.uniforms.uCellPixelSize!.value.set(stepped.cellW, stepped.cellH);
      this.compositeMaterial.uniforms.uSubCellSpread!.value = stepped.subCellSpread;
    }

    const persp = camera as THREE.PerspectiveCamera;
    if (persp.isPerspectiveCamera) {
      this.compositeMaterial.uniforms.uCameraNear!.value = persp.near;
      this.compositeMaterial.uniforms.uCameraFar!.value = persp.far;
    }

    // Extract camera downward pitch sin/cos so view-space normals reconstruct upward ground planes
    camera.getWorldDirection(this.camWorldDir);
    const pitchSin = THREE.MathUtils.clamp(-this.camWorldDir.y, -0.99, 0.99);
    const pitchCos = Math.sqrt(Math.max(0.01, 1 - pitchSin * pitchSin));
    this.compositeMaterial.uniforms.uCamPitchSin!.value = pitchSin;
    this.compositeMaterial.uniforms.uCamPitchCos!.value = pitchCos;

    // Pass 1: Lit 3D Scene + Hardware DepthTexture
    renderer.setRenderTarget(this.sceneTarget);
    renderer.clear();
    renderer.render(scene, camera);

    const drawCalls = renderer.info.render.calls;
    const triangles = renderer.info.render.triangles;

    // Pass 2: View-Space Surface Normals (supports both static meshes & SkinnedMesh character)
    // Exclude alpha-blended billboard decals/foliage cards (`skipNormalPass`) & `Points` so opaque
    // rectangular quad bounds never pollute Sobel contours or upward ground reflection normals.
    this.tempHiddenNormalObjs.length = 0;
    scene.traverseVisible((obj) => {
      if (obj.userData?.skipNormalPass === true || (obj as THREE.Points).isPoints) {
        this.tempHiddenNormalObjs.push(obj);
      }
    });
    for (let i = 0; i < this.tempHiddenNormalObjs.length; i++) {
      this.tempHiddenNormalObjs[i]!.visible = false;
    }

    const prevOverride = scene.overrideMaterial;
    const prevBackground = scene.background;
    scene.overrideMaterial = this.normalMaterial;
    scene.background = null;
    renderer.setRenderTarget(this.normalTarget);
    renderer.setClearColor(0x8080ff, 1);
    renderer.clear();
    renderer.render(scene, camera);
    scene.overrideMaterial = prevOverride;
    scene.background = prevBackground;

    for (let i = 0; i < this.tempHiddenNormalObjs.length; i++) {
      this.tempHiddenNormalObjs[i]!.visible = true;
    }
    this.tempHiddenNormalObjs.length = 0;

    // Pass 3: Soft-Knee Bloom Extract
    renderer.setRenderTarget(this.bloomTarget);
    renderer.clear();
    renderer.render(this.bloomScene, this.orthoCamera);

    // Pass 4: Full-Screen 3D-Wrapping ASCII Composite to Canvas
    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(this.postScene, this.orthoCamera);

    return { drawCalls, triangles };
  }

  public dispose(): void {
    this.sceneTarget.dispose();
    this.normalTarget.dispose();
    this.bloomTarget.dispose();
    this.depthTexture.dispose();
    this.atlas.texture.dispose();

    this.normalMaterial.dispose();
    this.bloomMaterial.dispose();
    this.compositeMaterial.dispose();
    this.quadGeometry.dispose();
  }
}
