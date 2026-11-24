import * as THREE from 'three';
import { AnimationSystem } from '../animation/AnimationSystem';
import { DEFAULT_ENGINE_CONFIG, mergeEngineConfig } from './defaultConfig';
import { EngineLoop } from './EngineLoop';
import { LifecycleManager } from './LifecycleManager';
import { computeAdaptiveResolution } from './ResolutionController';
import {
  InputSystem,
  MovementRotationSystem,
  NeonPulseSystem,
  PatrolSystem,
  RenderSyncSystem,
  SystemRunner,
} from '../ecs/SystemRunner';
import { type EntityId, World } from '../ecs/World';
import { TuxEntityFactory } from '../entities/TuxEntityFactory';
import { KeyboardInput } from '../input/KeyboardInput';
import { PointerInput } from '../input/PointerInput';
import { AsciiPostProcessor } from '../shaders/AsciiPostProcessor';
import type {
  EngineConfig,
  EngineLifecycleState,
  EngineStats,
  PartialEngineConfig,
  ResolutionTier,
} from '../types';
import { VfxController } from '../vfx/VfxController';
import { MapLoader } from '../world/MapLoader';
import { type BuiltPlaygroundScene, PlaygroundSceneBuilder } from '../world/PlaygroundSceneBuilder';

/**
 * AsciiEngineCore: Modular WebGL2 runtime orchestrating:
 * - `EngineLoop` (clamped deltaTime, zero-jump pause/resume, FPS cap & telemetry)
 * - `LifecycleManager` (rAF-coalesced ResizeObserver, Fullscreen observer, IntersectionObserver, Page Visibility, leak-free `.dispose()`)
 * - `World` + `SystemRunner` (ordered ECS pipeline: InputSystem -> PatrolSystem -> MovementRotationSystem -> AnimationSystem -> NeonPulseSystem -> RenderSyncSystem)
 * - `MapLoader` + `PlaygroundSceneBuilder` (3D Cyberpunk Neo-Sector cityscape in `[ ASCII REALMS // SCENE ]`)
 * - `TuxEntityFactory` (dedicated high-contrast 3D Linux Tux stage for `[ STACK // NEOFETCH ]`)
 * - `PointerInput` + `KeyboardInput` (scroll-safe passive mouse/touch tracking + opt-in focus-gated keys)
 * - `VfxController` + `AsciiPostProcessor` (camera parallax, cursor spotlight, neon rain, wet canal reflections, bloom & smooth-transition ASCII shader)
 */
export class AsciiEngineCore {
  private readonly container: HTMLElement;
  private config: EngineConfig;
  private state: EngineLifecycleState = 'idle';
  private userManuallyPaused = false;
  private autoPausedOffscreen = false;
  private autoPausedHiddenTab = false;
  private isFullscreenActive = false;

  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private postProcessor: AsciiPostProcessor | null = null;

  private loop: EngineLoop | null = null;
  private lifecycle: LifecycleManager | null = null;
  private pointerInput: PointerInput | null = null;
  private keyboardInput: KeyboardInput | null = null;

  private ecsWorld: World | null = null;
  private systemRunner: SystemRunner | null = null;
  private vfx: VfxController | null = null;
  private builtPlayground: BuiltPlaygroundScene | null = null;
  private primaryEntityId: EntityId | null = null;

  // Viewport & telemetry state
  private containerWidth = 1;
  private containerHeight = 1;
  private activeCellSize = 10;
  private gridColumns = 1;
  private gridRows = 1;
  private effectiveDpr = 1;
  private resolutionTier: ResolutionTier = 'desktop';
  private lastDrawCalls = 0;
  private lastTriangles = 0;

  private readonly onPassivePointerMoveBound: (ev: PointerEvent) => void;
  private readonly onContextLostBound: (ev: Event) => void;

  constructor(container: HTMLElement, initialConfig?: PartialEngineConfig) {
    if (!container || !(container instanceof HTMLElement)) {
      throw new Error(
        '[AsciiSceneEngine] A valid container HTMLElement is required to instantiate the engine.'
      );
    }

    this.container = container;
    this.config = mergeEngineConfig(DEFAULT_ENGINE_CONFIG, initialConfig);

    this.onPassivePointerMoveBound = this.handlePassiveContainerMove.bind(this);
    this.onContextLostBound = this.handleContextLost.bind(this);
  }

  public mount(): void {
    if (this.state === 'destroyed') {
      throw new Error(
        '[AsciiSceneEngine] Cannot mount an engine instance that has already been destroyed. Create a new instance instead.'
      );
    }
    if (this.state !== 'idle') {
      return;
    }

    try {
      const computedPosition = window.getComputedStyle(this.container).position;
      if (computedPosition === 'static') {
        this.container.style.position = 'relative';
      }

      // 1. Initialize WebGLRenderer
      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false,
      });

      const pixelRatio = Math.min(window.devicePixelRatio || 1, this.config.maxPixelRatio);
      renderer.setPixelRatio(pixelRatio);
      renderer.shadowMap.enabled = this.config.enableShadows;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.info.autoReset = true;

      const canvas = renderer.domElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.zIndex = '0';
      canvas.style.pointerEvents = 'none';
      canvas.setAttribute('aria-hidden', 'true');
      canvas.dataset.asciiEngineCanvas = 'true';

      canvas.addEventListener('webglcontextlost', this.onContextLostBound, false);
      this.container.prepend(canvas);
      this.renderer = renderer;

      // 2. Initialize Lifecycle, Input, and ECS World
      const lifecycle = new LifecycleManager(this.container);
      const pointerInput = new PointerInput(this.container, {
        trackWindowHover: this.config.mode === 'mascot',
      });
      const keyboardInput = new KeyboardInput({
        enabled: this.config.enableKeyboard,
        focusTarget: this.container,
      });

      pointerInput.attach();
      keyboardInput.attach();

      // Passive container pointermove hook preserving backward-compatible event contract
      this.container.addEventListener('pointermove', this.onPassivePointerMoveBound, { passive: true });

      lifecycle.registerCleanup(() => {
        this.container.removeEventListener('pointermove', this.onPassivePointerMoveBound);
        pointerInput.detach();
        keyboardInput.detach();
      });

      this.lifecycle = lifecycle;
      this.pointerInput = pointerInput;
      this.keyboardInput = keyboardInput;

      // 3. Build Scene Mode ('playground' vs 'mascot') + Ordered ECS Systems
      const ecsWorld = new World();
      const systemRunner = new SystemRunner();
      this.ecsWorld = ecsWorld;
      this.systemRunner = systemRunner;

      if (this.config.mode === 'mascot') {
        this.initMascotStage(ecsWorld, systemRunner, pointerInput, keyboardInput);
      } else {
        this.initPlaygroundStage(ecsWorld, systemRunner, pointerInput, keyboardInput);
      }

      // 4. ASCII Post-Processor
      this.postProcessor = new AsciiPostProcessor(this.config);

      // 5. Initial Resize (immediate snap) + Observers (smooth transitions on subsequent resizes/fullscreen)
      const rect = this.container.getBoundingClientRect();
      this.applyResize(Math.max(1, rect.width), Math.max(1, rect.height), true);

      lifecycle.observeContainer(
        {
          onResize: (w, h) => this.applyResize(w, h, false),
          onVisibilityChange: (visible) => this.handleIntersectionVisibility(visible),
          onTabHiddenChange: (hidden) => this.handleTabVisibility(hidden),
          onFullscreenChange: (isFs) => {
            this.isFullscreenActive = isFs;
          },
        },
        {
          observeViewportIntersection: this.config.pauseOffscreen,
          observeTabVisibility: this.config.pauseOnHiddenTab,
        }
      );

      // 6. Start EngineLoop
      this.loop = new EngineLoop({
        maxFps: this.config.maxFps,
        onFrame: ({ dt, elapsed }) => this.renderFrame(dt, elapsed),
        onTelemetry: () => this.config.callbacks?.onFpsUpdate?.(this.getStats()),
      });

      this.state = 'running';
      this.loop.start();
      this.config.callbacks?.onMount?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      this.config.callbacks?.onError?.(error);
      throw error;
    }
  }

  private initPlaygroundStage(
    ecsWorld: World,
    systemRunner: SystemRunner,
    pointerInput: PointerInput,
    keyboardInput: KeyboardInput
  ): void {
    const mapDef = MapLoader.load(this.config.mapId);
    const built = PlaygroundSceneBuilder.build(mapDef, this.config, ecsWorld);
    this.builtPlayground = built;
    this.scene = built.scene;
    this.primaryEntityId = built.avatarEntityId;

    const camera = new THREE.PerspectiveCamera(46, 16 / 9, 0.5, 110);
    camera.position.set(...mapDef.cameraAnchor);
    camera.lookAt(...mapDef.cameraLookAt);
    this.camera = camera;

    this.vfx = new VfxController({
      scene: built.scene,
      config: this.config,
      baseCameraPos: mapDef.cameraAnchor,
      lookAtTarget: mapDef.cameraLookAt,
      particleOrigin: mapDef.shrineCenter,
      particleCount: 168,
    });

    // Deterministic priority-sorted ECS pipeline
    systemRunner
      .addSystem(new InputSystem(pointerInput, keyboardInput), 10)
      .addSystem(new PatrolSystem(), 15)
      .addSystem(new MovementRotationSystem(built.terrainHeightAt), 20)
      .addSystem(new AnimationSystem(), 30)
      .addSystem(new NeonPulseSystem(), 35)
      .addSystem(new RenderSyncSystem(), 40);
  }

  private initMascotStage(
    ecsWorld: World,
    systemRunner: SystemRunner,
    pointerInput: PointerInput,
    keyboardInput: KeyboardInput
  ): void {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(this.config.palette.background);
    this.scene = scene;

    // Dedicated studio three-point lighting rig for high-contrast ASCII Tux silhouette
    const hemi = new THREE.HemisphereLight(0xd8f3ff, 0x09111a, 1.35);
    scene.add(hemi);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.35);
    keyLight.position.set(-2.6, 4.2, 4.8);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(new THREE.Color(this.config.palette.warmCore), 10.5, 12, 1.5);
    rimLight.position.set(2.8, 2.5, -2.2);
    scene.add(rimLight);

    const cameraAnchor: [number, number, number] = [0, 1.02, 4.15];
    const lookTarget: [number, number, number] = [0, 0.92, 0];

    const camera = new THREE.PerspectiveCamera(38, 1, 0.3, 40);
    camera.position.set(...cameraAnchor);
    camera.lookAt(...lookTarget);
    this.camera = camera;

    const { entityId } = TuxEntityFactory.spawn(ecsWorld, scene, {
      position: [0, -0.05, 0],
      scale: 1.05,
      includeShowcaseRig: true,
    });
    this.primaryEntityId = entityId;

    this.vfx = new VfxController({
      scene,
      config: this.config,
      baseCameraPos: cameraAnchor,
      lookAtTarget: lookTarget,
      particleOrigin: [0, 0],
      particleCount: 16,
    });

    systemRunner
      .addSystem(new InputSystem(pointerInput, keyboardInput), 10)
      .addSystem(new MovementRotationSystem(), 20)
      .addSystem(new AnimationSystem(), 30)
      .addSystem(new RenderSyncSystem(), 40);
  }

  public pause(): void {
    this.userManuallyPaused = true;
    this.transitionToPaused();
  }

  public resume(): void {
    this.userManuallyPaused = false;
    this.tryResumeIfEligible();
  }

  public setPlayableKeyboardEnabled(enabled: boolean): void {
    this.config.enableKeyboard = enabled;
    this.keyboardInput?.setEnabled(enabled);
  }

  /**
   * Public programmatic resize hook (also invoked automatically by ResizeObserver & fullscreenchange).
   */
  public resize(dimensions: { width: number; height: number }, immediate = false): void {
    if (this.state === 'destroyed') return;
    if (dimensions.width > 0 && dimensions.height > 0) {
      this.applyResize(dimensions.width, dimensions.height, immediate);
    }
  }

  public updateConfig(partialConfig: PartialEngineConfig): void {
    if (this.state === 'destroyed') return;

    const prevRamp = this.config.characterRamp;
    const prevStruct = this.config.structuralChars;
    const prevFont = this.config.fontFamily;
    const prevShadows = this.config.enableShadows;
    const prevMaxDpr = this.config.maxPixelRatio;

    this.config = mergeEngineConfig(this.config, partialConfig);
    this.keyboardInput?.setEnabled(this.config.enableKeyboard);
    this.loop?.setMaxFps(this.config.maxFps);

    if (!this.renderer || !this.scene || !this.postProcessor) return;

    if (prevShadows !== this.config.enableShadows) {
      this.renderer.shadowMap.enabled = this.config.enableShadows;
      this.renderer.shadowMap.needsUpdate = true;
    }

    // Apply live palette updates to background, fog, neon architecture, lights & water uniforms
    if (this.scene.background instanceof THREE.Color) {
      this.scene.background.set(this.config.palette.background);
    }
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.set(this.config.palette.background);
    }

    if (this.builtPlayground) {
      const p = this.config.palette;
      this.builtPlayground.ambientHemi.color.set(p.coolAmbient);
      this.builtPlayground.moonDirLight.color
        .set(p.coolAmbient)
        .lerp(new THREE.Color('#D8F6FF'), 0.4);
      this.builtPlayground.torchLight.color.set(p.warmLight);

      // Update shared cyberpunk architectural neon materials dynamically on preset switch
      this.builtPlayground.neonMaterials.cyan.color.set(p.coolAmbient);
      this.builtPlayground.neonMaterials.cyan.emissive.set(p.coolAmbient);
      this.builtPlayground.neonMaterials.magenta.color.set(p.warmLight);
      this.builtPlayground.neonMaterials.magenta.emissive.set(p.warmLight);
      this.builtPlayground.neonMaterials.amber.color.set(p.warmCore);
      this.builtPlayground.neonMaterials.amber.emissive.set(p.warmCore);

      this.builtPlayground.brazierLights.forEach((bl, idx) => {
        bl.color.set(idx % 2 === 0 ? p.coolAmbient : p.warmLight);
      });

      const u = this.builtPlayground.waterMaterial.uniforms;
      u.uDeepColor?.value.set(p.background).lerp(new THREE.Color(p.coolAmbient), 0.26);
      u.uShallowColor?.value.set(p.coolAmbient).lerp(new THREE.Color('#8be4ff'), 0.32);
      u.uWarmColor?.value.set(p.warmLight);
      u.uWarmCoreColor?.value.set(p.warmCore);
      u.uCursorColor?.value.set(p.cursorLight);
    }

    this.vfx?.applyConfig(this.config);

    const rebuildAtlas =
      prevRamp !== this.config.characterRamp ||
      prevStruct !== this.config.structuralChars ||
      prevFont !== this.config.fontFamily;

    if (prevMaxDpr !== this.config.maxPixelRatio) {
      this.applyResize(this.containerWidth, this.containerHeight, false);
    } else {
      const grid = this.postProcessor.applyConfig(
        this.config,
        rebuildAtlas,
        this.containerWidth,
        this.containerHeight,
        typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
        this.isCoarsePointerDevice()
      );
      this.activeCellSize = grid.activeCellSize;
      this.gridColumns = grid.columns;
      this.gridRows = grid.rows;
      this.effectiveDpr = grid.effectiveDpr;
      this.resolutionTier = grid.tier;
    }

    if (this.state === 'paused') {
      this.loop?.stepOnce(0);
    }
  }

  public destroy(): void {
    if (this.state === 'destroyed') return;

    this.loop?.stop();
    this.loop = null;

    this.systemRunner?.clear();
    this.systemRunner = null;

    // Dispose ECS-owned dynamic entities & lights cleanly before sweeping remaining scene graph
    this.ecsWorld?.clear(true);
    this.ecsWorld = null;
    this.builtPlayground = null;
    this.vfx = null;

    this.lifecycle?.disposeAll(this.scene);
    this.lifecycle = null;
    this.scene = null;
    this.camera = null;
    this.pointerInput = null;
    this.keyboardInput = null;

    if (this.postProcessor) {
      this.postProcessor.dispose();
      this.postProcessor = null;
    }

    if (this.renderer) {
      const canvas = this.renderer.domElement;
      canvas.removeEventListener('webglcontextlost', this.onContextLostBound, false);
      this.renderer.renderLists.dispose();
      this.renderer.dispose();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      this.renderer = null;
    }

    this.state = 'destroyed';
    this.config.callbacks?.onDestroy?.();
  }

  public getState(): EngineLifecycleState {
    return this.state;
  }

  public getConfig(): EngineConfig {
    return mergeEngineConfig(this.config);
  }

  public getStats(): EngineStats {
    const telemetry = this.loop?.getTelemetry() ?? { fps: 60, frameTimeMs: 16.67 };
    return {
      fps: telemetry.fps,
      frameTimeMs: telemetry.frameTimeMs,
      activeCellSize: this.activeCellSize,
      gridColumns: this.gridColumns,
      gridRows: this.gridRows,
      drawCalls: this.lastDrawCalls,
      triangles: this.lastTriangles,
      entityCount: this.ecsWorld?.getEntityCount() ?? 0,
      effectiveDpr: this.effectiveDpr,
      resolutionTier: this.resolutionTier,
    };
  }

  public getScene(): THREE.Scene | null {
    return this.scene;
  }

  public getCamera(): THREE.PerspectiveCamera | null {
    return this.camera;
  }

  public getPrimaryEntityAngles(): { yaw: number; pitch: number } | null {
    if (!this.ecsWorld || this.primaryEntityId === null) return null;
    const t = this.ecsWorld.getComponent(this.primaryEntityId, 'Transform');
    if (!t) return null;
    return { yaw: t.rotY, pitch: t.rotX };
  }

  private renderFrame(dt: number, elapsed: number): void {
    if (!this.renderer || !this.scene || !this.camera || !this.postProcessor) return;

    // 1. Run Ordered ECS Systems (Input -> Patrol -> Movement/Rotation -> Animation -> NeonPulse -> RenderSync)
    if (this.ecsWorld && this.systemRunner) {
      this.systemRunner.run(this.ecsWorld, { dt, elapsed });
    }

    // 2. Update Camera Parallax, Cursor Spotlight & Cyberpunk Rain/Particles
    const ptr = this.pointerInput
      ? this.pointerInput.sample(0)
      : {
          normX: 0,
          normY: 0,
          dragYaw: 0,
          dragPitch: 0,
          active: false,
          isDown: false,
          motionSpeed: 0,
          lastInteractionMs: 0,
        };

    this.vfx?.update(dt, elapsed, ptr, this.camera, this.config);

    // 3. Sync Playground Reflective Neon Canal Uniforms
    if (this.builtPlayground) {
      const u = this.builtPlayground.waterMaterial.uniforms;
      if (u.uTime) u.uTime.value = elapsed;
      if (u.uCamPos) u.uCamPos.value.copy(this.camera.position);
      if (u.uShrineLight) {
        u.uShrineLight.value.set(
          this.builtPlayground.torchLight.position.x,
          this.builtPlayground.torchLight.position.y,
          this.builtPlayground.torchLight.position.z,
          this.builtPlayground.torchLight.intensity
        );
      }

      if (this.vfx) {
        const cursorLight = this.vfx.getCursorLight();
        if (u.uCursorPos) u.uCursorPos.value.copy(cursorLight.position);
        if (u.uCursorIntensity) u.uCursorIntensity.value = cursorLight.intensity;
      }

      const torchUniforms = ['uTorch0', 'uTorch1', 'uTorch2', 'uTorch3'] as const;
      for (let i = 0; i < torchUniforms.length; i++) {
        const key = torchUniforms[i]!;
        const bl = this.builtPlayground.brazierLights[i];
        if (u[key]) {
          if (bl) {
            u[key].value.set(bl.position.x, bl.position.y, bl.position.z, bl.intensity);
          } else {
            u[key].value.set(0, 0, 0, 0);
          }
        }
      }
    }

    // 4. Multi-Pass ASCII Post-Processing Render (with smooth cell-density transition step)
    const metrics = this.postProcessor.render(
      this.renderer,
      this.scene,
      this.camera,
      elapsed,
      dt
    );
    this.lastDrawCalls = metrics.drawCalls;
    this.lastTriangles = metrics.triangles;
  }

  private isCoarsePointerDevice(): boolean {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    try {
      return window.matchMedia('(pointer: coarse)').matches;
    } catch {
      return false;
    }
  }

  private applyResize(cssWidth: number, cssHeight: number, immediate = false): void {
    if (!this.renderer || !this.camera || !this.postProcessor) return;

    const rawDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const coarse = this.isCoarsePointerDevice();

    const profile = computeAdaptiveResolution({
      cssWidth,
      cssHeight,
      devicePixelRatio: rawDpr,
      config: this.config,
      isCoarsePointer: coarse,
      isFullscreen: this.isFullscreenActive,
    });

    // Skip duplicate no-op resize ticks if physical resolution and grid are already identical
    if (
      !immediate &&
      this.containerWidth === profile.cssWidth &&
      this.containerHeight === profile.cssHeight &&
      this.effectiveDpr === profile.effectiveDpr &&
      this.activeCellSize === profile.activeCellSize
    ) {
      return;
    }

    this.containerWidth = profile.cssWidth;
    this.containerHeight = profile.cssHeight;
    this.effectiveDpr = profile.effectiveDpr;
    this.resolutionTier = profile.tier;
    this.activeCellSize = profile.activeCellSize;
    this.gridColumns = profile.columns;
    this.gridRows = profile.rows;

    if (this.renderer.getPixelRatio() !== profile.effectiveDpr) {
      this.renderer.setPixelRatio(profile.effectiveDpr);
    }
    this.renderer.setSize(profile.cssWidth, profile.cssHeight, false);

    const aspect = Math.max(0.1, profile.cssWidth / Math.max(1, profile.cssHeight));
    this.camera.aspect = aspect;
    // Slightly widen FOV on narrow portrait viewports or expand vista cleanly on ultrawide/fullscreen
    if (this.config.mode === 'playground') {
      this.camera.fov = aspect < 1.0 ? 54 : this.isFullscreenActive ? 44 : 46;
    }
    this.camera.updateProjectionMatrix();

    this.postProcessor.applyResolutionProfile(profile, this.config, immediate);

    if (this.state === 'paused') {
      this.loop?.stepOnce(0);
    }
  }

  private transitionToPaused(): void {
    if (this.state !== 'running') return;
    this.loop?.pause();
    this.state = 'paused';
    this.config.callbacks?.onPause?.();
  }

  private tryResumeIfEligible(): void {
    if (this.state !== 'paused') return;
    if (this.userManuallyPaused || this.autoPausedOffscreen || this.autoPausedHiddenTab) {
      return;
    }
    this.state = 'running';
    this.loop?.resume();
    this.config.callbacks?.onResume?.();
  }

  private handleIntersectionVisibility(isVisible: boolean): void {
    if (!this.config.pauseOffscreen) return;
    if (!isVisible) {
      this.autoPausedOffscreen = true;
      this.transitionToPaused();
    } else {
      this.autoPausedOffscreen = false;
      this.tryResumeIfEligible();
    }
  }

  private handleTabVisibility(isHidden: boolean): void {
    if (!this.config.pauseOnHiddenTab) return;
    if (isHidden) {
      this.autoPausedHiddenTab = true;
      this.transitionToPaused();
    } else {
      this.autoPausedHiddenTab = false;
      this.tryResumeIfEligible();
    }
  }

  private handlePassiveContainerMove(_ev: PointerEvent): void {
    // Handled via PointerInput; kept attached passively on container for direct event contract compatibility.
  }

  private handleContextLost(ev: Event): void {
    ev.preventDefault();
    this.loop?.pause();
    this.config.callbacks?.onError?.(new Error('[AsciiSceneEngine] WebGL context lost.'));
  }
}
