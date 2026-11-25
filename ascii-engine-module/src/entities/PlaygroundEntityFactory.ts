import * as THREE from 'three';
import type { EntityId, World } from '../ecs/World';
import type { ThemePalette } from '../types';

/**
 * PlaygroundEntityFactory: Spawns interactive Cyberpunk ECS entities inside `[ ASCII REALMS // SCENE ]`:
 * - Levitating Holographic Quantum Reactor Core + Twin Gyro-Rings + Neon PointLight (`spawnShrineCrystal`)
 * - Pulsing Cyber-Neon Street Bollards / Pylons (`spawnBrazierBeacon`)
 * - Wind-Swaying Suspended Neon Street Signs / Lantern Banners (`spawnHangingNeonBanner`)
 * - Autonomous Aerial Patrol Spinners (`spawnCyberDrone`)
 * - High-Contrast Central Cyber-Netrunner Protagonist with backlit halo rim, wind-swept coat tails,
 *   luminous collar, glowing visor, and cyber-katana (`spawnWayfarerAvatar`)
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

    // Octahedral plasma data-core
    const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(1.05, 0), coreMat);
    crystal.scale.set(0.92, 1.72, 0.92);
    group.add(crystal);

    // Dual counter-tilted cybernetic gyro-rings
    const orbitRing = new THREE.Group();
    const ringTorus = new THREE.Mesh(new THREE.TorusGeometry(1.74, 0.085, 6, 24), cyanRingMat);
    ringTorus.rotation.x = Math.PI * 0.36;
    orbitRing.add(ringTorus);

    const innerFrame = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.06, 5, 16), amberFrameMat);
    innerFrame.rotation.y = Math.PI * 0.28;
    orbitRing.add(innerFrame);
    group.add(orbitRing);

    group.position.set(position[0], position[1], position[2]);
    scene.add(group);

    const torchLight = new THREE.PointLight(new THREE.Color(palette.warmLight), 52.0, 40.0, 1.45);
    torchLight.position.set(position[0], position[1] + 0.35, position[2] + 0.5);
    torchLight.castShadow = enableShadows;
    if (enableShadows) {
      torchLight.shadow.mapSize.width = 512;
      torchLight.shadow.mapSize.height = 512;
      torchLight.shadow.camera.near = 0.5;
      torchLight.shadow.camera.far = 36;
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
      bobAmplitude: 0.22,
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
      baseEmissiveIntensity: 2.95,
      pulseSpeed: 3.4,
      pulseAmplitude: 0.18,
      phase: 0.4,
      glitchRate: 0.08,
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: group,
      pointLight: torchLight,
      baseLightIntensity: 52.0,
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
      color: 0x131d2e,
      roughness: 0.5,
      metalness: 0.75,
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

    group.position.set(position[0], position[1], position[2]);
    scene.add(group);

    const light = new THREE.PointLight(new THREE.Color(neonHex), 18.0, 16.0, 1.55);
    light.position.set(position[0], position[1] + 2.15, position[2]);
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
      baseEmissiveIntensity: 2.75,
      pulseSpeed: 4.2,
      pulseAmplitude: 0.2,
      phase: phaseOffset,
      glitchRate: 0.14,
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: group,
      pointLight: light,
      baseLightIntensity: 18.0,
      lightFlickerSpeed: 8.5,
    });

    return { entityId, light };
  }

  /**
   * Spawns a suspended Cyberpunk Street Sign / Lantern Banner pivoted from its top mount,
   * swaying realistically in the nocturnal street wind (`WindSway` + `NeonBeacon`).
   */
  public static spawnHangingNeonBanner(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    spec: {
      pivot: [number, number, number];
      width: number;
      height: number;
      tone: 'cyan' | 'magenta' | 'amber';
      phase: number;
    }
  ): { entityId: EntityId } {
    const group = new THREE.Group();
    group.name = 'HangingNeonBanner';

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x0e1522,
      roughness: 0.55,
      metalness: 0.75,
      flatShading: true,
    });

    const neonHex =
      spec.tone === 'cyan'
        ? palette.coolAmbient
        : spec.tone === 'magenta'
          ? palette.warmLight
          : palette.warmCore;

    const signMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(neonHex),
      emissive: new THREE.Color(neonHex),
      emissiveIntensity: 2.45,
      roughness: 0.18,
      flatShading: true,
    });

    // Hanging cable + sign frame + glowing neon panel + horizontal glyph bars
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, spec.height, spec.width),
      frameMat
    );
    frame.position.y = -spec.height * 0.5;
    group.add(frame);

    const glowFace = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, spec.height * 0.84, spec.width * 0.82),
      signMat
    );
    glowFace.position.y = -spec.height * 0.5;
    group.add(glowFace);

    // Horizontal dark divider bars creating pseudo-glyph street sign bands in ASCII!
    for (let b = 1; b <= 2; b++) {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.17, 0.08, spec.width * 0.86),
        frameMat
      );
      bar.position.y = -spec.height * (0.28 * b + 0.1);
      group.add(bar);
    }

    group.position.set(...spec.pivot);
    scene.add(group);

    const entityId = ecsWorld.createEntity();
    ecsWorld.addComponent(entityId, 'LifecycleTag', {
      role: 'prop',
      label: `WindSign_${spec.tone}`,
    });

    ecsWorld.addComponent(entityId, 'Transform', {
      x: spec.pivot[0],
      y: spec.pivot[1],
      z: spec.pivot[2],
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    });

    ecsWorld.addComponent(entityId, 'WindSway', {
      baseRotX: 0,
      baseRotY: 0,
      baseRotZ: 0,
      swayAmpZ: 0.16,
      swayAmpX: 0.09,
      frequency: 2.35,
      phase: spec.phase,
      gustFactor: 1.0,
    });

    ecsWorld.addComponent(entityId, 'NeonBeacon', {
      emissiveMaterial: signMat,
      baseEmissiveIntensity: 2.45,
      pulseSpeed: 3.6,
      pulseAmplitude: 0.18,
      phase: spec.phase,
      glitchRate: 0.18,
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: group,
    });

    return { entityId };
  }

  /**
   * Spawns an autonomous Cyberpunk Hover-Spinner cruising through the urban street canyon.
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
      roughness: 0.42,
      metalness: 0.82,
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
      emissiveIntensity: 3.0,
      roughness: 0.1,
      flatShading: true,
    });

    const fuselage = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.24, 1.45), hullMat);
    group.add(fuselage);

    const lightStrip = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.1, 1.25), thrusterMat);
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
      baseEmissiveIntensity: 3.0,
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
   * Spawns the focal Central Cyberpunk Netrunner Protagonist in the foreground crosswalk:
   * Engineered for unmistakable silhouette & high contrast against the dark street and neon reflections:
   * - Articulated legs & boots standing on a glowing holo-projection ground ring
   * - Armored cyber-jacket with luminous shoulder trim, spine power-core & high glowing neon collar
   * - Wind-billowing split trench coat tail (`parts.coatTail`)
   * - Helmeted head with vivid wide cyan visor + twin signal antennas
   * - Diagonal high-luminance plasma katana + dedicated character rim-light!
   */
  public static spawnWayfarerAvatar(
    ecsWorld: World,
    scene: THREE.Scene,
    palette: ThemePalette,
    position: [number, number, number]
  ): { entityId: EntityId; group: THREE.Group } {
    const group = new THREE.Group();
    group.name = 'CyberNetrunnerAvatar';

    // Crisp rim-lit dark cyber-armor with subtle cool sheen so the body never vanishes into black asphalt
    const armorMat = new THREE.MeshStandardMaterial({
      color: 0x1b2b42,
      emissive: new THREE.Color(palette.coolAmbient).multiplyScalar(0.18),
      roughness: 0.38,
      metalness: 0.68,
      flatShading: true,
    });

    const coatMat = new THREE.MeshStandardMaterial({
      color: 0x142236,
      emissive: new THREE.Color(palette.warmLight).multiplyScalar(0.14),
      roughness: 0.45,
      metalness: 0.55,
      flatShading: true,
    });

    const magentaNeonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.warmLight),
      emissive: new THREE.Color(palette.warmLight),
      emissiveIntensity: 2.75,
      roughness: 0.15,
      flatShading: true,
    });

    const cyanNeonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.cursorLight),
      emissive: new THREE.Color(palette.cursorLight),
      emissiveIntensity: 3.1,
      roughness: 0.12,
      flatShading: true,
    });

    const amberCoreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.warmCore),
      emissive: new THREE.Color(palette.warmCore),
      emissiveIntensity: 2.9,
      roughness: 0.12,
      flatShading: true,
    });

    // 0. Ground Holo-Target Ring under boots (separates feet cleanly from dark street reflections!)
    const groundHalo = new THREE.Mesh(new THREE.RingGeometry(0.58, 0.72, 20), cyanNeonMat);
    groundHalo.rotation.x = -Math.PI / 2;
    groundHalo.position.y = 0.04;
    group.add(groundHalo);

    // 1. Cybernetic Boots & Stance Legs (wide heroic silhouette)
    const leftFoot = new THREE.Group();
    leftFoot.position.set(-0.22, 0.0, 0.02);
    const lLeg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.78, 0.22), armorMat);
    lLeg.position.y = 0.39;
    lLeg.rotation.z = 0.06;
    lLeg.castShadow = true;
    leftFoot.add(lLeg);
    const lShinTrim = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.48, 0.25), cyanNeonMat);
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
    const rShinTrim = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.48, 0.25), cyanNeonMat);
    rShinTrim.position.set(0, 0.34, 0.02);
    rightFoot.add(rShinTrim);
    group.add(rightFoot);

    // 2. Armored Torso + Luminous Cyber-Spine & Chest Harness (crisp contrast from front AND back!)
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.82, 0.38), armorMat);
    torso.position.y = 1.16;
    torso.castShadow = true;
    group.add(torso);

    // Glowing V-lapel jacket trim + central amber reactor badge
    const chestCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.15, 0), amberCoreMat);
    chestCore.position.set(0, 1.22, 0.21);
    group.add(chestCore);

    const spineStrip = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.68, 0.42), cyanNeonMat);
    spineStrip.position.set(0, 1.18, 0);
    group.add(spineStrip);

    // Broad cyber-pauldrons with magenta neon edge bars (unmistakable '[' and ']' shoulder silhouette!)
    for (const side of [-1, 1]) {
      const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22, 0.42), coatMat);
      pauldron.position.set(side * 0.46, 1.46, 0);
      pauldron.rotation.z = -side * 0.18;
      group.add(pauldron);

      const shoulderTrim = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.07, 0.44), magentaNeonMat);
      shoulderTrim.position.set(side * 0.47, 1.56, 0);
      shoulderTrim.rotation.z = -side * 0.18;
      group.add(shoulderTrim);
    }

    // 3. Wind-Billowing Split Trench Coat Tail (`coatTail` animated by AnimationSystem)
    const coatTail = new THREE.Group();
    coatTail.position.set(0, 0.88, -0.14);
    const leftFlap = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.72, 0.09), coatMat);
    leftFlap.position.set(-0.19, -0.34, -0.04);
    leftFlap.rotation.z = 0.12;
    coatTail.add(leftFlap);

    const rightFlap = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.72, 0.09), coatMat);
    rightFlap.position.set(0.19, -0.34, -0.04);
    rightFlap.rotation.z = -0.12;
    coatTail.add(rightFlap);

    const hemNeon = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.07, 0.11), magentaNeonMat);
    hemNeon.position.set(0, -0.68, -0.04);
    coatTail.add(hemNeon);
    group.add(coatTail);

    // 4. High Iconic Cyberpunk Tech-Collar
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.075, 6, 12), magentaNeonMat);
    collar.rotation.x = Math.PI * 0.45;
    collar.position.y = 1.62;
    group.add(collar);

    // 5. Cybernetic Helmet + Wide Glowing Cyan Visor + Twin Bunny/Signal Ears
    const head = new THREE.Group();
    head.position.set(0, 1.84, 0);
    const helm = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 1), armorMat);
    helm.scale.set(0.98, 1.1, 1.02);
    helm.castShadow = true;
    head.add(helm);

    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.32), cyanNeonMat);
    visor.position.set(0, 0.03, 0.12);
    head.add(visor);

    for (const side of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.32, 0.08), amberCoreMat);
      ear.position.set(side * 0.18, 0.28, -0.04);
      ear.rotation.z = -side * 0.16;
      head.add(ear);
    }
    group.add(head);

    // 6. Left Arm + Right Arm wielding High-Luminance Diagonal Plasma Katana ('/' ASCII silhouette!)
    const leftArm = new THREE.Group();
    leftArm.position.set(-0.46, 1.38, 0.04);
    const lForearm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.62, 0.18), armorMat);
    lForearm.position.y = -0.26;
    lForearm.rotation.z = 0.18;
    leftArm.add(lForearm);
    group.add(leftArm);

    const bladePivot = new THREE.Group();
    bladePivot.position.set(0.48, 1.32, 0.12);
    const rForearm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.56, 0.18), armorMat);
    rForearm.position.y = -0.22;
    rForearm.rotation.z = -0.24;
    bladePivot.add(rForearm);

    const hilt = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.34, 0.12), amberCoreMat);
    hilt.position.set(0.14, -0.34, 0.14);
    hilt.rotation.z = -0.52;
    bladePivot.add(hilt);

    const bladeCore = new THREE.Mesh(new THREE.BoxGeometry(0.075, 1.95, 0.11), cyanNeonMat);
    bladeCore.position.set(0.62, 0.48, 0.16);
    bladeCore.rotation.z = -0.52;
    bladePivot.add(bladeCore);
    group.add(bladePivot);

    // Dedicated character rim-light attached directly to the Netrunner so their silhouette ALWAYS pops!
    const avatarLight = new THREE.PointLight(new THREE.Color(palette.cursorLight), 14.0, 7.5, 1.6);
    avatarLight.position.set(0, 1.75, 0.75);
    group.add(avatarLight);

    group.scale.setScalar(1.12);
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
      rotY: 0.18,
      rotZ: 0,
      scaleX: 1.12,
      scaleY: 1.12,
      scaleZ: 1.12,
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
      targetYaw: 0.18,
      targetPitch: 0,
      targetRoll: 0,
      lerpSpeed: 5.4,
      idleSpinSpeed: 0,
      maxPitch: 0.22,
    });

    ecsWorld.addComponent(entityId, 'AnimationState', {
      baseY: position[1],
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
    });

    ecsWorld.addComponent(entityId, 'InputState', {
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
    });

    ecsWorld.addComponent(entityId, 'Renderable', {
      object3D: group,
    });

    return { entityId, group };
  }
}
