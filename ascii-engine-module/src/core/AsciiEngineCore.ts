import * as THREE from 'three';
import {
  AnimationSystem,
  CharacterAnimationSystem,
} from '../animation/AnimationSystem';
import { DEFAULT_ENGINE_CONFIG, mergeEngineConfig } from './defaultConfig';
import { EngineLoop } from './EngineLoop';
import { LifecycleManager } from './LifecycleManager';
import { computeAdaptiveResolution } from './ResolutionController';
import {
  CameraFollowSystem,
  InputSystem,
  LineOfSightOcclusionSystem,
  MovementRotationSystem,
  RenderSyncSystem,
  SystemRunner,
  TrafficFlowSystem,
} from '../ecs/SystemRunner';
import { type EntityId, World } from '../ecs/World';
import { TuxEntityFactory } from '../entities/TuxEntityFactory';
import { KeyboardInput } from '../input/KeyboardInput';
import { PointerInput } from '../input/PointerInput';
import { AsciiPostProcessor } from '../shaders/AsciiPostProcessor';
import {
  applyObjectOutline,
  clearObjectOutline,
  DEFAULT_OUTLINE_HIGHLIGHT_COLOR,
  getObjectOutlineState,
} from '../shaders/objectOutline';
import type {
  EngineConfig,
  EngineLifecycleState,
  EngineStats,
  ObjectOutlineHandle,
  ObjectOutlineOptions,
  OutlineTargetSelector,
  PartialEngineConfig,
  ResolvedObjectOutlineState,
  ResolutionProfile,
  ResolutionTier,
} from '../types';
import { VfxController } from '../vfx/VfxController';
import { GlbSceneLoader } from '../world/GlbSceneLoader';
import {
  type BuiltMascotStage,
  MASCOT_BACKDROP_HEX,
  MascotStageBuilder,
} from '../world/MascotStageBuilder';
import {
  type BuiltUrbanGlbStage,
  DEFAULT_URBAN_PLAYER_SPAWN,
  URBAN_CAMERA_FOLLOW_DEFAULTS,
  UrbanGlbSceneBuilder,
} from '../world/UrbanGlbSceneBuilder';

/**
 * AsciiEngineCore: Modular WebGL2 runtime orchestrating:
 * - `EngineLoop` (clamped deltaTime, zero-jump pause/resume, FPS cap & telemetry)
 * - `LifecycleManager` (rAF-coalesced ResizeObserver, Fullscreen observer, IntersectionObserver, Page Visibility, leak-free `.dispose()`)
 * - `World` + `SystemRunner` (ordered ECS pipeline: InputSystem -> TrafficFlowSystem -> MovementRotationSystem -> CharacterAnimationSystem -> AnimationSystem -> CameraFollowSystem -> RenderSyncSystem)
 * - `GlbSceneLoader` + `UrbanGlbSceneBuilder` (`./assets/models/cena_completa.glb` + self-hosted `./assets/draco/` in `[ ASCII REALMS // SCENE ]`)
 * - `MascotStageBuilder` + `TuxEntityFactory` (dedicated 3D Linux Tux stage for `[ STACK // NEOFETCH ]`)
 * - `PointerInput` + `KeyboardInput` (scroll-safe passive mouse/touch tracking + WASD/E character control)
 * - `VfxController` + `AsciiPostProcessor` (3D-wrapping full-screen ASCII shader, normal-depth Sobel contours, rain VFX)
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
  private lastAutoPlaygroundFov: number | null = null;
  private readonly outlinedTargets = new Set<THREE.Object3D>();
  private postProcessor: AsciiPostProcessor | null = null;

  private loop: EngineLoop | null = null;
  private lifecycle: LifecycleManager | null = null;
  private pointerInput: PointerInput | null = null;
  private keyboardInput: KeyboardInput | null = null;

  private ecsWorld: World | null = null;
  private systemRunner: SystemRunner | null = null;
  private vfx: VfxController | null = null;
  private glbLoader: GlbSceneLoader | null = null;
  private builtUrbanStage: BuiltUrbanGlbStage | null = null;
  private glbLoaded = false;
  private builtMascot: BuiltMascotStage | null = null;
  private mascotRootObj: THREE.Group | null = null;
  private primaryEntityId: EntityId | null = null;

  // Viewport & telemetry state
  private lastResolutionProfile: ResolutionProfile | null = null;
  private containerWidth = 1;
  private containerHeight = 1;
  private activeCellSize = 8;
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
    const baseDefaults =
      initialConfig?.mode === 'mascot'
        ? mergeEngineConfig(DEFAULT_ENGINE_CONFIG, {
            fov: 38,
            cellSize: 8,
            autoResponsiveDensity: true,
            enableKeyboard: false,
            bloomIntensity: 0.08,
            dofStrength: 0.0,
            blockBlendWeight: 0.0,
            palette: { background: MASCOT_BACKDROP_HEX },
          })
        : DEFAULT_ENGINE_CONFIG;
    this.config = mergeEngineConfig(baseDefaults, initialConfig);

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
        trackWindowHover: false,
      });
      const keyboardInput = new KeyboardInput({
        enabled: this.config.mode !== 'mascot' && this.config.enableKeyboard,
        focusTarget: this.container,
      });

      // Mascot stage (`#penguin-stage`) stays 100% pointer/touch/keyboard-inert
      if (this.config.mode !== 'mascot') {
        pointerInput.attach();
        if (this.config.enableKeyboard) {
          keyboardInput.attach();
        }
        this.container.addEventListener('pointermove', this.onPassivePointerMoveBound, {
          passive: true,
        });
      }

      lifecycle.registerCleanup(() => {
        this.container.removeEventListener('pointermove', this.onPassivePointerMoveBound);
        pointerInput.detach();
        keyboardInput.detach();
      });

      this.lifecycle = lifecycle;
      this.pointerInput = pointerInput;
      this.keyboardInput = keyboardInput;

      // 3. Build Scene Mode ('playground' GLB vs 'mascot' Tux) + Ordered ECS Systems
      const ecsWorld = new World();
      const systemRunner = new SystemRunner();
      this.ecsWorld = ecsWorld;
      this.systemRunner = systemRunner;

      if (this.config.mode === 'mascot') {
        this.initMascotStage(ecsWorld, systemRunner);
      } else {
        this.initPlaygroundStage(systemRunner, pointerInput, keyboardInput);
      }

      // 4. Full-Screen 3D-Wrapping ASCII Post-Processor
      this.postProcessor = new AsciiPostProcessor(this.config);

      // 5. Initial Resize (immediate snap) + Observers
      const rect = this.container.getBoundingClientRect();
      this.postProcessor.applyConfig(this.config, false, Math.max(1, rect.width), Math.max(1, rect.height), typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, this.isCoarsePointerDevice(), true);
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
      this.config.callbacks?.onStateChange?.('running');
      this.config.callbacks?.onMount?.();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      this.config.callbacks?.onError?.(error);
      throw error;
    }
  }

  private initPlaygroundStage(
    systemRunner: SystemRunner,
    pointerInput: PointerInput,
    keyboardInput: KeyboardInput
  ): void {
    const stage = UrbanGlbSceneBuilder.createStage(this.config);
    this.builtUrbanStage = stage;
    this.scene = stage.scene;

    const initialFov = typeof this.config.fov === 'number' ? this.config.fov : 58;
    const defaultPlayerSpawn: [number, number, number] = [
      DEFAULT_URBAN_PLAYER_SPAWN.x,
      DEFAULT_URBAN_PLAYER_SPAWN.y,
      DEFAULT_URBAN_PLAYER_SPAWN.z,
    ];
    const initialCamPos: [number, number, number] = [
      defaultPlayerSpawn[0] + URBAN_CAMERA_FOLLOW_DEFAULTS.offsetX,
      defaultPlayerSpawn[1] + URBAN_CAMERA_FOLLOW_DEFAULTS.offsetY,
      defaultPlayerSpawn[2] + URBAN_CAMERA_FOLLOW_DEFAULTS.offsetZ,
    ];
    const initialLookAt: [number, number, number] = [
      defaultPlayerSpawn[0] + URBAN_CAMERA_FOLLOW_DEFAULTS.lookAtOffsetX,
      defaultPlayerSpawn[1] + URBAN_CAMERA_FOLLOW_DEFAULTS.lookAtOffsetY,
      defaultPlayerSpawn[2] + URBAN_CAMERA_FOLLOW_DEFAULTS.lookAtOffsetZ,
    ];

    const camera = new THREE.PerspectiveCamera(initialFov, 16 / 9, 0.15, 160);
    camera.position.set(...initialCamPos);
    camera.lookAt(...initialLookAt);
    camera.updateMatrixWorld();
    this.camera = camera;
    this.lastAutoPlaygroundFov = typeof this.config.fov === 'number' ? null : initialFov;

    this.vfx = new VfxController({
      scene: stage.scene,
      config: this.config,
      baseCameraPos: initialCamPos,
      lookAtTarget: initialLookAt,
    });

    // Deterministic priority-sorted ECS pipeline for `cena_completa.glb`
    systemRunner
      .addSystem(new InputSystem(pointerInput, keyboardInput, camera), 10)
      .addSystem(new TrafficFlowSystem(), 15)
      .addSystem(new MovementRotationSystem(stage.waypointMarker), 20)
      .addSystem(new CharacterAnimationSystem(), 28)
      .addSystem(new AnimationSystem(), 30)
      .addSystem(new CameraFollowSystem(camera), 38)
      .addSystem(new LineOfSightOcclusionSystem(camera), 39)
      .addSystem(new RenderSyncSystem(), 40);

    // Stream & decode `./assets/models/cena_completa.glb` via self-hosted `./assets/draco/`
    const loader = new GlbSceneLoader();
    this.glbLoader = loader;
    this.container.setAttribute('data-scene-loading', 'true');

    loader
      .load({
        modelUrl: this.config.modelUrl,
        dracoDecoderPath: this.config.dracoDecoderPath,
        onProgress: (progress) => {
          this.config.callbacks?.onLoadProgress?.(progress);
        },
      })
      .then((preparedAssets) => {
        if (this.state === 'destroyed' || !this.ecsWorld || !this.builtUrbanStage) {
          preparedAssets.dispose();
          return;
        }

        UrbanGlbSceneBuilder.attachPreparedAssets(
          this.builtUrbanStage,
          preparedAssets,
          this.config,
          this.ecsWorld
        );
        this.primaryEntityId = this.builtUrbanStage.playerEntityId;
        this.glbLoaded = true;
        this.container.removeAttribute('data-scene-loading');
        this.container.setAttribute('data-glb-ready', 'true');

        // Snap initial ECS state (Player_Rig, CameraFollow, Carro_Grupo t=0) before next render
        this.systemRunner?.run(this.ecsWorld, {
          dt: 0,
          elapsed: this.loop?.getElapsedSeconds() ?? 0,
        });
        if (this.renderer) {
          this.renderer.shadowMap.needsUpdate = true;
        }
        if (this.state === 'paused') {
          this.loop?.stepOnce(0);
        }
        this.config.callbacks?.onLoadReady?.();
      })
      .catch((err) => {
        if (this.state === 'destroyed') return;
        this.container.removeAttribute('data-scene-loading');
        this.container.setAttribute('data-glb-error', 'true');
        const error = err instanceof Error ? err : new Error(String(err));
        this.config.callbacks?.onLoadError?.(error);
        this.config.callbacks?.onError?.(error);
      });
  }

  private initMascotStage(ecsWorld: World, systemRunner: SystemRunner): void {
    this.config = {
      ...this.config,
      palette: {
        ...this.config.palette,
        background: MASCOT_BACKDROP_HEX,
      },
    };

    const builtMascot = MascotStageBuilder.build(this.config);
    this.builtMascot = builtMascot;
    this.scene = builtMascot.scene;

    const cameraAnchor: [number, number, number] = [0, 1.08, 4.25];
    const lookTarget: [number, number, number] = [0, 0.9, 0];

    const initialFov = typeof this.config.fov === 'number' ? this.config.fov : 38;
    const camera = new THREE.PerspectiveCamera(initialFov, 1, 0.3, 40);
    camera.position.set(...cameraAnchor);
    camera.lookAt(...lookTarget);
    this.camera = camera;

    const { entityId, rootGroup } = TuxEntityFactory.spawn(ecsWorld, builtMascot.scene, {
      position: [0, 0.04, 0],
      scale: 1.02,
      includeShowcaseRig: false,
      bobAmplitude: 0.018,
    });
    this.primaryEntityId = entityId;
    this.mascotRootObj = rootGroup;
    this.vfx = null;

    systemRunner
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
    if (this.config.mode !== 'mascot') {
      this.keyboardInput?.setEnabled(enabled);
    }
  }

  /**
   * Toggles gentle 3rd-person camera auto-orbit around `Player_Rig` while preserving smooth lerp tracking.
   */
  public setAutoOrbit(enabled: boolean): void {
    this.config.autoOrbit = Boolean(enabled);
    if (this.ecsWorld && this.builtUrbanStage?.playerEntityId != null) {
      const follow = this.ecsWorld.getComponent(
        this.builtUrbanStage.playerEntityId,
        'CameraFollow'
      );
      if (follow) {
        follow.autoOrbit = Boolean(enabled);
      }
    }
  }

  public isGlbLoaded(): boolean {
    return this.glbLoaded;
  }

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

    this.config = mergeEngineConfig(this.config, partialConfig);
    if (this.config.mode !== 'mascot') {
      this.keyboardInput?.setEnabled(this.config.enableKeyboard);
    }
    if (partialConfig.autoOrbit !== undefined) {
      this.setAutoOrbit(partialConfig.autoOrbit);
    }
    this.loop?.setMaxFps(this.config.maxFps);

    if (!this.renderer || !this.scene || !this.postProcessor) return;

    if (this.camera && typeof partialConfig.fov === 'number') {
      this.camera.fov = partialConfig.fov;
      this.camera.updateProjectionMatrix();
      this.lastAutoPlaygroundFov = null;
    }

    if (prevShadows !== this.config.enableShadows) {
      this.renderer.shadowMap.enabled = this.config.enableShadows;
      if (this.builtMascot) {
        this.builtMascot.keyLight.castShadow = this.config.enableShadows;
      }
      this.renderer.shadowMap.needsUpdate = true;
    }

    if (this.builtMascot && !partialConfig.palette?.background) {
      this.config.palette.background = MASCOT_BACKDROP_HEX;
    }
    if (this.scene.background instanceof THREE.Color) {
      this.scene.background.set(this.config.palette.background);
    }

    const atmosphereOrLightChanged =
      partialConfig.atmosphere !== undefined ||
      partialConfig.palette !== undefined ||
      prevShadows !== this.config.enableShadows ||
      partialConfig.windStrength !== undefined ||
      partialConfig.reflectionStrength !== undefined ||
      partialConfig.cursorLightIntensity !== undefined;

    if (atmosphereOrLightChanged) {
      if (this.builtUrbanStage) {
        UrbanGlbSceneBuilder.applyAtmosphere(
          this.builtUrbanStage,
          this.config,
          this.ecsWorld ?? undefined
        );
        this.renderer.shadowMap.needsUpdate = true;
      } else if (this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.color.set(this.config.palette.background);
      }

      this.vfx?.applyConfig(this.config);
    }

    const rebuildAtlas =
      prevRamp !== this.config.characterRamp ||
      prevStruct !== this.config.structuralChars ||
      prevFont !== this.config.fontFamily;

    // Apply appearance uniforms, then the authoritative fullscreen-aware profile.
    this.postProcessor.applyConfig(
      this.config, rebuildAtlas, this.containerWidth, this.containerHeight,
      typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
      this.isCoarsePointerDevice(), true
    );
    this.applyResize(this.containerWidth, this.containerHeight, false, true);

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

    for (const outlined of this.outlinedTargets) {
      clearObjectOutline(outlined);
    }
    this.outlinedTargets.clear();

    if (this.glbLoader) {
      this.glbLoader.dispose();
      this.glbLoader = null;
    }

    if (this.vfx) {
      this.vfx.dispose();
      this.vfx = null;
    }

    // Dispose ECS-owned entities, AnimationMixers, SpotLights/PointLights, geometries & textures
    this.ecsWorld?.clear(true);
    this.ecsWorld = null;

    if (this.builtUrbanStage?.assets) {
      this.builtUrbanStage.assets.dispose();
    }
    this.builtUrbanStage = null;
    this.glbLoaded = false;
    this.builtMascot = null;
    this.mascotRootObj = null;

    this.container.removeAttribute('data-scene-loading');
    this.container.removeAttribute('data-glb-ready');
    this.container.removeAttribute('data-glb-error');

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
    this.config.callbacks?.onStateChange?.('destroyed');
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

  public getResolutionProfile(): ResolutionProfile | null {
    return this.lastResolutionProfile;
  }

  public getScene(): THREE.Scene | null {
    return this.scene;
  }

  public getWorld(): World | null {
    return this.ecsWorld;
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

  private resolveOutlineTarget(target: OutlineTargetSelector): THREE.Object3D | null {
    if (!target && target !== 0) return null;

    if (typeof (target as THREE.Object3D).traverse === 'function') {
      return target as THREE.Object3D;
    }

    if (target === 'primary') {
      if (this.ecsWorld && this.primaryEntityId !== null) {
        return this.ecsWorld.getComponent(this.primaryEntityId, 'Renderable')?.object3D ?? null;
      }
      return null;
    }

    if (typeof target === 'number') {
      return this.ecsWorld?.getComponent(target as EntityId, 'Renderable')?.object3D ?? null;
    }

    if (typeof target === 'string' && this.scene) {
      return this.scene.getObjectByName(target) ?? null;
    }

    return null;
  }

  public setObjectOutline(
    target: OutlineTargetSelector,
    options?: ObjectOutlineOptions
  ): ObjectOutlineHandle | null {
    if (this.state === 'destroyed') return null;

    const resolvedObj = this.resolveOutlineTarget(target);
    if (!resolvedObj) return null;

    const hasExisting = getObjectOutlineState(resolvedObj) !== null;
    const mergedOptions: ObjectOutlineOptions = { ...(options ?? {}) };
    if (
      !hasExisting &&
      mergedOptions.highlightColor === undefined &&
      mergedOptions.color === undefined
    ) {
      mergedOptions.highlightColor =
        this.config.palette?.cursorLight || DEFAULT_OUTLINE_HIGHLIGHT_COLOR;
    }

    const handle = applyObjectOutline(resolvedObj, mergedOptions);
    this.outlinedTargets.add(resolvedObj);

    if (this.state === 'paused') {
      this.loop?.stepOnce(0);
    }
    return handle;
  }

  public clearObjectOutline(target?: OutlineTargetSelector): number {
    if (target === undefined) {
      let total = 0;
      for (const obj of this.outlinedTargets) {
        total += clearObjectOutline(obj);
      }
      this.outlinedTargets.clear();
      if (this.state === 'paused') {
        this.loop?.stepOnce(0);
      }
      return total;
    }

    const resolvedObj = this.resolveOutlineTarget(target);
    if (!resolvedObj) return 0;

    const removed = clearObjectOutline(resolvedObj);
    this.outlinedTargets.delete(resolvedObj);
    if (this.state === 'paused') {
      this.loop?.stepOnce(0);
    }
    return removed;
  }

  public getObjectOutlineState(
    target: OutlineTargetSelector
  ): ResolvedObjectOutlineState | null {
    const resolvedObj = this.resolveOutlineTarget(target);
    if (!resolvedObj) return null;
    return getObjectOutlineState(resolvedObj);
  }

  private renderFrame(dt: number, elapsed: number): void {
    if (!this.renderer || !this.scene || !this.camera || !this.postProcessor) return;

    // 1. Run Ordered ECS Systems
    if (this.ecsWorld && this.systemRunner) {
      this.systemRunner.run(this.ecsWorld, { dt, elapsed });
    }

    // 2. Update Weather VFX & Cursor Fill Light
    const ptr = this.pointerInput
      ? this.pointerInput.sample(0)
      : {
          normX: 0,
          normY: 0,
          dragYaw: 0,
          dragPitch: 0,
          active: false,
          isDown: false,
          isTouch: false,
          motionSpeed: 0,
          lastInteractionMs: 0,
        };

    this.vfx?.update(this.camera, ptr, dt, elapsed);

    // 3. Keep Mascot Stage Floor Shadow & Diffused Reflection Synced
    if (this.builtMascot) {
      const mu = this.builtMascot.floorMaterial.uniforms;
      if (mu.uCamPos) {
        mu.uCamPos.value.copy(this.camera.position);
      }

      const keyShadow = this.builtMascot.keyLight.shadow;
      if (this.config.enableShadows && keyShadow.map) {
        if (mu.uDirShadowMap) mu.uDirShadowMap.value = keyShadow.map.texture;
        if (mu.uDirShadowMatrix) mu.uDirShadowMatrix.value.copy(keyShadow.matrix);
        if (mu.uShadowMapSize) {
          mu.uShadowMapSize.value.set(keyShadow.mapSize.width, keyShadow.mapSize.height);
        }
        if (mu.uShadowEnabled) mu.uShadowEnabled.value = 1.0;
      } else if (mu.uShadowEnabled) {
        mu.uShadowEnabled.value = 0.0;
      }

      if (this.mascotRootObj) {
        this.mascotRootObj.updateWorldMatrix(true, false);
        const el = this.mascotRootObj.matrixWorld.elements;
        if (mu.uSubjectYaw) {
          mu.uSubjectYaw.value = Math.atan2(el[8] ?? 0, el[10] ?? 1);
        }
        if (mu.uSubjectPos) {
          mu.uSubjectPos.value.set(el[12] ?? 0, 0.0, el[14] ?? 0);
        }
      }
    }

    // 4. Multi-Pass 3D-Wrapping ASCII Post-Processing Render
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

  private applyResize(cssWidth: number, cssHeight: number, immediate = false, force = false): void {
    if (!this.renderer || !this.camera || !this.postProcessor) return;

    const rawDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const coarse = this.isCoarsePointerDevice();
    const cssFullscreen =
      typeof document !== 'undefined' &&
      Boolean(
        this.container.closest?.('[data-fullscreen-view="true"], .is-scene-fullscreen')
      );

    const profile = computeAdaptiveResolution({
      cssWidth,
      cssHeight,
      devicePixelRatio: rawDpr,
      config: this.config,
      isCoarsePointer: coarse,
      isFullscreen: this.isFullscreenActive || cssFullscreen,
    });

    if (
      !immediate && !force &&
      this.containerWidth === profile.cssWidth &&
      this.containerHeight === profile.cssHeight &&
      this.effectiveDpr === profile.effectiveDpr &&
      this.activeCellSize === profile.activeCellSize
    ) {
      return;
    }

    this.lastResolutionProfile = profile;
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
    if (typeof this.config.fov === 'number') {
      this.camera.fov = this.config.fov;
      this.lastAutoPlaygroundFov = null;
    } else if (this.config.mode === 'playground') {
      const wasCustomizedExternally =
        this.lastAutoPlaygroundFov !== null &&
        Math.abs(this.camera.fov - this.lastAutoPlaygroundFov) > 0.01;
      if (!wasCustomizedExternally) {
        const autoFov = 58;
        this.camera.fov = autoFov;
        this.lastAutoPlaygroundFov = autoFov;
      }
    }
    this.camera.updateProjectionMatrix();

    this.postProcessor.applyResolutionProfile(profile, this.config, immediate);
    this.config.callbacks?.onResolutionChange?.(profile);

    if (this.state === 'paused') {
      this.loop?.stepOnce(0);
    }
  }

  private transitionToPaused(): void {
    if (this.state !== 'running') return;
    this.loop?.pause();
    this.state = 'paused';
    this.config.callbacks?.onStateChange?.('paused');
    this.config.callbacks?.onPause?.();
  }

  private tryResumeIfEligible(): void {
    if (this.state !== 'paused') return;
    if (this.userManuallyPaused || this.autoPausedOffscreen || this.autoPausedHiddenTab) {
      return;
    }
    this.state = 'running';
    this.loop?.resume();
    this.config.callbacks?.onStateChange?.('running');
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
