import * as THREE from 'three';
import { EntityBlueprintRegistry } from '../ecs/EntityBlueprint';
import type { EntityId, SceneDepthLayerName, World } from '../ecs/World';
import type { ThemePalette } from '../types';
import { SceneDepthRig, type NeonTone } from '../world/SceneComposerKit';

/**
 * PlaygroundEntityFactory: Modular Cyberpunk ECS Entity Factory & Blueprint Catalog.
 *
 * Exposes both `createDefaultBlueprintRegistry()` (for declarative prefab spawning via
 * `EntityBlueprintRegistry`) and clean static helper methods used by `PlaygroundSceneBuilder`:
 *  - `'cyber.holo-reactor'` (`spawnShrineCrystal`) — Midground/background levitating plasma core + gyro-rings
 *  - `'cyber.neon-pylon'` (`spawnBrazierBeacon`) — Pulsing street-level neon bollards & point lights
 *  - `'cyber.wind-banner'` (`spawnHangingNeonBanner`) — Wind-swaying suspended street signs (`WindSway`)
 *  - `'cyber.overhead-cable'` (`spawnWindCableSpan`) — Wind-oscillating catenary street cables
 *  - `'cyber.hover-drone'` (`spawnCyberDrone`) — Autonomous patrol spinners (`PatrolPath`)
 *  - `'cyber.netrunner-avatar'` (`spawnWayfarerAvatar`) — High-contrast foreground protagonist with
 *    rim-lit silhouette, ground holo-ring, glowing visor, neon collar, plasma katana & wind-swept coat!
 */
export class PlaygroundEntityFactory {
  public static createDefaultBlueprintRegistry(
    palette: ThemePalette,
    enableShadows = true
  ): EntityBlueprintRegistry {
    const registry = new EntityBlueprintRegistry();

    // 1. Holo-Reactor Core Blueprint
    registry.register<{ enableShadows?: boolean }>({
      id: 'cyber.holo-reactor',
      role: 'core',
      defaultLayer: 'midground',
      contrastPriority: 0.9,
      build: (ctx, params) => {
        const group = new THREE.Group();
        group.name = 'CyberHoloReactor';

        const coreMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(palette.warmCore),
          emissive: new THREE.Color(palette.warmLight),
          emissiveIntensity: 2.95,
          roughness: 0.12,
          metalness: 0.35,
          flatShading: true,
        });

        const cyanRingMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(palette.coolAmbient),
          emissive: new THREE.Color(palette.coolAmbient),
          emissiveIntensity: 2.15,
          roughness: 0.22,
          metalness: 0.65,
          flatShading: true,
        });

        const amberFrameMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(palette.warmCore),
          emissive: new THREE.Color(palette.warmCore),
          emissiveIntensity: 1.65,
          roughness: 0.3,
          metalness: 0.7,
          flatShading: true,
        });

        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(1.05, 0), coreMat);
        crystal.scale.set(0.92, 1.72, 0.92);
        group.add(crystal);

        const orbitRing = new THREE.Group();
        const ringTorus = new THREE.Mesh(new THREE.TorusGeometry(1.74, 0.085, 6, 24), cyanRingMat);
        ringTorus.rotation.x = Math.PI * 0.36;
        orbitRing.add(ringTorus);

        const innerFrame = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.06, 5, 16), amberFrameMat);
        innerFrame.rotation.y = Math.PI * 0.28;
        orbitRing.add(innerFrame);
        group.add(orbitRing);

        const castShad = params.enableShadows ?? enableShadows;
        const torchLight = new THREE.PointLight(new THREE.Color(palette.warmLight), 52.0, 40.0, 1.45);
        torchLight.position.set(ctx.position[0], ctx.position[1] + 0.35, ctx.position[2] + 0.5);
        torchLight.castShadow = castShad;
        if (castShad) {
          torchLight.shadow.mapSize.width = 512;
          torchLight.shadow.mapSize.height = 512;
          torchLight.shadow.camera.near = 0.5;
          torchLight.shadow.camera.far = 36;
          torchLight.shadow.bias = -0.0008;
          torchLight.shadow.normalBias = 0.04;
        }

        return {
          object3D: group,
          pointLight: torchLight,
          baseLightIntensity: 52.0,
          lightFlickerSpeed: 6.8,
          components: {
            LifecycleTag: { role: 'core', label: 'HoloReactorCore' },
            RotationTarget: {
              targetYaw: 0,
              targetPitch: 0,
              targetRoll: 0,
              lerpSpeed: 3.2,
              idleSpinSpeed: 0.78,
              maxPitch: 0.25,
            },
            AnimationState: {
              baseY: ctx.position[1],
              bobAmplitude: 0.22,
              bobFrequency: 1.9,
              breatheAmplitude: 0.025,
              phase: ctx.phase ?? 0,
              excitement: 0,
              parts: { orbitRing },
            },
            NeonBeacon: {
              emissiveMaterial: coreMat,
              baseEmissiveIntensity: 2.95,
              pulseSpeed: 3.4,
              pulseAmplitude: 0.18,
              phase: 0.4,
              glitchRate: 0.08,
            },
          },
        };
      },
    });

    // 2. Street Neon Pylon Blueprint
    registry.register<{ tone: NeonTone }>({
      id: 'cyber.neon-pylon',
      role: 'beacon',
      defaultLayer: 'foreground',
      contrastPriority: 0.85,
      build: (ctx, params) => {
        const group = new THREE.Group();
        group.name = 'CyberNeonPylon';

        const chassisMat = new THREE.MeshStandardMaterial({
          color: 0x131d2e,
          roughness: 0.5,
          metalness: 0.75,
          flatShading: true,
        });

        const neonHex =
          params.tone === 'cyan'
            ? palette.coolAmbient
            : params.tone === 'magenta'
              ? palette.warmLight
              : palette.warmCore;

        const tubeMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(neonHex),
          emissive: new THREE.Color(neonHex),
          emissiveIntensity: 2.75,
          roughness: 0.14,
          flatShading: true,
        });

        const base = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.34, 0.46), chassisMat);
        base.position.y = 0.17;
        base.castShadow = true;
        base.receiveShadow = true;
        group.add(base);

        const mast = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.95, 0.2), chassisMat);
        mast.position.y = 1.12;
        mast.castShadow = true;
        group.add(mast);

        const neonBar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.55, 0.28), tubeMat);
        neonBar.position.y = 1.28;
        group.add(neonBar);

        const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), tubeMat);
        crown.position.y = 2.28;
        group.add(crown);

        const light = new THREE.PointLight(new THREE.Color(neonHex), 18.0, 16.0, 1.55);
        light.position.set(ctx.position[0], ctx.position[1] + 2.15, ctx.position[2]);
        const phase = ctx.phase ?? 0;

        return {
          object3D: group,
          pointLight: light,
          baseLightIntensity: 18.0,
          lightFlickerSpeed: 8.5,
          components: {
            LifecycleTag: { role: 'beacon', label: `NeonPylon_${params.tone}` },
            AnimationState: {
              baseY: ctx.position[1],
              bobAmplitude: 0,
              bobFrequency: 2.2,
              breatheAmplitude: 0.01,
              phase,
              excitement: 0,
            },
            NeonBeacon: {
              emissiveMaterial: tubeMat,
              baseEmissiveIntensity: 2.75,
              pulseSpeed: 4.2,
              pulseAmplitude: 0.2,
              phase,
              glitchRate: 0.14,
            },
          },
        };
      },
    });

    // 3. Wind-Swaying Hanging Street Banner Blueprint
    registry.register<{ width: number; height: number; tone: NeonTone }>({
      id: 'cyber.wind-banner',
      role: 'prop',
      defaultLayer: 'midground',
      contrastPriority: 0.78,
      build: (ctx, params) => {
        const group = new THREE.Group();
        group.name = 'HangingNeonBanner';

        const frameMat = new THREE.MeshStandardMaterial({
          color: 0x0e1522,
          roughness: 0.55,
          metalness: 0.75,
          flatShading: true,
        });

        const neonHex =
          params.tone === 'cyan'
            ? palette.coolAmbient
            : params.tone === 'magenta'
              ? palette.warmLight
              : palette.warmCore;

        const signMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(neonHex),
          emissive: new THREE.Color(neonHex),
          emissiveIntensity: 2.5,
          roughness: 0.18,
          flatShading: true,
        });

        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, params.height, params.width),
          frameMat
        );
        frame.position.y = -params.height * 0.5;
        frame.castShadow = true;
        group.add(frame);

        const glowFace = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, params.height * 0.84, params.width * 0.82),
          signMat
        );
        glowFace.position.y = -params.height * 0.5;
        group.add(glowFace);

        for (let b = 1; b <= 2; b++) {
          const bar = new THREE.Mesh(
            new THREE.BoxGeometry(0.17, 0.08, params.width * 0.86),
            frameMat
          );
          bar.position.y = -params.height * (0.28 * b + 0.1);
          group.add(bar);
        }

        const phase = ctx.phase ?? 0;
        return {
          object3D: group,
          components: {
            LifecycleTag: { role: 'prop', label: `WindSign_${params.tone}` },
            WindSway: {
              baseRotX: 0,
              baseRotY: 0,
              baseRotZ: 0,
              swayAmpZ: 0.16,
              swayAmpX: 0.09,
              frequency: 2.35,
              phase,
              gustFactor: 1.0,
            },
            NeonBeacon: {
              emissiveMaterial: signMat,
              baseEmissiveIntensity: 2.5,
              pulseSpeed: 3.6,
              pulseAmplitude: 0.18,
              phase,
              glitchRate: 0.18,
            },
          },
        };
      },
    });

    // 4. Autonomous Aerial Hover-Spinner Blueprint
    registry.register<{
      amplitude: [number, number, number];
      speed: number;
      tone: NeonTone;
    }>({
      id: 'cyber.hover-drone',
      role: 'vehicle',
      defaultLayer: 'midground',
      contrastPriority: 0.8,
      build: (ctx, params) => {
        const group = new THREE.Group();
        group.name = 'CyberHoverSpinner';

        const hullMat = new THREE.MeshStandardMaterial({
          color: 0x0e1624,
          roughness: 0.42,
          metalness: 0.82,
          flatShading: true,
        });

        const accentHex =
          params.tone === 'cyan'
            ? palette.coolAmbient
            : params.tone === 'magenta'
              ? palette.warmLight
              : palette.warmCore;

        const thrusterMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(accentHex),
          emissive: new THREE.Color(accentHex),
          emissiveIntensity: 3.0,
          roughness: 0.1,
          flatShading: true,
        });

        const fuselage = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.24, 1.45), hullMat);
        fuselage.castShadow = true;
        group.add(fuselage);

        const lightStrip = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.1, 1.25), thrusterMat);
        lightStrip.position.y = -0.04;
        group.add(lightStrip);

        const phase = ctx.phase ?? 0;
        return {
          object3D: group,
          components: {
            LifecycleTag: { role: 'vehicle', label: `HoverSpinner_${params.tone}` },
            PatrolPath: {
              originX: ctx.position[0],
              originY: ctx.position[1],
              originZ: ctx.position[2],
              amplitudeX: params.amplitude[0],
              amplitudeY: params.amplitude[1],
              amplitudeZ: params.amplitude[2],
              speed: params.speed,
              phase,
              faceTangent: true,
            },
            NeonBeacon: {
              emissiveMaterial: thrusterMat,
              baseEmissiveIntensity: 3.0,
              pulseSpeed: 6.0,
              pulseAmplitude: 0.16,
              phase,
            },
          },
        };
      },
    });

    // 5. High-Contrast Foreground Netrunner Protagonist Blueprint
    registry.register<Record<string, never>>({
      id: 'cyber.netrunner-avatar',
      role: 'avatar',
      defaultLayer: 'foreground',
      contrastPriority: 1.0,
      build: (ctx) => {
        const group = new THREE.Group();
        group.name = 'CyberNetrunnerAvatar';

        const armorMat = new THREE.MeshStandardMaterial({
          color: 0x1e304a,
          emissive: new THREE.Color(palette.coolAmbient).multiplyScalar(0.2),
          roughness: 0.36,
          metalness: 0.68,
          flatShading: true,
        });

        const coatMat = new THREE.MeshStandardMaterial({
          color: 0x15243a,
          emissive: new THREE.Color(palette.warmLight).multiplyScalar(0.16),
          roughness: 0.44,
          metalness: 0.55,
          flatShading: true,
        });

        const magentaNeonMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(palette.warmLight),
          emissive: new THREE.Color(palette.warmLight),
          emissiveIntensity: 2.8,
          roughness: 0.15,
          flatShading: true,
        });

        const cyanNeonMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(palette.cursorLight),
          emissive: new THREE.Color(palette.cursorLight),
          emissiveIntensity: 3.15,
          roughness: 0.12,
          flatShading: true,
        });

        const amberCoreMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(palette.warmCore),
          emissive: new THREE.Color(palette.warmCore),
          emissiveIntensity: 2.95,
          roughness: 0.12,
          flatShading: true,
        });

        // Ground Holo-Target Ring separating boots cleanly from dark street reflections
        const groundHalo = new THREE.Mesh(new THREE.RingGeometry(0.58, 0.74, 20), cyanNeonMat);
        groundHalo.rotation.x = -Math.PI / 2;
        groundHalo.position.y = 0.04;
        group.add(groundHalo);

        // Articulated Legs & Shin Neon Trim
        const leftFoot = new THREE.Group();
        leftFoot.position.set(-0.22, 0.0, 0.02);
        const lLeg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.78, 0.22), armorMat);
        lLeg.position.y = 0.39;
        lLeg.rotation.z = 0.06;
        lLeg.castShadow = true;
        leftFoot.add(lLeg);
        const lShinTrim = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.5, 0.25), cyanNeonMat);
        lShinTrim.position.set(0, 0.34, 0.02);
        leftFoot.add(lShinTrim);
        group.add(leftFoot);

        const rightFoot = new THREE.Group();
        rightFoot.position.set(0.22, 0.0, -0.02);
        const rLeg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.78, 0.22), armorMat);
        rLeg.position.y = 0.39;
        rLeg.rotation.z = -0.06;
        rLeg.castShadow = true;
        rightFoot.add(rLeg);
        const rShinTrim = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.5, 0.25), cyanNeonMat);
        rShinTrim.position.set(0, 0.34, 0.02);
        rightFoot.add(rShinTrim);
        group.add(rightFoot);

        // Armored Torso + Cyber-Spine + Chest Reactor + Pauldrons
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.82, 0.38), armorMat);
        torso.position.y = 1.16;
        torso.castShadow = true;
        group.add(torso);

        const chestCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.15, 0), amberCoreMat);
        chestCore.position.set(0, 1.22, 0.21);
        group.add(chestCore);

        const spineStrip = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.68, 0.42), cyanNeonMat);
        spineStrip.position.set(0, 1.18, 0);
        group.add(spineStrip);

        for (const side of [-1, 1]) {
          const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22, 0.42), coatMat);
          pauldron.position.set(side * 0.46, 1.46, 0);
          pauldron.rotation.z = -side * 0.18;
          pauldron.castShadow = true;
          group.add(pauldron);

          const shoulderTrim = new THREE.Mesh(
            new THREE.BoxGeometry(0.28, 0.075, 0.44),
            magentaNeonMat
          );
          shoulderTrim.position.set(side * 0.47, 1.56, 0);
          shoulderTrim.rotation.z = -side * 0.18;
          group.add(shoulderTrim);
        }

        // Wind-Swept Split Trench Coat Tail
        const coatTail = new THREE.Group();
        coatTail.position.set(0, 0.88, -0.14);
        const leftFlap = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.72, 0.09), coatMat);
        leftFlap.position.set(-0.19, -0.34, -0.04);
        leftFlap.rotation.z = 0.12;
        leftFlap.castShadow = true;
        coatTail.add(leftFlap);

        const rightFlap = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.72, 0.09), coatMat);
        rightFlap.position.set(0.19, -0.34, -0.04);
        rightFlap.rotation.z = -0.12;
        rightFlap.castShadow = true;
        coatTail.add(rightFlap);

        const hemNeon = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.075, 0.11), magentaNeonMat);
        hemNeon.position.set(0, -0.68, -0.04);
        coatTail.add(hemNeon);
        group.add(coatTail);

        // High Glowing Cyberpunk Collar
        const collar = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.078, 6, 12), magentaNeonMat);
        collar.rotation.x = Math.PI * 0.45;
        collar.position.y = 1.62;
        group.add(collar);

        // Cybernetic Helmet + Wide Cyan Visor + Twin Signal Antennas
        const head = new THREE.Group();
        head.position.set(0, 1.84, 0);
        const helm = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 1), armorMat);
        helm.scale.set(0.98, 1.1, 1.02);
        helm.castShadow = true;
        head.add(helm);

        const visor = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.105, 0.32), cyanNeonMat);
        visor.position.set(0, 0.03, 0.12);
        head.add(visor);

        for (const side of [-1, 1]) {
          const ear = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.32, 0.08), amberCoreMat);
          ear.position.set(side * 0.18, 0.28, -0.04);
          ear.rotation.z = -side * 0.16;
          head.add(ear);
        }
        group.add(head);

        // Arms & Diagonal High-Luminance Plasma Katana
        const leftArm = new THREE.Group();
        leftArm.position.set(-0.46, 1.38, 0.04);
        const lForearm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.62, 0.18), armorMat);
        lForearm.position.y = -0.26;
        lForearm.rotation.z = 0.18;
        lForearm.castShadow = true;
        leftArm.add(lForearm);
        group.add(leftArm);

        const bladePivot = new THREE.Group();
        bladePivot.position.set(0.48, 1.32, 0.12);
        const rForearm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.56, 0.18), armorMat);
        rForearm.position.y = -0.22;
        rForearm.rotation.z = -0.24;
        rForearm.castShadow = true;
        bladePivot.add(rForearm);

        const hilt = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.12), amberCoreMat);
        hilt.position.set(0.14, -0.34, 0.14);
        hilt.rotation.z = -0.52;
        bladePivot.add(hilt);

        const bladeCore = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.98, 0.11), cyanNeonMat);
        bladeCore.position.set(0.62, 0.48, 0.16);
        bladeCore.rotation.z = -0.52;
        bladeCore.castShadow = true;
        bladePivot.add(bladeCore);
        group.add(bladePivot);

        const avatarLight = new THREE.PointLight(
          new THREE.Color(palette.cursorLight),
          14.5,
          7.8,
          1.6
        );
        avatarLight.position.set(0, 1.75, 0.75);
        group.add(avatarLight);

        return {
          object3D: group,
          components: {
            LifecycleTag: { role: 'avatar', label: 'CyberNetrunner' },
            Velocity: {
              vx: 0,
              vy: 0,
              vz: 0,
              angularVx: 0,
              angularVy: 0,
              angularVz: 0,
              damping: 7.5,
            },
            RotationTarget: {
              targetYaw: 0.18,
              targetPitch: 0,
              targetRoll: 0,
              lerpSpeed: 5.4,
              idleSpinSpeed: 0,
              maxPitch: 0.22,
            },
            AnimationState: {
              baseY: ctx.position[1],
              bobAmplitude: 0.032,
              bobFrequency: 2.35,
              breatheAmplitude: 0.018,
              phase: 1.1,
              excitement: 0,
              parts: {
                head,
                leftWing: leftArm,
                rightWing: bladePivot,
                leftFoot,
                rightFoot,
                coatTail,
              },
            },
            InputState: {
              pointerX: 0,
              pointerY: 0,
              pointerActive: false,
              isDragging: false,
              moveX: 0,
              moveZ: 0,
              yawSensitivity: 0.92,
              pitchSensitivity: 0.22,
              moveSpeed: 3.8,
              boundsRadius: 6.4,
            },
          },
        };
      },
    });

    return registry;
  }

  public static spawnShrineCrystal(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    position: [number, number, number],
    enableShadows: boolean,
    parentGroup?: THREE.Group
  ): { entityId: EntityId; torchLight: THREE.PointLight } {
    const registry = this.createDefaultBlueprintRegistry(palette, enableShadows);
    const res = registry.spawn(
      'cyber.holo-reactor',
      {
        world: ecsWorld,
        scene,
        parentGroup,
        position,
        layer: SceneDepthRig.classifyZ(position[2]),
      },
      { enableShadows }
    );
    return { entityId: res.entityId, torchLight: res.pointLight! };
  }

  public static spawnBrazierBeacon(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    position: [number, number, number],
    phaseOffset: number,
    tone: NeonTone = 'cyan',
    parentGroup?: THREE.Group
  ): { entityId: EntityId; light: THREE.PointLight } {
    const registry = this.createDefaultBlueprintRegistry(palette);
    const res = registry.spawn(
      'cyber.neon-pylon',
      {
        world: ecsWorld,
        scene,
        parentGroup,
        position,
        rotationY: phaseOffset * 0.2,
        phase: phaseOffset,
        layer: SceneDepthRig.classifyZ(position[2]),
      },
      { tone }
    );
    return { entityId: res.entityId, light: res.pointLight! };
  }

  public static spawnHangingNeonBanner(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    spec: {
      pivot: [number, number, number];
      width: number;
      height: number;
      tone: NeonTone;
      phase: number;
      parentGroup?: THREE.Group;
      layer?: SceneDepthLayerName;
    }
  ): { entityId: EntityId } {
    const registry = this.createDefaultBlueprintRegistry(palette);
    const res = registry.spawn(
      'cyber.wind-banner',
      {
        world: ecsWorld,
        scene,
        parentGroup: spec.parentGroup,
        position: spec.pivot,
        phase: spec.phase,
        layer: spec.layer ?? SceneDepthRig.classifyZ(spec.pivot[2]),
      },
      { width: spec.width, height: spec.height, tone: spec.tone }
    );
    return { entityId: res.entityId };
  }

  public static spawnCyberDrone(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    spec: {
      origin: [number, number, number];
      amplitude: [number, number, number];
      speed: number;
      phase: number;
      tone: NeonTone;
      parentGroup?: THREE.Group;
    }
  ): { entityId: EntityId } {
    const registry = this.createDefaultBlueprintRegistry(palette);
    const res = registry.spawn(
      'cyber.hover-drone',
      {
        world: ecsWorld,
        scene,
        parentGroup: spec.parentGroup,
        position: spec.origin,
        phase: spec.phase,
        layer: SceneDepthRig.classifyZ(spec.origin[2]),
      },
      { amplitude: spec.amplitude, speed: spec.speed, tone: spec.tone }
    );
    return { entityId: res.entityId };
  }

  public static spawnWayfarerAvatar(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    position: [number, number, number],
    parentGroup?: THREE.Group
  ): { entityId: EntityId; group: THREE.Group } {
    const registry = this.createDefaultBlueprintRegistry(palette);
    const res = registry.spawn(
      'cyber.netrunner-avatar',
      {
        world: ecsWorld,
        scene,
        parentGroup,
        position,
        rotationY: 0.18,
        scale: 1.12,
        layer: 'foreground',
      },
      {}
    );
    return { entityId: res.entityId, group: res.object3D as THREE.Group };
  }
}
