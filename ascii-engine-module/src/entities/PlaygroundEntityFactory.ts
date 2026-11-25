import * as THREE from 'three';
import { EntityBlueprintRegistry } from '../ecs/EntityBlueprint';
import type { EntityId, SceneDepthLayerName, World } from '../ecs/World';
import type { ThemePalette } from '../types';
import { SceneDepthRig, type NeonTone } from '../world/SceneComposerKit';

/**
 * PlaygroundEntityFactory: Modular Cyber-Noir + Entropism ECS Entity Factory & Blueprint Catalog.
 *
 * Exposes `createDefaultBlueprintRegistry()` (for declarative prefab spawning via
 * `EntityBlueprintRegistry`) and static helper methods used by `PlaygroundSceneBuilder`:
 *  - `'cyber.holo-reactor'` (`spawnShrineCrystal`) — Weathered horizon gyro-core with restrained ASCII glow
 *  - `'cyber.neon-pylon'` (`spawnBrazierBeacon`) — Low-intensity street bollards (#2A3540 / #4A7C7E)
 *  - `'cyber.wind-banner'` (`spawnHangingNeonBanner`) — Wind-swaying industrial street signs (`WindSway`)
 *  - `'cyber.hover-drone'` (`spawnCyberDrone`) — Autonomous noir patrol craft (`PatrolPath`)
 *  - `'cyber.netrunner-avatar'` (`spawnWayfarerAvatar`) — Techwear/Darkwear protagonist (#14171C & #3B424C)
 *    with an articulated cybernetic mechanical right arm (#6E7B87 & #8A99A6), discreet #4A7C7E ocular detail,
 *    hip-pivoted walk-cycle legs, `NavigationTarget`, and `CameraFollow` (zero glowing sword/weapon).
 */
export class PlaygroundEntityFactory {
  public static createDefaultBlueprintRegistry(
    palette: ThemePalette,
    enableShadows = true
  ): EntityBlueprintRegistry {
    const registry = new EntityBlueprintRegistry();

    // 1. Entropic Horizon Gyro-Reactor Blueprint (restrained ASCII value modulation)
    registry.register<{ enableShadows?: boolean }>({
      id: 'cyber.holo-reactor',
      role: 'core',
      defaultLayer: 'midground',
      contrastPriority: 0.85,
      build: (ctx, params) => {
        const group = new THREE.Group();
        group.name = 'CyberHoloReactor';

        const coreMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(palette.warmLight),
          emissive: new THREE.Color(palette.warmLight),
          emissiveIntensity: 0.72,
          roughness: 0.36,
          metalness: 0.42,
          flatShading: true,
        });

        const outerRingMat = new THREE.MeshStandardMaterial({
          color: 0x2a3540,
          emissive: new THREE.Color(palette.coolAmbient).multiplyScalar(0.18),
          roughness: 0.58,
          metalness: 0.52,
          flatShading: true,
        });

        const innerFrameMat = new THREE.MeshStandardMaterial({
          color: 0x6e7b87,
          emissive: new THREE.Color(palette.warmCore).multiplyScalar(0.16),
          roughness: 0.48,
          metalness: 0.58,
          flatShading: true,
        });

        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.92, 0), coreMat);
        crystal.scale.set(0.88, 1.58, 0.88);
        group.add(crystal);

        const orbitRing = new THREE.Group();
        const ringTorus = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.08, 6, 24), outerRingMat);
        ringTorus.rotation.x = Math.PI * 0.36;
        orbitRing.add(ringTorus);

        const innerFrame = new THREE.Mesh(
          new THREE.TorusGeometry(1.18, 0.055, 5, 16),
          innerFrameMat
        );
        innerFrame.rotation.y = Math.PI * 0.28;
        orbitRing.add(innerFrame);
        group.add(orbitRing);

        const castShad = params.enableShadows ?? enableShadows;
        const torchLight = new THREE.PointLight(
          new THREE.Color(palette.warmLight),
          6.8,
          28.0,
          1.6
        );
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
          baseLightIntensity: 6.8,
          lightFlickerSpeed: 4.8,
          components: {
            LifecycleTag: { role: 'core', label: 'HoloReactorCore' },
            RotationTarget: {
              targetYaw: 0,
              targetPitch: 0,
              targetRoll: 0,
              lerpSpeed: 3.2,
              idleSpinSpeed: 0.52,
              maxPitch: 0.2,
            },
            AnimationState: {
              baseY: ctx.position[1],
              bobAmplitude: 0.14,
              bobFrequency: 1.6,
              breatheAmplitude: 0.015,
              phase: ctx.phase ?? 0,
              excitement: 0,
              parts: { orbitRing },
            },
            NeonBeacon: {
              emissiveMaterial: coreMat,
              baseEmissiveIntensity: 0.72,
              pulseSpeed: 2.4,
              pulseAmplitude: 0.12,
              phase: 0.4,
              glitchRate: 0.04,
            },
          },
        };
      },
    });

    // 2. Weathered Street Bollard / Beacon Blueprint
    registry.register<{ tone: NeonTone }>({
      id: 'cyber.neon-pylon',
      role: 'beacon',
      defaultLayer: 'foreground',
      contrastPriority: 0.78,
      build: (ctx, params) => {
        const group = new THREE.Group();
        group.name = 'CyberNeonPylon';

        const chassisMat = new THREE.MeshStandardMaterial({
          color: 0x2a3540,
          roughness: 0.72,
          metalness: 0.36,
          flatShading: true,
        });

        const accentHex =
          params.tone === 'cyan'
            ? palette.coolAmbient
            : params.tone === 'magenta'
              ? palette.warmLight
              : palette.warmCore;

        const tubeMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(accentHex),
          emissive: new THREE.Color(accentHex),
          emissiveIntensity: 0.62,
          roughness: 0.4,
          flatShading: true,
        });

        const base = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.34, 0.44), chassisMat);
        base.position.y = 0.17;
        base.castShadow = true;
        base.receiveShadow = true;
        group.add(base);

        const mast = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.88, 0.2), chassisMat);
        mast.position.y = 1.1;
        mast.castShadow = true;
        group.add(mast);

        const indicatorSlit = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.92, 0.23), tubeMat);
        indicatorSlit.position.y = 1.32;
        group.add(indicatorSlit);

        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, 0.28), chassisMat);
        cap.position.y = 2.1;
        group.add(cap);

        const light = new THREE.PointLight(new THREE.Color(accentHex), 3.6, 12.0, 1.7);
        light.position.set(ctx.position[0], ctx.position[1] + 2.0, ctx.position[2]);
        const phase = ctx.phase ?? 0;

        return {
          object3D: group,
          pointLight: light,
          baseLightIntensity: 3.6,
          lightFlickerSpeed: 5.5,
          components: {
            LifecycleTag: { role: 'beacon', label: `NeonPylon_${params.tone}` },
            AnimationState: {
              baseY: ctx.position[1],
              bobAmplitude: 0,
              bobFrequency: 2.0,
              breatheAmplitude: 0.006,
              phase,
              excitement: 0,
            },
            NeonBeacon: {
              emissiveMaterial: tubeMat,
              baseEmissiveIntensity: 0.62,
              pulseSpeed: 2.8,
              pulseAmplitude: 0.12,
              phase,
              glitchRate: 0.05,
            },
          },
        };
      },
    });

    // 3. Wind-Swaying Industrial Street Placard Blueprint
    registry.register<{ width: number; height: number; tone: NeonTone }>({
      id: 'cyber.wind-banner',
      role: 'prop',
      defaultLayer: 'midground',
      contrastPriority: 0.74,
      build: (ctx, params) => {
        const group = new THREE.Group();
        group.name = 'HangingNeonBanner';

        const frameMat = new THREE.MeshStandardMaterial({
          color: 0x2a3540,
          roughness: 0.74,
          metalness: 0.34,
          flatShading: true,
        });

        const accentHex =
          params.tone === 'cyan'
            ? palette.coolAmbient
            : params.tone === 'magenta'
              ? palette.warmLight
              : palette.warmCore;

        const signMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(accentHex),
          emissive: new THREE.Color(accentHex),
          emissiveIntensity: 0.56,
          roughness: 0.44,
          flatShading: true,
        });

        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, params.height, params.width),
          frameMat
        );
        frame.position.y = -params.height * 0.5;
        frame.castShadow = true;
        group.add(frame);

        for (let b = 1; b <= 2; b++) {
          const bar = new THREE.Mesh(
            new THREE.BoxGeometry(0.14, 0.1, params.width * 0.76),
            signMat
          );
          bar.position.y = -params.height * (0.3 * b + 0.08);
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
              swayAmpZ: 0.14,
              swayAmpX: 0.08,
              frequency: 2.15,
              phase,
              gustFactor: 1.0,
            },
            NeonBeacon: {
              emissiveMaterial: signMat,
              baseEmissiveIntensity: 0.56,
              pulseSpeed: 2.6,
              pulseAmplitude: 0.1,
              phase,
              glitchRate: 0.06,
            },
          },
        };
      },
    });

    // 4. Autonomous Stealth Noir Patrol Craft Blueprint
    registry.register<{
      amplitude: [number, number, number];
      speed: number;
      tone: NeonTone;
    }>({
      id: 'cyber.hover-drone',
      role: 'vehicle',
      defaultLayer: 'midground',
      contrastPriority: 0.76,
      build: (ctx, params) => {
        const group = new THREE.Group();
        group.name = 'CyberHoverSpinner';

        const hullMat = new THREE.MeshStandardMaterial({
          color: 0x1e262e,
          roughness: 0.64,
          metalness: 0.46,
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
          emissiveIntensity: 0.65,
          roughness: 0.36,
          flatShading: true,
        });

        const fuselage = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.24, 1.42), hullMat);
        fuselage.castShadow = true;
        group.add(fuselage);

        const lightStrip = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.07, 0.96), thrusterMat);
        lightStrip.position.y = -0.05;
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
              baseEmissiveIntensity: 0.65,
              pulseSpeed: 4.2,
              pulseAmplitude: 0.1,
              phase,
            },
          },
        };
      },
    });

    // 5. Techwear / Darkwear Protagonist + Integrated Cybernetic Mechanical Arm Blueprint
    registry.register<Record<string, never>>({
      id: 'cyber.netrunner-avatar',
      role: 'avatar',
      defaultLayer: 'foreground',
      contrastPriority: 1.0,
      build: (ctx) => {
        const group = new THREE.Group();
        group.name = 'CyberNetrunnerAvatar';

        // Primary Darkwear Hardshell (#14171C)
        const darkwearShellMat = new THREE.MeshStandardMaterial({
          color: 0x14171c,
          emissive: new THREE.Color(0x14171c).multiplyScalar(0.16),
          roughness: 0.78,
          metalness: 0.16,
          flatShading: true,
        });

        // Secondary Tactical Layering / Webbing / Harness (#3B424C)
        const darkwearLayerMat = new THREE.MeshStandardMaterial({
          color: 0x3b424c,
          emissive: new THREE.Color(0x3b424c).multiplyScalar(0.18),
          roughness: 0.68,
          metalness: 0.24,
          flatShading: true,
        });

        // Cybernetic Mechanical Arm Structural Chassis (#6E7B87)
        const mechChassisMat = new THREE.MeshStandardMaterial({
          color: 0x6e7b87,
          emissive: new THREE.Color(0x6e7b87).multiplyScalar(0.22),
          roughness: 0.44,
          metalness: 0.62,
          flatShading: true,
        });

        // Cybernetic Mechanical Arm Brushed Titanium / Articulated Plating (#8A99A6)
        const mechAlloyMat = new THREE.MeshStandardMaterial({
          color: 0x8a99a6,
          emissive: new THREE.Color(0x8a99a6).multiplyScalar(0.24),
          roughness: 0.36,
          metalness: 0.68,
          flatShading: true,
        });

        // Discreet Punctual Cyber-Noir Accent (#4A7C7E) — narrow ocular slit & servo pin only
        const punctualAccentMat = new THREE.MeshStandardMaterial({
          color: 0x4a7c7e,
          emissive: new THREE.Color(0x4a7c7e),
          emissiveIntensity: 0.58,
          roughness: 0.4,
          flatShading: true,
        });

        // === Hip-Pivoted Articulated Techwear Cargo Legs & Boots (stride-ready) ===
        const leftFoot = new THREE.Group();
        leftFoot.name = 'AvatarLeftLeg';
        leftFoot.position.set(-0.19, 0.80, 0.0);

        const lThigh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.40, 0.24), darkwearShellMat);
        lThigh.position.y = -0.20;
        lThigh.castShadow = true;
        leftFoot.add(lThigh);

        const lCargoPocket = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.20, 0.16),
          darkwearLayerMat
        );
        lCargoPocket.position.set(-0.12, -0.20, 0.01);
        leftFoot.add(lCargoPocket);

        const lKneePad = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.12, 0.26), darkwearLayerMat);
        lKneePad.position.set(0, -0.40, 0.02);
        leftFoot.add(lKneePad);

        const lShin = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.32, 0.20), darkwearShellMat);
        lShin.position.y = -0.56;
        lShin.castShadow = true;
        leftFoot.add(lShin);

        const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.14, 0.30), darkwearLayerMat);
        lBoot.position.set(0, -0.73, 0.04);
        lBoot.castShadow = true;
        leftFoot.add(lBoot);
        group.add(leftFoot);

        const rightFoot = new THREE.Group();
        rightFoot.name = 'AvatarRightLeg';
        rightFoot.position.set(0.19, 0.80, 0.0);

        const rThigh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.40, 0.24), darkwearShellMat);
        rThigh.position.y = -0.20;
        rThigh.castShadow = true;
        rightFoot.add(rThigh);

        const rCargoPocket = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.20, 0.16),
          darkwearLayerMat
        );
        rCargoPocket.position.set(0.12, -0.20, 0.01);
        rightFoot.add(rCargoPocket);

        const rKneePad = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.12, 0.26), darkwearLayerMat);
        rKneePad.position.set(0, -0.40, 0.02);
        rightFoot.add(rKneePad);

        const rShin = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.32, 0.20), darkwearShellMat);
        rShin.position.y = -0.56;
        rShin.castShadow = true;
        rightFoot.add(rShin);

        const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.14, 0.30), darkwearLayerMat);
        rBoot.position.set(0, -0.73, 0.04);
        rBoot.castShadow = true;
        rightFoot.add(rBoot);
        group.add(rightFoot);

        // === Techwear Hardshell Torso + Cross-Body Tactical Rig (#14171C & #3B424C) ===
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.76, 0.36), darkwearShellMat);
        torso.position.y = 1.16;
        torso.castShadow = true;
        group.add(torso);

        const tacticalChestRig = new THREE.Mesh(
          new THREE.BoxGeometry(0.50, 0.32, 0.40),
          darkwearLayerMat
        );
        tacticalChestRig.position.set(0, 1.22, 0.02);
        tacticalChestRig.castShadow = true;
        group.add(tacticalChestRig);

        const crossStrap = new THREE.Mesh(
          new THREE.BoxGeometry(0.10, 0.72, 0.41),
          darkwearLayerMat
        );
        crossStrap.position.set(-0.04, 1.18, 0.01);
        crossStrap.rotation.z = -0.46;
        group.add(crossStrap);

        const utilityBelt = new THREE.Mesh(
          new THREE.BoxGeometry(0.67, 0.10, 0.39),
          darkwearLayerMat
        );
        utilityBelt.position.set(0, 0.82, 0);
        group.add(utilityBelt);

        // Left Darkwear Shoulder Drape
        const leftShoulderCap = new THREE.Mesh(
          new THREE.BoxGeometry(0.24, 0.18, 0.40),
          darkwearLayerMat
        );
        leftShoulderCap.position.set(-0.41, 1.47, 0);
        leftShoulderCap.rotation.z = 0.14;
        leftShoulderCap.castShadow = true;
        group.add(leftShoulderCap);

        // === Wind-Swept Split Darkwear Parka Tail ===
        const coatTail = new THREE.Group();
        coatTail.name = 'AvatarCoatTail';
        coatTail.position.set(0, 0.86, -0.15);

        const leftFlap = new THREE.Mesh(
          new THREE.BoxGeometry(0.30, 0.66, 0.08),
          darkwearShellMat
        );
        leftFlap.position.set(-0.17, -0.32, -0.03);
        leftFlap.rotation.z = 0.08;
        leftFlap.castShadow = true;
        coatTail.add(leftFlap);

        const rightFlap = new THREE.Mesh(
          new THREE.BoxGeometry(0.30, 0.66, 0.08),
          darkwearShellMat
        );
        rightFlap.position.set(0.17, -0.32, -0.03);
        rightFlap.rotation.z = -0.08;
        rightFlap.castShadow = true;
        coatTail.add(rightFlap);

        const tailTrim = new THREE.Mesh(
          new THREE.BoxGeometry(0.64, 0.06, 0.09),
          darkwearLayerMat
        );
        tailTrim.position.set(0, -0.63, -0.03);
        coatTail.add(tailTrim);
        group.add(coatTail);

        // High Matte Storm Collar (#3B424C)
        const stormCollar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.25, 0.28, 0.18, 8),
          darkwearLayerMat
        );
        stormCollar.position.y = 1.60;
        stormCollar.castShadow = true;
        group.add(stormCollar);

        // === Stealth Darkwear Hood + Ballistic Mask + Discreet #4A7C7E Ocular Slit ===
        const head = new THREE.Group();
        head.name = 'AvatarHead';
        head.position.set(0, 1.80, 0);

        const cowlHood = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.26, 1),
          darkwearShellMat
        );
        cowlHood.scale.set(0.96, 1.08, 1.04);
        cowlHood.castShadow = true;
        head.add(cowlHood);

        const faceMask = new THREE.Mesh(
          new THREE.BoxGeometry(0.32, 0.16, 0.24),
          darkwearLayerMat
        );
        faceMask.position.set(0, -0.05, 0.10);
        head.add(faceMask);

        const ocularSlit = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 0.042, 0.06),
          punctualAccentMat
        );
        ocularSlit.position.set(0, 0.03, 0.22);
        head.add(ocularSlit);
        group.add(head);

        // === Left Arm: Darkwear Hardshell Sleeve ===
        const leftArm = new THREE.Group();
        leftArm.name = 'AvatarLeftArm';
        leftArm.position.set(-0.42, 1.44, 0.0);

        const lUpperSleeve = new THREE.Mesh(
          new THREE.BoxGeometry(0.17, 0.34, 0.19),
          darkwearShellMat
        );
        lUpperSleeve.position.y = -0.16;
        lUpperSleeve.castShadow = true;
        leftArm.add(lUpperSleeve);

        const lForearmCuff = new THREE.Mesh(
          new THREE.BoxGeometry(0.15, 0.30, 0.17),
          darkwearLayerMat
        );
        lForearmCuff.position.set(-0.01, -0.46, 0.04);
        lForearmCuff.rotation.x = -0.18;
        lForearmCuff.castShadow = true;
        leftArm.add(lForearmCuff);

        const lGlove = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.13, 0.14), darkwearShellMat);
        lGlove.position.set(-0.01, -0.64, 0.07);
        leftArm.add(lGlove);
        group.add(leftArm);

        // === Right Arm: Integrated Cybernetic Mechanical Arm (#6E7B87 & #8A99A6, zero weapon) ===
        const rightArm = new THREE.Group();
        rightArm.name = 'AvatarMechanicalArm';
        rightArm.position.set(0.44, 1.44, 0.0);

        // 1. Cybernetic Deltoid Servo Mount (#6E7B87) + Discreet #4A7C7E Telemetry Pin
        const shoulderServo = new THREE.Mesh(
          new THREE.BoxGeometry(0.24, 0.22, 0.26),
          mechChassisMat
        );
        shoulderServo.position.set(0.02, 0.01, 0);
        shoulderServo.castShadow = true;
        rightArm.add(shoulderServo);

        const shoulderCollarPlate = new THREE.Mesh(
          new THREE.BoxGeometry(0.26, 0.06, 0.28),
          mechAlloyMat
        );
        shoulderCollarPlate.position.set(0.02, 0.11, 0);
        rightArm.add(shoulderCollarPlate);

        const servoPin = new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 0.05, 0.29),
          punctualAccentMat
        );
        servoPin.position.set(0.08, 0.02, 0);
        rightArm.add(servoPin);

        // 2. Skeletal Alloy Humerus & Parallel Hydraulic Piston (#8A99A6 & #6E7B87)
        const upperArmCore = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.30, 0.16),
          mechAlloyMat
        );
        upperArmCore.position.set(0.02, -0.18, 0);
        upperArmCore.castShadow = true;
        rightArm.add(upperArmCore);

        const hydraulicStrut = new THREE.Mesh(
          new THREE.CylinderGeometry(0.032, 0.032, 0.28, 6),
          mechChassisMat
        );
        hydraulicStrut.position.set(0.10, -0.18, -0.03);
        rightArm.add(hydraulicStrut);

        // 3. Articulated Mechanical Elbow Hinge & Prosthetic Forearm (`rightForearm`)
        const rightForearm = new THREE.Group();
        rightForearm.name = 'AvatarMechanicalForearm';
        rightForearm.position.set(0.02, -0.34, 0.0);
        rightForearm.rotation.x = -0.24;

        const elbowDrum = new THREE.Mesh(
          new THREE.CylinderGeometry(0.095, 0.095, 0.20, 8),
          mechChassisMat
        );
        elbowDrum.rotation.z = Math.PI * 0.5;
        rightForearm.add(elbowDrum);

        const forearmOuterPlate = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.30, 0.18),
          mechAlloyMat
        );
        forearmOuterPlate.position.set(0.01, -0.18, 0.01);
        forearmOuterPlate.castShadow = true;
        rightForearm.add(forearmOuterPlate);

        const forearmInnerRail = new THREE.Mesh(
          new THREE.BoxGeometry(0.18, 0.08, 0.20),
          mechChassisMat
        );
        forearmInnerRail.position.set(0.01, -0.16, 0.01);
        rightForearm.add(forearmInnerRail);

        const wristCoupling = new THREE.Mesh(
          new THREE.CylinderGeometry(0.075, 0.08, 0.07, 8),
          mechChassisMat
        );
        wristCoupling.position.set(0.01, -0.35, 0.01);
        rightForearm.add(wristCoupling);

        // 4. Articulated Mechanical Hand & Fingers (#6E7B87 palm + #8A99A6 digits)
        const mechPalm = new THREE.Mesh(
          new THREE.BoxGeometry(0.11, 0.10, 0.14),
          mechChassisMat
        );
        mechPalm.position.set(0.01, -0.42, 0.02);
        mechPalm.castShadow = true;
        rightForearm.add(mechPalm);

        for (let f = -1; f <= 1; f++) {
          const finger = new THREE.Mesh(
            new THREE.BoxGeometry(0.032, 0.10, 0.036),
            mechAlloyMat
          );
          finger.position.set(0.03, -0.50, 0.02 + f * 0.042);
          finger.rotation.z = -0.12;
          rightForearm.add(finger);
        }

        const mechThumb = new THREE.Mesh(
          new THREE.BoxGeometry(0.034, 0.08, 0.038),
          mechAlloyMat
        );
        mechThumb.position.set(-0.04, -0.45, 0.08);
        mechThumb.rotation.x = 0.35;
        rightForearm.add(mechThumb);

        rightArm.add(rightForearm);
        group.add(rightArm);

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
              damping: 9.0,
            },
            RotationTarget: {
              targetYaw: 0.12,
              targetPitch: 0,
              targetRoll: 0,
              lerpSpeed: 9.5,
              idleSpinSpeed: 0,
              maxPitch: 0.16,
            },
            NavigationTarget: {
              targetX: ctx.position[0],
              targetZ: ctx.position[2],
              active: false,
              moveSpeed: 3.5,
              arrivalRadius: 0.08,
              minX: -4.8,
              maxX: 4.8,
              minZ: -9.2,
              maxZ: 11.8,
            },
            CameraFollow: {
              offsetX: 0,
              offsetY: 2.25,
              offsetZ: 3.7,
              lookAtOffsetY: 1.08,
              followSharpness: 12.0,
              initialized: false,
            },
            AnimationState: {
              baseY: ctx.position[1],
              bobAmplitude: 0.018,
              bobFrequency: 2.1,
              breatheAmplitude: 0.012,
              phase: 1.1,
              excitement: 0,
              isMoving: false,
              locomotionBlend: 0,
              stridePhase: 0,
              parts: {
                head,
                leftArm,
                rightArm,
                rightForearm,
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
              yawSensitivity: 0.35,
              pitchSensitivity: 0.12,
              moveSpeed: 3.5,
              boundsRadius: 12.0,
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
        rotationY: 0.12,
        scale: 1.12,
        layer: 'foreground',
      },
      {}
    );
    return { entityId: res.entityId, group: res.object3D as THREE.Group };
  }
}
