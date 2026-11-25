import * as THREE from 'three';
import type { EntityId, World } from '../ecs/World';

export interface TuxSpawnOptions {
  position?: [number, number, number];
  scale?: number;
  /** Optional smooth circular plinth (disabled on the minimalist Neofetch mascot stage) */
  includeShowcaseRig?: boolean;
  /** Optional vertical idle bob amplitude override (smaller keeps feet grounded on floor) */
  bobAmplitude?: number;
  /** Allow future keyboard movement if spawned inside playground */
  moveSpeed?: number;
  boundsRadius?: number;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Builds a single continuous, C-infinity smooth pear-shaped penguin torso (`64x48` segments)
 * with anti-aliased vertex-color plumage (snow-white oval chest/belly smoothly feathered into
 * deep charcoal-obsidian coat). Using one unified smooth surface eliminates intersecting-sphere
 * creases, polygon Z-fighting cutouts, and normal discontinuities across all 360 degrees of spin.
 */
function createUnifiedTuxTorsoGeometry(
  coatColor: THREE.Color,
  bellyColor: THREE.Color
): THREE.BufferGeometry {
  const radius = 0.76;
  const geo = new THREE.SphereGeometry(radius, 64, 48);
  const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
  const count = posAttr.count;
  const colors = new Float32Array(count * 3);
  const mixed = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);

    const ny = y / radius;
    const pearWidth = 1.0 - 0.19 * ny;
    const pearDepth = 1.0 - 0.13 * ny;

    const px = x * 0.92 * pearWidth;
    const py = y * 1.18;
    const pz = z * 0.82 * pearDepth;
    posAttr.setXYZ(i, px, py, pz);

    const bibU = px / 0.46;
    const bibV = (py + 0.05) / 0.65;
    const bibDist = Math.hypot(bibU, bibV);
    const frontGate = smoothstep(0.08, 0.28, pz / 0.62);
    const bellyWeight = (1.0 - smoothstep(0.86, 1.02, bibDist)) * frontGate;

    mixed.lerpColors(coatColor, bellyColor, bellyWeight);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }

  posAttr.needsUpdate = true;
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

/**
 * TuxEntityFactory: Builds an articulated, pure-ASCII-calibrated 3D Linux Tux penguin entity:
 * - Single unified smooth pear-shaped body with vertex-colored snow-white belly & charcoal coat
 * - Sleek smooth head with crisp non-overlapping sclera/pupil eyes and sculpted two-part amber beak
 * - Smooth rounded flipper wings, webbed feet, and stubby tail (`flatShading: false`, no self-shadow blotches)
 * - Articulated wing, head, and foot pivots driven by `AnimationSystem`
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

    const coatColor = new THREE.Color(0x080d14);
    const bellyColor = new THREE.Color(0xf4faff);

    const obsidianCoat = new THREE.MeshStandardMaterial({
      color: coatColor,
      roughness: 0.64,
      metalness: 0.04,
      flatShading: false,
    });

    const torsoPlumage = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      vertexColors: true,
      roughness: 0.64,
      metalness: 0.0,
      flatShading: false,
    });

    const amberBeakFeet = new THREE.MeshStandardMaterial({
      color: 0xff9f1c,
      emissive: 0x3b1900,
      emissiveIntensity: 0.34,
      roughness: 0.52,
      metalness: 0.0,
      flatShading: false,
    });

    const eyeSclera = new THREE.MeshBasicMaterial({ color: 0xf6fbff });
    const eyePupil = new THREE.MeshBasicMaterial({ color: 0x05080c });

    // 1. Unified Smooth Pear-Shaped Torso + Snow-White Belly Plumage (zero intersecting meshes or self-shadows)
    const torso = new THREE.Mesh(
      createUnifiedTuxTorsoGeometry(coatColor, bellyColor),
      torsoPlumage
    );
    torso.name = 'TuxTorso';
    torso.position.set(0, 0.86, 0);
    torso.castShadow = true;
    torso.receiveShadow = false;
    torso.userData.coatColor = coatColor.clone();
    torso.userData.bellyColor = bellyColor.clone();
    rootGroup.add(torso);

    // 2. Articulated Smooth Head Pivot
    const headPivot = new THREE.Group();
    headPivot.name = 'TuxHeadPivot';
    headPivot.position.set(0, 1.72, 0.03);

    const skull = new THREE.Mesh(new THREE.SphereGeometry(0.48, 48, 36), obsidianCoat);
    skull.name = 'TuxHead';
    skull.scale.set(0.98, 0.95, 0.90);
    skull.castShadow = true;
    skull.receiveShadow = false;
    headPivot.add(skull);

    // Expressive non-overlapping oval eyes cleanly proud of skull front
    for (const side of [-1, 1]) {
      const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.132, 24, 18), eyeSclera);
      sclera.position.set(side * 0.162, 0.095, 0.405);
      sclera.scale.set(0.96, 1.16, 0.58);
      headPivot.add(sclera);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.048, 18, 14), eyePupil);
      pupil.position.set(side * 0.152, 0.095, 0.472);
      pupil.scale.set(0.92, 0.96, 0.55);
      headPivot.add(pupil);
    }

    // Smooth rounded two-part golden-amber duck-bill beak (zero hard cone facets)
    const upperBeak = new THREE.Mesh(new THREE.SphereGeometry(0.21, 32, 24), amberBeakFeet);
    upperBeak.name = 'TuxUpperBeak';
    upperBeak.scale.set(1.16, 0.42, 1.24);
    upperBeak.position.set(0, -0.055, 0.43);
    upperBeak.rotation.x = 0.08;
    upperBeak.castShadow = true;
    upperBeak.receiveShadow = false;
    headPivot.add(upperBeak);

    const lowerBeak = new THREE.Mesh(new THREE.SphereGeometry(0.17, 28, 20), amberBeakFeet);
    lowerBeak.name = 'TuxLowerBeak';
    lowerBeak.scale.set(1.02, 0.30, 1.02);
    lowerBeak.position.set(0, -0.115, 0.40);
    lowerBeak.rotation.x = 0.16;
    lowerBeak.castShadow = true;
    lowerBeak.receiveShadow = false;
    headPivot.add(lowerBeak);

    rootGroup.add(headPivot);

    // 3. Articulated Smooth Rounded Flipper Wings
    const leftWingPivot = new THREE.Group();
    leftWingPivot.position.set(-0.65, 1.32, 0.02);
    leftWingPivot.rotation.z = 0.28;
    const leftWingMesh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 24), obsidianCoat);
    leftWingMesh.position.set(-0.06, -0.38, 0);
    leftWingMesh.scale.set(0.42, 2.05, 0.96);
    leftWingMesh.castShadow = true;
    leftWingMesh.receiveShadow = false;
    leftWingPivot.add(leftWingMesh);
    rootGroup.add(leftWingPivot);

    const rightWingPivot = new THREE.Group();
    rightWingPivot.position.set(0.65, 1.32, 0.02);
    rightWingPivot.rotation.z = -0.28;
    const rightWingMesh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 24), obsidianCoat);
    rightWingMesh.position.set(0.06, -0.38, 0);
    rightWingMesh.scale.set(0.42, 2.05, 0.96);
    rightWingMesh.castShadow = true;
    rightWingMesh.receiveShadow = false;
    rightWingPivot.add(rightWingMesh);
    rootGroup.add(rightWingPivot);

    // 4. Seated Smooth Webbed Feet
    const leftFootPivot = new THREE.Group();
    leftFootPivot.position.set(-0.34, 0.08, 0.34);
    leftFootPivot.rotation.y = 0.26;
    const leftFootMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 28, 20), amberBeakFeet);
    leftFootMesh.scale.set(0.84, 0.30, 1.18);
    leftFootMesh.position.set(0, 0.01, 0.12);
    leftFootMesh.castShadow = true;
    leftFootMesh.receiveShadow = false;
    leftFootPivot.add(leftFootMesh);
    rootGroup.add(leftFootPivot);

    const rightFootPivot = new THREE.Group();
    rightFootPivot.position.set(0.34, 0.08, 0.34);
    rightFootPivot.rotation.y = -0.26;
    const rightFootMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 28, 20), amberBeakFeet);
    rightFootMesh.scale.set(0.84, 0.30, 1.18);
    rightFootMesh.position.set(0, 0.01, 0.12);
    rightFootMesh.castShadow = true;
    rightFootMesh.receiveShadow = false;
    rightFootPivot.add(rightFootMesh);
    rootGroup.add(rightFootPivot);

    // 5. Smooth Rounded Stubby Tail
    const tail = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 18), obsidianCoat);
    tail.position.set(0, 0.22, -0.60);
    tail.scale.set(0.85, 0.72, 1.35);
    tail.rotation.x = -0.24;
    tail.castShadow = true;
    tail.receiveShadow = false;
    rootGroup.add(tail);

    // Optional smooth circular plinth (excluded by default on the minimalist Neofetch mascot stage)
    if (options?.includeShowcaseRig) {
      const plinthMat = new THREE.MeshStandardMaterial({
        color: 0x1b3344,
        roughness: 0.82,
        metalness: 0.08,
        flatShading: false,
      });
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 1.08, 0.16, 32), plinthMat);
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
