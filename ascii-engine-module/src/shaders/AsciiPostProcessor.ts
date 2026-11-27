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
import {
  extractSceneDirectionalVectors,
  NormalPassMaterialCache,
} from './normalMaps';

export interface PostProcessRenderMetrics {
  drawCalls: number;
  triangles: number;
}

/**
 * AsciiPostProcessor: Multi-pass GPU post-processing pipeline:
 * 1. Offscreen Scene Color + Depth RenderTarget (`HalfFloatType` + `DepthTexture`)
 * 2. Offscreen Normal-Map-Aware View-Space Normal RenderTarget (`NormalPassMaterialCache` —
 *    captures vertex normals + macro-filtered embedded/procedural normal maps across static & skinned meshes)
 * 3. Downsampled 13-tap Soft-Knee Bloom RenderTarget (contained typographic light halos)
 * 4. Full-screen 3D-Wrapping ASCII Composite Shader (view-space directional normal lighting,
 *    normal-perturbed ground reflections, sub-cell supersampling, and 5:8 glyph atlas)
 */
export class AsciiPostProcessor {
  private sceneTarget: THREE.WebGLRenderTarget;
  private normalTarget: THREE.WebGLRenderTarget;
  private bloomTarget: THREE.WebGLRenderTarget;
  private depthTexture: THREE.DepthTexture;

  private readonly normalPassCache = new NormalPassMaterialCache();
  private readonly bloomMaterial: THREE.ShaderMaterial;
  private readonly compositeMaterial: THREE.ShaderMaterial;
  private readonly transitionController = new ResolutionTransitionController(14.0);
  private readonly savedClearColor = new THREE.Color();

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
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
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
        uSceneTexelSize: { value: new THREE.Vector2(1 / w, 1 / h) },
        uCellPixelSize: { value: new THREE.Vector2(6, 10) },
        uCellCssSize: { value: 6.5 },
        uAtlasTileSize: {
          value: new THREE.Vector2(this.atlas.tileWidth, this.atlas.tileHeight),
        },
        uSubCellSpread: { value: 0.25 },
        uRampCount: { value: this.atlas.rampCount },
        uStructCount: { value: this.atlas.structuralCount },
        uBlockCount: { value: this.atlas.blockCount },
        uTotalGlyphs: { value: this.atlas.totalGlyphs },
        uHighlightGlyphs: {
          value: AsciiPostProcessor.resolveHighlightGlyphIndices(config.characterRamp),
        },
        uEdgeStrength: { value: config.edgeStrength },
        uBlockBlendWeight: { value: config.blockBlendWeight },
        uBloomIntensity: { value: config.bloomIntensity },
        uDofFocus: { value: config.dofFocusDistance },
        uDofStrength: { value: config.dofStrength },
        uDaylight: { value: config.atmosphere === 'day' ? 1.0 : 0.0 },
        uWetness: { value: AsciiPostProcessor.resolveWetness(config) },
        uReflectionStrength: { value: THREE.MathUtils.clamp(config.reflectionStrength ?? 0.25, 0, 1) },
        uCameraNear: { value: 0.1 },
        uCameraFar: { value: 140.0 },
        uVolumeWrapStrength: { value: config.mode === 'mascot' ? 0.0 : 1.0 },
        uNormalReliefStrength: { value: AsciiPostProcessor.resolveNormalRelief(config) },
        uKeyLightViewDir: { value: new THREE.Vector3(-0.48, 0.72, 0.50).normalize() },
        uRimLightViewDir: { value: new THREE.Vector3(0.58, 0.42, -0.70).normalize() },
        uWorldUpViewDir: { value: new THREE.Vector3(0.0, 0.78, 0.62).normalize() },
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
    if (config.atmosphere === 'day') return 0.08;
    return 0.55;
  }

  private static resolveNormalRelief(config: EngineConfig): number {
    if (config.mode === 'mascot') return 0.72;
    if (config.atmosphere === 'day') return 1.12;
    if (config.atmosphere === 'rain') return 1.06;
    return 1.0;
  }

  private static resolveHighlightGlyphIndices(ramp: string): THREE.Vector3 {
    const starIdx = ramp.indexOf('*');
    const orbIdx = ramp.indexOf('o');
    const plusIdx = ramp.indexOf('+');
    const fallbackMid = Math.max(0, Math.floor(ramp.length * 0.34));
    return new THREE.Vector3(
      starIdx >= 0 ? starIdx : fallbackMid,
      orbIdx >= 0 ? orbIdx : fallbackMid + 1,
      plusIdx >= 0 ? plusIdx : Math.max(0, fallbackMid - 2)
    );
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
    this.compositeMaterial.uniforms.uHighlightGlyphs!.value.copy(
      AsciiPostProcessor.resolveHighlightGlyphIndices(config.characterRamp)
    );
    oldAtlas.texture.dispose();
  }

  public applyResolutionProfile(
    profile: ResolutionProfile,
    config: EngineConfig,
    immediate = false
  ): void {
    const canvasW = Math.max(2, profile.physicalWidth);
    const canvasH = Math.max(2, profile.physicalHeight);
    const rtW = Math.max(2, profile.renderTargetWidth || canvasW);
    const rtH = Math.max(2, profile.renderTargetHeight || canvasH);

    this.currentBloomDownsample = profile.bloomDownsample;
    const bw = Math.max(2, Math.floor(canvasW / this.currentBloomDownsample));
    const bh = Math.max(2, Math.floor(canvasH / this.currentBloomDownsample));

    // Supersample 3D offscreen targets (sceneTarget + depthTexture + normalTarget at ~1.5x–2.0x)
    this.sceneTarget.setSize(rtW, rtH);
    this.normalTarget.setSize(rtW, rtH);
    this.bloomTarget.setSize(bw, bh);

    this.bloomMaterial.uniforms.uTexelSize!.value.set(1 / bw, 1 / bh);
    this.compositeMaterial.uniforms.uSceneTexelSize!.value.set(1 / rtW, 1 / rtH);
    this.compositeMaterial.uniforms.uResolution!.value.set(canvasW, canvasH);

    this.transitionController.setTarget(profile, immediate);
    const stepped = this.transitionController.step(0);
    this.compositeMaterial.uniforms.uCellPixelSize!.value.set(stepped.cellW, stepped.cellH);
    this.compositeMaterial.uniforms.uCellCssSize!.value = profile.activeCellSize;
    this.compositeMaterial.uniforms.uSubCellSpread!.value = stepped.subCellSpread;

    this.rebuildAtlasIfNeeded(config, profile.atlasTileSize, false);
  }

  public applyConfig(
    config: EngineConfig,
    forceAtlasRebuild = false,
    cssWidth = 640,
    cssHeight = 360,
    devicePixelRatio = 1,
    isCoarsePointer = false,
    deferResolution = false
  ): ResolutionProfile {
    const profile = computeAdaptiveResolution({
      cssWidth,
      cssHeight,
      devicePixelRatio,
      config,
      isCoarsePointer,
    });

    this.rebuildAtlasIfNeeded(config, profile.atlasTileSize, forceAtlasRebuild);
    if (!deferResolution) this.applyResolutionProfile(profile, config, true);

    this.bloomMaterial.uniforms.uThreshold!.value = config.bloomThreshold;
    this.compositeMaterial.uniforms.uEdgeStrength!.value = config.edgeStrength;
    this.compositeMaterial.uniforms.uBlockBlendWeight!.value = config.blockBlendWeight;
    this.compositeMaterial.uniforms.uBloomIntensity!.value = config.bloomIntensity;
    this.compositeMaterial.uniforms.uDofFocus!.value = config.dofFocusDistance;
    this.compositeMaterial.uniforms.uDofStrength!.value = config.dofStrength;
    this.compositeMaterial.uniforms.uDaylight!.value = config.atmosphere === 'day' ? 1.0 : 0.0;
    this.compositeMaterial.uniforms.uWetness!.value = AsciiPostProcessor.resolveWetness(config);
    this.compositeMaterial.uniforms.uReflectionStrength!.value = THREE.MathUtils.clamp(config.reflectionStrength ?? 0.25, 0, 1);
    this.compositeMaterial.uniforms.uVolumeWrapStrength!.value =
      config.mode === 'mascot' ? 0.0 : 1.0;
    this.compositeMaterial.uniforms.uNormalReliefStrength!.value =
      AsciiPostProcessor.resolveNormalRelief(config);

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

    // Extract view-space directional key/rim lights and true world-up vector with zero allocations
    extractSceneDirectionalVectors(
      scene,
      camera,
      this.compositeMaterial.uniforms.uKeyLightViewDir!.value as THREE.Vector3,
      this.compositeMaterial.uniforms.uRimLightViewDir!.value as THREE.Vector3,
      this.compositeMaterial.uniforms.uWorldUpViewDir!.value as THREE.Vector3
    );

    // Clamp supersampled 3D render targets if the active WebGL GPU reports a lower maxTextureSize
    const maxGpuTex = renderer.capabilities?.maxTextureSize;
    if (
      typeof maxGpuTex === 'number' &&
      maxGpuTex >= 512 &&
      (this.sceneTarget.width > maxGpuTex || this.sceneTarget.height > maxGpuTex)
    ) {
      const capScale = Math.min(
        maxGpuTex / this.sceneTarget.width,
        maxGpuTex / this.sceneTarget.height
      );
      const safeW = Math.max(2, Math.floor(this.sceneTarget.width * capScale));
      const safeH = Math.max(2, Math.floor(this.sceneTarget.height * capScale));
      this.sceneTarget.setSize(safeW, safeH);
      this.normalTarget.setSize(safeW, safeH);
      this.compositeMaterial.uniforms.uSceneTexelSize!.value.set(1 / safeW, 1 / safeH);
    }

    // Pass 1: Lit 3D Scene + Hardware DepthTexture
    renderer.setRenderTarget(this.sceneTarget);
    renderer.clear();
    renderer.render(scene, camera);

    const drawCalls = renderer.info.render.calls;
    const triangles = renderer.info.render.triangles;

    // Pass 2: Normal-Map-Aware View-Space Surface Normals (`MeshNormalMaterial` per normalMap)
    // Excludes alpha-blended billboard decals/foliage cards (`skipNormalPass`) & `Points`/`Line`
    // while capturing embedded glTF + procedural tangent-space normal relief at macro scale.
    const prevBackground = scene.background;
    const prevClearAlpha = renderer.getClearAlpha();
    renderer.getClearColor(this.savedClearColor);

    this.normalPassCache.beginPass(scene);
    scene.background = null;
    renderer.setRenderTarget(this.normalTarget);
    renderer.setClearColor(0x8080ff, 1);
    renderer.clear();
    renderer.render(scene, camera);
    this.normalPassCache.endPass();

    scene.background = prevBackground;
    renderer.setClearColor(this.savedClearColor, prevClearAlpha);

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

    this.normalPassCache.dispose();
    this.bloomMaterial.dispose();
    this.compositeMaterial.dispose();
    this.quadGeometry.dispose();
  }
}
