import * as THREE from 'three';
import type { EntityId, World } from '../ecs/World';

export interface TuxSpawnOptions {
  position?: [number, number, number];
  scale?: number;
  /** High-contrast Neofetch showcase lighting rig attached to Tux */
  includeShowcaseRig?: boolean;
  /** Optional vertical idle bob amplitude override (smaller keeps feet grounded on floor) */
  bobAmplitude?: number;
  /** Allow future keyboard movement if spawned inside playground */
  moveSpeed?: number;
  boundsRadius?: number;
}

/**
 * TuxEntityFactory: Builds an articulated, high-contrast 3D Linux Tux penguin entity
 * calibrated against classic ASCII Tux silhouette contrast:
 * - Deep charcoal-obsidian dorsal coat & flippers (renders densestructural edges `/`, `\`, `|`, `#`, `M`)
 * - Crisp snow-white chest & face mask (renders clean high-luminance `@`, `#`, `B`, `R`, `Y` contrast)
 * - Vivid golden-amber triangular beak & webbed feet
 * - Distinct expressive eyes with dark pupils & specular catchlights
 * - Articulated wing pivots, head pivot, and foot pivots animated via `AnimationSystem`
 */
export class TuxEntityFactory {
  public static spawn(
    ecsWorld: World,
    scene: THREE.Scene,
    options?: TuxSpawnOptions
  ): { entityId: EntityId; rootGroup: THREE.Group } {
    const pos = options?.position ?? [0, -0.35, 0];
    const baseScale = options?.scale ?? 1.0;

    const rootGroup = new THREE.Group();
    rootGroup.name = 'TuxMascotRoot';

    // Smooth, facet-free materials calibrated for balanced ASCII contrast against #13222E & #1D2B36
    const obsidianCoat = new THREE.MeshStandardMaterial({
      color: 0x0b1017,
      emissive: 0x030508,
      emissiveIntensity: 1.0,
      roughness: 0.62,
      metalness: 0.08,
      flatShading: false,
    });

    const brightBelly = new THREE.MeshStandardMaterial({
      color: 0xeef6fc,
      emissive: 0xd6eaf8,
      emissiveIntensity: 0.28,
      roughness: 0.56,
      metalness: 0.0,
      flatShading: false,
    });

    const amberBeakFeet = new THREE.MeshStandardMaterial({
      color: 0xff9f1c,
      emissive: 0xe06d00,
      emissiveIntensity: 0.24,
      roughness: 0.52,
      metalness: 0.04,
      flatShading: false,
    });

    const eyeSclera = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyePupil = new THREE.MeshBasicMaterial({ color: 0x050608 });

    // 1. Smooth Pear-shaped Penguin Torso (36x28 segments, smooth vertex normals — zero hard facets)
    const torso = new THREE.Mesh(new THREE.SphereGeometry(0.75, 36, 28), obsidianCoat);
    torso.position.set(0, 0.86, 0);
    torso.scale.set(0.92, 1.18, 0.80);
    torso.castShadow = true;
    torso.receiveShadow = true;
    rootGroup.add(torso);

    // 2. Smooth Snow-White Belly Patch (+0.071 cleanly proud of torso front to prevent Z-intersection blotches)
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.58, 36, 28), brightBelly);
    belly.position.set(0, 0.79, 0.23);
    belly.scale.set(0.84, 1.12, 0.76);
    rootGroup.add(belly);

    // 3. Articulated Smooth Head Pivot
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 1.72, 0.04);

    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.48, 32, 24), obsidianCoat);
    skull.scale.set(0.98, 0.95, 0.90);
    skull.castShadow = true;
    headPivot.add(skull);

    // Smooth white cheek/eye patches proud of skull front so facial mask never clips or blotches
    const facePatchL = new THREE.Mesh(new THREE.SphereGeometry(0.21, 24, 20), brightBelly);
    facePatchL.position.set(-0.135, 0.015, 0.25);
    facePatchL.scale.set(0.86, 1.04, 1.05);
    headPivot.add(facePatchL);

    const facePatchR = new THREE.Mesh(new THREE.SphereGeometry(0.21, 24, 20), brightBelly);
    facePatchR.position.set(0.135, 0.015, 0.25);
    facePatchR.scale.set(0.86, 1.04, 1.05);
    headPivot.add(facePatchR);

    // Expressive Sclera + Pupils cleanly proud of facial patches
    for (const side of [-1, 1]) {
      const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.105, 18, 14), eyeSclera);
      sclera.position.set(side * 0.15, 0.09, 0.43);
      sclera.scale.set(0.92, 1.12, 0.52);
      headPivot.add(sclera);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.054, 14, 12), eyePupil);
      pupil.position.set(side * 0.145, 0.09, 0.475);
      headPivot.add(pupil);
    }

    // Smooth rounded sculpted Tux Beak
    const upperBeak = new THREE.Mesh(new THREE.ConeGeometry(0.21, 0.42, 24), amberBeakFeet);
    upperBeak.rotation.x = Math.PI * 0.52;
    upperBeak.scale.set(1.22, 1.0, 0.58);
    upperBeak.position.set(0, -0.07, 0.55);
    upperBeak.castShadow = true;
    headPivot.add(upperBeak);

    rootGroup.add(headPivot);

    // 4. Articulated Left & Right Flipper Wings (smooth rounded cones)
    const leftWingPivot = new THREE.Group();
    leftWingPivot.position.set(-0.66, 1.32, 0.02);
    leftWingPivot.rotation.z = 0.28;
    const leftWingMesh = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.96, 24), obsidianCoat);
    leftWingMesh.position.set(-0.08, -0.42, 0);
    leftWingMesh.scale.set(0.55, 1.0, 1.28);
    leftWingMesh.rotation.z = Math.PI;
    leftWingMesh.castShadow = true;
    leftWingPivot.add(leftWingMesh);
    rootGroup.add(leftWingPivot);

    const rightWingPivot = new THREE.Group();
    rightWingPivot.position.set(0.66, 1.32, 0.02);
    rightWingPivot.rotation.z = -0.28;
    const rightWingMesh = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.96, 24), obsidianCoat);
    rightWingMesh.position.set(0.08, -0.42, 0);
    rightWingMesh.scale.set(0.55, 1.0, 1.28);
    rightWingMesh.rotation.z = Math.PI;
    rightWingMesh.castShadow = true;
    rightWingPivot.add(rightWingMesh);
    rootGroup.add(rightWingPivot);

    // 5. Seated Smooth Webbed Feet
    const leftFootPivot = new THREE.Group();
    leftFootPivot.position.set(-0.34, 0.08, 0.34);
    leftFootPivot.rotation.y = 0.26;
    const leftFootMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 18), amberBeakFeet);
    leftFootMesh.scale.set(0.82, 0.30, 1.18);
    leftFootMesh.position.set(0, 0.01, 0.12);
    leftFootMesh.castShadow = true;
    leftFootPivot.add(leftFootMesh);
    rootGroup.add(leftFootPivot);

    const rightFootPivot = new THREE.Group();
    rightFootPivot.position.set(0.34, 0.08, 0.34);
    rightFootPivot.rotation.y = -0.26;
    const rightFootMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 18), amberBeakFeet);
    rightFootMesh.scale.set(0.82, 0.30, 1.18);
    rightFootMesh.position.set(0, 0.01, 0.12);
    rightFootMesh.castShadow = true;
    rightFootPivot.add(rightFootMesh);
    rootGroup.add(rightFootPivot);

    // 6. Smooth Stubby Tail
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.34, 18), obsidianCoat);
    tail.position.set(0, 0.22, -0.64);
    tail.rotation.x = -Math.PI * 0.42;
    tail.castShadow = true;
    rootGroup.add(tail);

    // Optional Neofetch pedestal & rim/key light rig for crystal-clear silhouette separation
    if (options?.includeShowcaseRig) {
      const plinthMat = new THREE.MeshStandardMaterial({
        color: 0x1b3344,
        roughness: 0.85,
        metalness: 0.15,
        flatShading: true,
      });
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 1.08, 0.16, 12), plinthMat);
      plinth.name = 'TuxShowcasePlinth';
      plinth.userData.isShowcasePedestal = true;
      plinth.position.set(0, -0.06, 0.08);
      plinth.receiveShadow = true;
      rootGroup.add(plinth);
    }

    rootGroup.position.set(pos[0], pos[1], pos[2]);
    rootGroup.scale.setScalar(baseScale);
    scene.add(rootGroup);

    // Register ECS Entity & Pure Data Components
    const entityId = ecsWorld.createEntity();

    ecsWorld.addComponent(entityId, 'Transform', {
      x: pos[0],
      y: pos[1],
      z: pos[2],
      rotX: 0,
      rotY: 0.14,
      rotZ: 0,
      scaleX: baseScale,
      scaleY: baseScale,
      scaleZ: baseScale,
    });

    ecsWorld.addComponent(entityId, 'Velocity', {
      vx: 0,
      vy: 0,
      vz: 0,
      angularVx: 0,
      angularVy: 0,
      angularVz: 0,
      damping: 6.5,
    });

    ecsWorld.addComponent(entityId, 'RotationTarget', {
      targetYaw: 0.14,
      targetPitch: 0,
      targetRoll: 0,
      lerpSpeed: 6.2,
      idleSpinSpeed: 0,
      maxPitch: 0.46,
    });

    ecsWorld.addComponent(entityId, 'AnimationState', {
      baseY: pos[1],
      bobAmplitude: options?.bobAmplitude ?? 0.045,
      bobFrequency: 2.1,
      breatheAmplitude: 0.022,
      phase: 0.3,
      excitement: 0,
      parts: {
        leftWing: leftWingPivot,
        rightWing: rightWingPivot,
        head: headPivot,
        leftFoot: leftFootPivot,
        rightFoot: rightFootPivot,
      },
    });

    ecsWorld.addComponent(entityId, 'InputState', {
      pointerX: 0,
      pointerY: 0,
      pointerActive: false,
      isDragging: false,
      moveX: 0,
      moveZ: 0,
      yawSensitivity: 1.25,
      pitchSensitivity: 0.4,
      moveSpeed: options?.moveSpeed ?? 0,
      boundsRadius: options?.boundsRadius ?? 0,
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: rootGroup,
    });

    return { entityId, rootGroup };
  }
}
