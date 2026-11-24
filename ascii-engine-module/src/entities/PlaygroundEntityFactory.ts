import * as THREE from 'three';
import type { EntityId, World } from '../ecs/World';
import type { ThemePalette } from '../types';

/**
 * PlaygroundEntityFactory: Spawns lightweight interactive points of interest (POIs)
 * and a compact ASCII Realms Explorer character inside the island playground:
 * - Levitating Shrine Rune Crystal + Stone Orbit Ring + Warm Torch PointLight
 * - Flickering Sanctuary Braziers / Beacons
 * - Interactive Wayfarer Explorer Avatar (with lantern staff, subtle breathing & pointer/WASD readiness)
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
    group.name = 'ShrineRuneCrystal';

    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.warmCore),
      emissive: new THREE.Color(palette.warmLight),
      emissiveIntensity: 2.35,
      roughness: 0.18,
      metalness: 0.1,
      flatShading: true,
    });

    const stoneRingMat = new THREE.MeshStandardMaterial({
      color: 0x3b4d5e,
      roughness: 0.88,
      metalness: 0.18,
      flatShading: true,
    });

    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.95, 0), coreMat);
    crystal.scale.set(0.86, 1.55, 0.86);
    group.add(crystal);

    const orbitRing = new THREE.Mesh(new THREE.TorusGeometry(1.48, 0.085, 6, 18), stoneRingMat);
    orbitRing.rotation.x = Math.PI * 0.35;
    group.add(orbitRing);

    group.position.set(position[0], position[1], position[2]);
    scene.add(group);

    const torchLight = new THREE.PointLight(new THREE.Color(palette.warmLight), 42.0, 32.0, 1.55);
    torchLight.position.set(position[0], position[1] + 0.3, position[2] + 0.35);
    torchLight.castShadow = enableShadows;
    if (enableShadows) {
      torchLight.shadow.mapSize.width = 512;
      torchLight.shadow.mapSize.height = 512;
      torchLight.shadow.camera.near = 0.5;
      torchLight.shadow.camera.far = 28;
      torchLight.shadow.bias = -0.002;
    }
    scene.add(torchLight);

    const entityId = ecsWorld.createEntity();
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
      lerpSpeed: 3.0,
      idleSpinSpeed: 0.68,
      maxPitch: 0.25,
    });

    ecsWorld.addComponent(entityId, 'AnimationState', {
      baseY: position[1],
      bobAmplitude: 0.22,
      bobFrequency: 1.85,
      breatheAmplitude: 0,
      phase: 0,
      excitement: 0,
      parts: {
        orbitRing,
      },
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: group,
      pointLight: torchLight,
      baseLightIntensity: 42.0,
      lightFlickerSpeed: 7.4,
    });

    return { entityId, torchLight };
  }

  public static spawnBrazierBeacon(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    position: [number, number, number],
    phaseOffset: number
  ): { entityId: EntityId; light: THREE.PointLight } {
    const group = new THREE.Group();
    group.name = 'SanctuaryBrazier';

    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x344656,
      roughness: 0.9,
      metalness: 0.14,
      flatShading: true,
    });

    const emberMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.warmCore),
      emissive: new THREE.Color(palette.warmLight),
      emissiveIntensity: 2.0,
      roughness: 0.25,
      flatShading: true,
    });

    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.38, 1.05, 6), stoneMat);
    pedestal.position.y = 0.52;
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    group.add(pedestal);

    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.22, 0.26, 6), stoneMat);
    bowl.position.y = 1.12;
    bowl.castShadow = true;
    group.add(bowl);

    const flame = new THREE.Mesh(new THREE.OctahedronGeometry(0.26, 0), emberMat);
    flame.position.y = 1.42;
    flame.scale.set(0.85, 1.45, 0.85);
    group.add(flame);

    group.position.set(position[0], position[1], position[2]);
    scene.add(group);

    const light = new THREE.PointLight(new THREE.Color(palette.warmLight), 9.5, 11.5, 1.7);
    light.position.set(position[0], position[1] + 1.55, position[2]);
    scene.add(light);

    const entityId = ecsWorld.createEntity();
    ecsWorld.addComponent(entityId, 'Transform', {
      x: position[0],
      y: position[1],
      z: position[2],
      rotX: 0,
      rotY: phaseOffset,
      rotZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    });

    ecsWorld.addComponent(entityId, 'AnimationState', {
      baseY: position[1],
      bobAmplitude: 0,
      bobFrequency: 2.2,
      breatheAmplitude: 0.015,
      phase: phaseOffset,
      excitement: 0,
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: group,
      pointLight: light,
      baseLightIntensity: 9.5,
      lightFlickerSpeed: 9.2,
    });

    return { entityId, light };
  }

  /**
   * Spawns a compact cloaked Wayfarer Explorer character on the stone bridge/courtyard
   * holding a glowing cyan rune lantern, reactive to pointer look-at and optional WASD movement.
   */
  public static spawnWayfarerAvatar(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    position: [number, number, number]
  ): { entityId: EntityId; group: THREE.Group } {
    const group = new THREE.Group();
    group.name = 'WayfarerAvatar';

    const cloakMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a4c,
      emissive: 0x0b1a26,
      roughness: 0.78,
      metalness: 0.12,
      flatShading: true,
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xdbeeff,
      emissive: 0x67b7dc,
      emissiveIntensity: 0.25,
      roughness: 0.5,
      flatShading: true,
    });

    const staffWood = new THREE.MeshStandardMaterial({
      color: 0x5c3d28,
      roughness: 0.9,
      flatShading: true,
    });

    const lanternMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.cursorLight),
      emissive: new THREE.Color(palette.cursorLight),
      emissiveIntensity: 2.1,
      roughness: 0.2,
      flatShading: true,
    });

    // Cloaked body cone
    const cloak = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.15, 7), cloakMat);
    cloak.position.y = 0.62;
    cloak.castShadow = true;
    group.add(cloak);

    // Scarf / Mantle collar for crisp ASCII contrast
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.075, 5, 10), trimMat);
    collar.rotation.x = Math.PI * 0.5;
    collar.position.y = 1.14;
    group.add(collar);

    // Hooded head pivot
    const head = new THREE.Group();
    head.position.set(0, 1.34, 0);
    const hood = new THREE.Mesh(new THREE.ConeGeometry(0.27, 0.48, 6), cloakMat);
    hood.position.y = 0.08;
    hood.castShadow = true;
    head.add(hood);

    // Glowing eyes under hood
    for (const side of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.038, 6, 6), lanternMat);
      eye.position.set(side * 0.075, 0.02, 0.19);
      head.add(eye);
    }
    group.add(head);

    // Explorer Staff + Hanging Lantern on right side
    const staffPivot = new THREE.Group();
    staffPivot.position.set(0.38, 0.85, 0.12);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.55, 5), staffWood);
    shaft.rotation.z = -0.12;
    staffPivot.add(shaft);

    const lanternGem = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), lanternMat);
    lanternGem.position.set(0.12, 0.72, 0.08);
    staffPivot.add(lanternGem);
    group.add(staffPivot);

    group.position.set(position[0], position[1], position[2]);
    scene.add(group);

    const entityId = ecsWorld.createEntity();
    ecsWorld.addComponent(entityId, 'Transform', {
      x: position[0],
      y: position[1],
      z: position[2],
      rotX: 0,
      rotY: 0.25,
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
      targetYaw: 0.25,
      targetPitch: 0,
      targetRoll: 0,
      lerpSpeed: 5.0,
      idleSpinSpeed: 0,
      maxPitch: 0.2,
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
        rightWing: staffPivot,
      },
    });

    ecsWorld.addComponent(entityId, 'InputState', {
      pointerX: 0,
      pointerY: 0,
      pointerActive: false,
      isDragging: false,
      moveX: 0,
      moveZ: 0,
      yawSensitivity: 0.85,
      pitchSensitivity: 0.18,
      moveSpeed: 3.4,
      boundsRadius: 6.2,
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: group,
    });

    return { entityId, group };
  }
}
