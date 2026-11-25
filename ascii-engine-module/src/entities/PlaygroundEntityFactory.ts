import * as THREE from 'three';
import type { EntityId, World } from '../ecs/World';
import type { ThemePalette } from '../types';

/**
 * PlaygroundEntityFactory: Spawns interactive Cyberpunk ECS entities inside `[ ASCII REALMS // SCENE ]`:
 * - Levitating Holographic Quantum Reactor Core + Twin Gyro-Rings + Neon PointLight (`spawnShrineCrystal`)
 * - Pulsing Cyber-Neon Street Pylons (`spawnBrazierBeacon`)
 * - Autonomous Aerial Patrol Drones / Spinners (`spawnCyberDrone`)
 * - Interactive Cyber-Runner Netrunner Avatar with glowing visor & data-katana/staff (`spawnWayfarerAvatar`)
 */
export class PlaygroundEntityFactory {
  public static spawnShrineCrystal(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    position: [number, number, number],
    enableShadows: boolean
  ): { entityId: EntityId; torchLight: THREE.PointLight } {
    const group = new THREE.Group();
    group.name = 'CyberHoloReactor';

    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.warmCore),
      emissive: new THREE.Color(palette.warmLight),
      emissiveIntensity: 2.65,
      roughness: 0.15,
      metalness: 0.35,
      flatShading: true,
    });

    const cyanRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.coolAmbient),
      emissive: new THREE.Color(palette.coolAmbient),
      emissiveIntensity: 1.75,
      roughness: 0.25,
      metalness: 0.65,
      flatShading: true,
    });

    const darkFrameMat = new THREE.MeshStandardMaterial({
      color: 0x101826,
      roughness: 0.6,
      metalness: 0.7,
      flatShading: true,
    });

    // Octahedral plasma data-core
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.98, 0), coreMat);
    crystal.scale.set(0.88, 1.62, 0.88);
    group.add(crystal);

    // Outer cybernetic gyro-ring (renders crisp circular/diagonal ASCII glyphs)
    const orbitRing = new THREE.Group();
    const ringTorus = new THREE.Mesh(new THREE.TorusGeometry(1.58, 0.08, 6, 20), cyanRingMat);
    ringTorus.rotation.x = Math.PI * 0.36;
    orbitRing.add(ringTorus);

    const innerFrame = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.055, 4, 12), darkFrameMat);
    innerFrame.rotation.y = Math.PI * 0.25;
    orbitRing.add(innerFrame);
    group.add(orbitRing);

    group.position.set(position[0], position[1], position[2]);
    scene.add(group);

    const torchLight = new THREE.PointLight(new THREE.Color(palette.warmLight), 46.0, 36.0, 1.5);
    torchLight.position.set(position[0], position[1] + 0.35, position[2] + 0.4);
    torchLight.castShadow = enableShadows;
    if (enableShadows) {
      torchLight.shadow.mapSize.width = 512;
      torchLight.shadow.mapSize.height = 512;
      torchLight.shadow.camera.near = 0.5;
      torchLight.shadow.camera.far = 32;
      torchLight.shadow.bias = -0.002;
    }
    scene.add(torchLight);

    const entityId = ecsWorld.createEntity();
    ecsWorld.addComponent(entityId, 'LifecycleTag', {
      role: 'core',
      label: 'HoloReactorCore',
    });

    ecsWorld.addComponent(entityId, 'Transform', {
      x: position[0],
      y: position[1],
      z: position[2],
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    });

    ecsWorld.addComponent(entityId, 'RotationTarget', {
      targetYaw: 0,
      targetPitch: 0,
      targetRoll: 0,
      lerpSpeed: 3.2,
      idleSpinSpeed: 0.78,
      maxPitch: 0.25,
    });

    ecsWorld.addComponent(entityId, 'AnimationState', {
      baseY: position[1],
      bobAmplitude: 0.24,
      bobFrequency: 1.9,
      breatheAmplitude: 0.025,
      phase: 0,
      excitement: 0,
      parts: {
        orbitRing,
      },
    });

    ecsWorld.addComponent(entityId, 'NeonBeacon', {
      emissiveMaterial: coreMat,
      baseEmissiveIntensity: 2.65,
      pulseSpeed: 3.4,
      pulseAmplitude: 0.18,
      phase: 0.4,
      glitchRate: 0.08,
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: group,
      pointLight: torchLight,
      baseLightIntensity: 46.0,
      lightFlickerSpeed: 6.8,
    });

    return { entityId, torchLight };
  }

  public static spawnBrazierBeacon(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    position: [number, number, number],
    phaseOffset: number,
    tone: 'cyan' | 'magenta' | 'amber' = 'cyan'
  ): { entityId: EntityId; light: THREE.PointLight } {
    const group = new THREE.Group();
    group.name = 'CyberNeonPylon';

    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x111927,
      roughness: 0.55,
      metalness: 0.72,
      flatShading: true,
    });

    const neonHex =
      tone === 'cyan'
        ? palette.coolAmbient
        : tone === 'magenta'
          ? palette.warmLight
          : palette.warmCore;

    const tubeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(neonHex),
      emissive: new THREE.Color(neonHex),
      emissiveIntensity: 2.5,
      roughness: 0.15,
      flatShading: true,
    });

    // Sleek cybernetic street pylon base + vertical glowing plasma tube ('|' glyph magnet!)
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.36, 0.48), chassisMat);
    base.position.y = 0.18;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.85, 0.22), chassisMat);
    mast.position.y = 1.1;
    mast.castShadow = true;
    group.add(mast);

    const neonBar = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.45, 0.28), tubeMat);
    neonBar.position.y = 1.22;
    group.add(neonBar);

    const crown = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), tubeMat);
    crown.position.y = 2.18;
    group.add(crown);

    group.position.set(position[0], position[1], position[2]);
    scene.add(group);

    const light = new THREE.PointLight(new THREE.Color(neonHex), 14.5, 14.0, 1.65);
    light.position.set(position[0], position[1] + 2.1, position[2]);
    scene.add(light);

    const entityId = ecsWorld.createEntity();
    ecsWorld.addComponent(entityId, 'LifecycleTag', {
      role: 'beacon',
      label: `NeonPylon_${tone}`,
    });

    ecsWorld.addComponent(entityId, 'Transform', {
      x: position[0],
      y: position[1],
      z: position[2],
      rotX: 0,
      rotY: phaseOffset * 0.2,
      rotZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    });

    ecsWorld.addComponent(entityId, 'AnimationState', {
      baseY: position[1],
      bobAmplitude: 0,
      bobFrequency: 2.2,
      breatheAmplitude: 0.01,
      phase: phaseOffset,
      excitement: 0,
    });

    ecsWorld.addComponent(entityId, 'NeonBeacon', {
      emissiveMaterial: tubeMat,
      baseEmissiveIntensity: 2.5,
      pulseSpeed: 4.2,
      pulseAmplitude: 0.22,
      phase: phaseOffset,
      glitchRate: 0.16,
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: group,
      pointLight: light,
      baseLightIntensity: 14.5,
      lightFlickerSpeed: 8.5,
    });

    return { entityId, light };
  }

  /**
   * Spawns an autonomous Cyberpunk Hover-Spinner / Patrol Drone cruising through the urban canyon.
   */
  public static spawnCyberDrone(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    spec: {
      origin: [number, number, number];
      amplitude: [number, number, number];
      speed: number;
      phase: number;
      tone: 'cyan' | 'magenta' | 'amber';
    }
  ): { entityId: EntityId } {
    const group = new THREE.Group();
    group.name = 'CyberHoverSpinner';

    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x0e1624,
      roughness: 0.45,
      metalness: 0.8,
      flatShading: true,
    });

    const accentHex =
      spec.tone === 'cyan'
        ? palette.coolAmbient
        : spec.tone === 'magenta'
          ? palette.warmLight
          : palette.warmCore;

    const thrusterMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(accentHex),
      emissive: new THREE.Color(accentHex),
      emissiveIntensity: 2.8,
      roughness: 0.1,
      flatShading: true,
    });

    const fuselage = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.24, 1.35), hullMat);
    group.add(fuselage);

    const lightStrip = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.09, 1.15), thrusterMat);
    lightStrip.position.y = -0.04;
    group.add(lightStrip);

    group.position.set(...spec.origin);
    scene.add(group);

    const entityId = ecsWorld.createEntity();
    ecsWorld.addComponent(entityId, 'LifecycleTag', {
      role: 'vehicle',
      label: `HoverSpinner_${spec.tone}`,
    });

    ecsWorld.addComponent(entityId, 'Transform', {
      x: spec.origin[0],
      y: spec.origin[1],
      z: spec.origin[2],
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    });

    ecsWorld.addComponent(entityId, 'PatrolPath', {
      originX: spec.origin[0],
      originY: spec.origin[1],
      originZ: spec.origin[2],
      amplitudeX: spec.amplitude[0],
      amplitudeY: spec.amplitude[1],
      amplitudeZ: spec.amplitude[2],
      speed: spec.speed,
      phase: spec.phase,
      faceTangent: true,
    });

    ecsWorld.addComponent(entityId, 'NeonBeacon', {
      emissiveMaterial: thrusterMat,
      baseEmissiveIntensity: 2.8,
      pulseSpeed: 6.0,
      pulseAmplitude: 0.16,
      phase: spec.phase,
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: group,
    });

    return { entityId };
  }

  /**
   * Spawns a Cyberpunk Netrunner / Street Samurai character on the neon skybridge
   * with high-collar trench coat, glowing cyan visor, and illuminated plasma staff/blade.
   */
  public static spawnWayfarerAvatar(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    position: [number, number, number]
  ): { entityId: EntityId; group: THREE.Group } {
    const group = new THREE.Group();
    group.name = 'CyberNetrunnerAvatar';

    const coatMat = new THREE.MeshStandardMaterial({
      color: 0x0d1522,
      emissive: 0x050a12,
      roughness: 0.62,
      metalness: 0.45,
      flatShading: true,
    });

    const collarNeonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.warmLight),
      emissive: new THREE.Color(palette.warmLight),
      emissiveIntensity: 1.9,
      roughness: 0.25,
      flatShading: true,
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.cursorLight),
      emissive: new THREE.Color(palette.cursorLight),
      emissiveIntensity: 2.6,
      roughness: 0.15,
      flatShading: true,
    });

    // Armored cyber-trench silhouette
    const coat = new THREE.Mesh(new THREE.ConeGeometry(0.44, 1.22, 6), coatMat);
    coat.position.y = 0.64;
    coat.castShadow = true;
    group.add(coat);

    // Glowing high tech-collar (magenta neon rim)
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.065, 5, 10), collarNeonMat);
    collar.rotation.x = Math.PI * 0.46;
    collar.position.y = 1.18;
    group.add(collar);

    // Cybernetic helmet + horizontal glowing visor bar
    const head = new THREE.Group();
    head.position.set(0, 1.38, 0);
    const helm = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 1), coatMat);
    helm.scale.set(0.95, 1.08, 1.0);
    helm.castShadow = true;
    head.add(helm);

    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.075, 0.14), visorMat);
    visor.position.set(0, 0.02, 0.19);
    head.add(visor);
    group.add(head);

    // Illuminated cyber-blade / antenna baton on right shoulder
    const bladePivot = new THREE.Group();
    bladePivot.position.set(0.38, 0.88, 0.1);
    const bladeCore = new THREE.Mesh(new THREE.BoxGeometry(0.055, 1.48, 0.09), visorMat);
    bladeCore.rotation.z = -0.16;
    bladePivot.add(bladeCore);
    group.add(bladePivot);

    group.position.set(position[0], position[1], position[2]);
    scene.add(group);

    const entityId = ecsWorld.createEntity();
    ecsWorld.addComponent(entityId, 'LifecycleTag', {
      role: 'avatar',
      label: 'CyberNetrunner',
    });

    ecsWorld.addComponent(entityId, 'Transform', {
      x: position[0],
      y: position[1],
      z: position[2],
      rotX: 0,
      rotY: 0.22,
      rotZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    });

    ecsWorld.addComponent(entityId, 'Velocity', {
      vx: 0,
      vy: 0,
      vz: 0,
      angularVx: 0,
      angularVy: 0,
      angularVz: 0,
      damping: 7.5,
    });

    ecsWorld.addComponent(entityId, 'RotationTarget', {
      targetYaw: 0.22,
      targetPitch: 0,
      targetRoll: 0,
      lerpSpeed: 5.2,
      idleSpinSpeed: 0,
      maxPitch: 0.22,
    });

    ecsWorld.addComponent(entityId, 'AnimationState', {
      baseY: position[1],
      bobAmplitude: 0.03,
      bobFrequency: 2.3,
      breatheAmplitude: 0.018,
      phase: 1.1,
      excitement: 0,
      parts: {
        head,
        rightWing: bladePivot,
      },
    });

    ecsWorld.addComponent(entityId, 'InputState', {
      pointerX: 0,
      pointerY: 0,
      pointerActive: false,
      isDragging: false,
      moveX: 0,
      moveZ: 0,
      yawSensitivity: 0.88,
      pitchSensitivity: 0.2,
      moveSpeed: 3.6,
      boundsRadius: 6.4,
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: group,
    });

    return { entityId, group };
  }
}
