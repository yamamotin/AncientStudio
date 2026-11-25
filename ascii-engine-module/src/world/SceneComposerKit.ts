import * as THREE from 'three';
import type { SceneDepthLayerName } from '../ecs/World';
import type { ThemePalette } from '../types';

/**
 * SceneComposerKit: Reusable procedural 3D ASCII scene composition toolkit.
 *
 * Provides modular, palette-reactive building blocks specifically engineered to produce
 * razor-sharp ASCII structural silhouettes (`/ \ | _ [ ]`) and high-contrast volumetric
 * depth even at compact ASCII grid resolutions:
 *  - `SceneDepthRig`: Organizes Three.js groups by depth plane (`foreground`, `midground`, `background`, `sky`)
 *  - `NeonMaterialBank`: Centralized palette-reactive material cache (zero duplicate shaders, 1-call preset update)
 *  - `composeUrbanBuilding`: Stepped structural volumes, illuminated floor/window matrices, storefront awnings & rooftop spires
 *  - `composeNeonSignPanel`: Cantilevered vertical/horizontal street signs with pseudo-glyph divider bars
 *  - `composeStreetLampPole`: Utility/streetlamp poles with transformer cross-arms & overhanging luminaire heads
 *  - `composeCatenaryCableSpan`: Sagging overhead street cables with midpoint cyber-lanterns
 *  - `composeStreetKioskProp`: Illuminated cyberpunk vending kiosks, arcade terminals & steam-grate bollards
 */

export type NeonTone = 'cyan' | 'magenta' | 'amber';

export interface NeonMaterialBank {
  cyan: THREE.MeshStandardMaterial;
  magenta: THREE.MeshStandardMaterial;
  amber: THREE.MeshStandardMaterial;
  hullDark: THREE.MeshStandardMaterial;
  hullMid: THREE.MeshStandardMaterial;
  poleMetal: THREE.MeshStandardMaterial;
  cableMetal: THREE.MeshStandardMaterial;
  updatePalette: (palette: ThemePalette) => void;
}

export class SceneDepthRig {
  public readonly foreground = new THREE.Group();
  public readonly midground = new THREE.Group();
  public readonly background = new THREE.Group();
  public readonly sky = new THREE.Group();

  constructor(scene: THREE.Scene) {
    this.foreground.name = 'DepthLayer_Foreground';
    this.midground.name = 'DepthLayer_Midground';
    this.background.name = 'DepthLayer_Background';
    this.sky.name = 'DepthLayer_Sky';

    scene.add(this.sky);
    scene.add(this.background);
    scene.add(this.midground);
    scene.add(this.foreground);
  }

  public getGroup(layer: SceneDepthLayerName): THREE.Group {
    switch (layer) {
      case 'foreground':
        return this.foreground;
      case 'midground':
        return this.midground;
      case 'background':
        return this.background;
      case 'sky':
        return this.sky;
    }
  }

  /**
   * Classifies a world Z coordinate into a semantic perspective depth plane
   * (assuming camera sits around `z ≈ +13` looking toward `-Z`).
   */
  public static classifyZ(z: number): SceneDepthLayerName {
    if (z >= 2.2) return 'foreground';
    if (z >= -9.5) return 'midground';
    if (z >= -24.0) return 'background';
    return 'sky';
  }
}

export class SceneComposerKit {
  /**
   * Creates a shared bank of palette-reactive PBR/emissive materials calibrated for ASCII contrast.
   */
  public static createMaterialBank(palette: ThemePalette): NeonMaterialBank {
    const cyan = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.coolAmbient),
      emissive: new THREE.Color(palette.coolAmbient),
      emissiveIntensity: 2.7,
      roughness: 0.14,
      flatShading: true,
    });

    const magenta = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.warmLight),
      emissive: new THREE.Color(palette.warmLight),
      emissiveIntensity: 2.7,
      roughness: 0.14,
      flatShading: true,
    });

    const amber = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.warmCore),
      emissive: new THREE.Color(palette.warmCore),
      emissiveIntensity: 2.6,
      roughness: 0.16,
      flatShading: true,
    });

    const hullDark = new THREE.MeshStandardMaterial({
      color: 0x101929,
      roughness: 0.5,
      metalness: 0.72,
      flatShading: true,
    });

    const hullMid = new THREE.MeshStandardMaterial({
      color: 0x19273d,
      roughness: 0.54,
      metalness: 0.64,
      flatShading: true,
    });

    const poleMetal = new THREE.MeshStandardMaterial({
      color: 0x182538,
      roughness: 0.48,
      metalness: 0.78,
      flatShading: true,
    });

    const cableMetal = new THREE.MeshStandardMaterial({
      color: 0x263b59,
      emissive: new THREE.Color(palette.coolAmbient).multiplyScalar(0.22),
      roughness: 0.5,
      flatShading: true,
    });

    return {
      cyan,
      magenta,
      amber,
      hullDark,
      hullMid,
      poleMetal,
      cableMetal,
      updatePalette(next: ThemePalette) {
        cyan.color.set(next.coolAmbient);
        cyan.emissive.set(next.coolAmbient);
        magenta.color.set(next.warmLight);
        magenta.emissive.set(next.warmLight);
        amber.color.set(next.warmCore);
        amber.emissive.set(next.warmCore);
        cableMetal.emissive.set(next.coolAmbient).multiplyScalar(0.22);
      },
    };
  }

  public static resolveToneMaterial(
    bank: NeonMaterialBank,
    tone: NeonTone
  ): THREE.MeshStandardMaterial {
    return tone === 'cyan' ? bank.cyan : tone === 'magenta' ? bank.magenta : bank.amber;
  }

  public static resolveSecondaryTone(tone: NeonTone): NeonTone {
    return tone === 'cyan' ? 'magenta' : tone === 'magenta' ? 'amber' : 'cyan';
  }

  /**
   * Composes a multi-story urban building block with varied upper setbacks, glowing neon cornices,
   * vertical edge light-pipes, multi-facade lit window grids, optional ground-floor storefront,
   * cantilevered neon signboards, and rooftop communication spires.
   */
  public static composeUrbanBuilding(
    spec: {
      seedIndex: number;
      x: number;
      baseY: number;
      z: number;
      width: number;
      depth: number;
      height: number;
      neonTone: NeonTone;
      floors?: number;
      setbackRatio?: number;
      hasStorefront?: boolean;
      hasBillboard?: boolean;
      hasAntenna?: boolean;
    },
    bank: NeonMaterialBank
  ): THREE.Group {
    const bGroup = new THREE.Group();
    bGroup.name = `UrbanBlock_${spec.seedIndex}`;
    bGroup.position.set(spec.x, spec.baseY, spec.z);

    const accentMat = this.resolveToneMaterial(bank, spec.neonTone);
    const secondaryTone = this.resolveSecondaryTone(spec.neonTone);
    const secondaryMat = this.resolveToneMaterial(bank, secondaryTone);
    const faceSignX = spec.x < 0 ? 1 : spec.x > 0 ? -1 : 1;

    // 1. Main Structural Shaft
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(spec.width, spec.height, spec.depth),
      spec.seedIndex % 2 === 0 ? bank.hullDark : bank.hullMid
    );
    body.position.y = spec.height * 0.5;
    body.castShadow = true;
    body.receiveShadow = true;
    bGroup.add(body);

    // 2. Stepped Upper Penthouse Setback
    const setback = spec.setbackRatio ?? 0.72;
    const crownH = spec.height * 0.24;
    const crown = new THREE.Mesh(
      new THREE.BoxGeometry(spec.width * setback, crownH, spec.depth * setback),
      bank.hullDark
    );
    crown.position.y = spec.height + crownH * 0.5;
    bGroup.add(crown);

    // Rooftop glowing neon cornices ('_' horizontal silhouette lines)
    const roofTrim = new THREE.Mesh(
      new THREE.BoxGeometry(spec.width * 1.04, 0.2, spec.depth * 1.04),
      accentMat
    );
    roofTrim.position.y = spec.height + 0.06;
    bGroup.add(roofTrim);

    const crownTrim = new THREE.Mesh(
      new THREE.BoxGeometry(
        spec.width * setback * 1.04,
        0.15,
        spec.depth * setback * 1.04
      ),
      secondaryMat
    );
    crownTrim.position.y = spec.height + crownH + 0.04;
    bGroup.add(crownTrim);

    // 3. Vertical Corner Neon Light-Pipes ('|' vertical silhouette magnets)
    for (const zCorner of [-1, 1]) {
      const edgePipe = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, spec.height * 0.92, 0.14),
        zCorner > 0 ? accentMat : secondaryMat
      );
      edgePipe.position.set(
        faceSignX * (spec.width * 0.5 + 0.04),
        spec.height * 0.48,
        zCorner * (spec.depth * 0.5 + 0.04)
      );
      bGroup.add(edgePipe);
    }

    // 4. Illuminated Multi-Floor Window Matrix (front + street-facing facades)
    const floors = spec.floors ?? Math.max(4, Math.floor(spec.height / 1.8));
    const cols = 3;
    for (let f = 1; f <= floors; f++) {
      const fy = 1.4 + ((f - 0.5) / floors) * (spec.height - 1.9);
      if (fy >= spec.height - 0.35) continue;

      for (let c = 0; c < cols; c++) {
        const hash = Math.sin((spec.seedIndex + 1) * 37.7 + f * 13.3 + c * 7.1) * 43758.5453;
        const litRoll = hash - Math.floor(hash);
        if (litRoll < 0.3) continue;

        const winMat =
          litRoll > 0.82 ? secondaryMat : litRoll > 0.54 ? bank.amber : accentMat;

        const colOffset = (c - (cols - 1) * 0.5) * (spec.width * 0.27);
        const frontWin = new THREE.Mesh(
          new THREE.BoxGeometry(spec.width * 0.2, 0.25, 0.08),
          winMat
        );
        frontWin.position.set(colOffset, fy, spec.depth * 0.5 + 0.05);
        bGroup.add(frontWin);

        const sideOffset = (c - (cols - 1) * 0.5) * (spec.depth * 0.27);
        const sideWin = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.25, spec.depth * 0.2),
          winMat
        );
        sideWin.position.set(faceSignX * (spec.width * 0.5 + 0.05), fy, sideOffset);
        bGroup.add(sideWin);
      }
    }

    // 5. Ground-Floor Storefront Canopy & Illuminated Arcade Glass
    if (spec.hasStorefront) {
      const awning = new THREE.Mesh(
        new THREE.BoxGeometry(0.88, 0.16, spec.depth * 0.86),
        secondaryMat
      );
      awning.position.set(faceSignX * (spec.width * 0.5 + 0.44), 1.38, 0);
      bGroup.add(awning);

      const shopWindow = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.94, spec.depth * 0.74),
        bank.amber
      );
      shopWindow.position.set(faceSignX * (spec.width * 0.5 + 0.06), 0.7, 0);
      bGroup.add(shopWindow);
    }

    // 6. Cantilevered Street Signboards
    if (spec.hasBillboard) {
      const signRig = this.composeNeonSignPanel(
        {
          height: 3.3,
          depthSpan: 1.02,
          inwardSign: faceSignX,
          primaryTone: secondaryTone,
          secondaryTone: 'amber',
        },
        bank
      );
      signRig.position.set(
        faceSignX * (spec.width * 0.5),
        spec.height * 0.52,
        0.42
      );
      bGroup.add(signRig);
    }

    // 7. Rooftop Spire & Aircraft Warning Beacon
    if (spec.hasAntenna) {
      const spireH = 2.8 + (spec.seedIndex % 3) * 1.1;
      const spire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.11, spireH, 4),
        bank.hullMid
      );
      spire.position.y = spec.height + crownH + spireH * 0.5;
      bGroup.add(spire);

      const tip = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), bank.magenta);
      tip.position.y = spec.height + crownH + spireH + 0.12;
      bGroup.add(tip);
    }

    return bGroup;
  }

  /**
   * Composes a cantilevered vertical + horizontal cyberpunk neon sign assembly with divider bars
   * that read as stylized street-sign lettering across both dense and compact ASCII grids.
   */
  public static composeNeonSignPanel(
    spec: {
      height: number;
      depthSpan: number;
      inwardSign: number;
      primaryTone: NeonTone;
      secondaryTone: NeonTone;
    },
    bank: NeonMaterialBank
  ): THREE.Group {
    const group = new THREE.Group();
    const pMat = this.resolveToneMaterial(bank, spec.primaryTone);
    const sMat = this.resolveToneMaterial(bank, spec.secondaryTone);

    const upperBracket = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.1, 0.12), bank.hullMid);
    upperBracket.position.set(spec.inwardSign * 0.38, spec.height * 0.32, 0);
    group.add(upperBracket);

    const lowerBracket = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.1, 0.12), bank.hullMid);
    lowerBracket.position.set(spec.inwardSign * 0.38, -spec.height * 0.28, 0);
    group.add(lowerBracket);

    // Vertical neon blade sign
    const vSign = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, spec.height, spec.depthSpan),
      pMat
    );
    vSign.position.set(spec.inwardSign * 0.7, 0, 0);
    group.add(vSign);

    // Dark horizontal glyph-divider slats so the sign reads as segmented neon typography rather than a flat blob
    for (let i = -1; i <= 1; i++) {
      const divider = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.11, spec.depthSpan * 1.04),
        bank.hullDark
      );
      divider.position.set(spec.inwardSign * 0.7, i * (spec.height * 0.26), 0);
      group.add(divider);
    }

    // Secondary horizontal sign plaque jutting toward the camera
    const hPlaque = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.68, 0.16), sMat);
    hPlaque.position.set(spec.inwardSign * 0.54, -spec.height * 0.58, spec.depthSpan * 0.65);
    group.add(hPlaque);

    return group;
  }

  /**
   * Composes a cyberpunk utility/streetlamp pole with transformer box, crossbars & overhanging luminaire.
   */
  public static composeStreetLampPole(
    spec: {
      x: number;
      baseY: number;
      z: number;
      height: number;
      side: -1 | 1;
      tone: NeonTone;
    },
    bank: NeonMaterialBank
  ): THREE.Group {
    const group = new THREE.Group();
    group.name = 'StreetLampPole';
    group.position.set(spec.x, spec.baseY, spec.z);

    const lampNeon = this.resolveToneMaterial(bank, spec.tone);
    const inward = spec.side < 0 ? 1 : -1;

    const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.32, 0.34), bank.hullDark);
    plinth.position.y = 0.16;
    group.add(plinth);

    const mast = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, spec.height, 0.16),
      bank.poleMetal
    );
    mast.position.y = spec.height * 0.5;
    mast.castShadow = true;
    group.add(mast);

    // Mid-mast utility transformer box
    const transformer = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.44, 0.28),
      bank.hullMid
    );
    transformer.position.set(-inward * 0.12, spec.height * 0.62, 0);
    group.add(transformer);

    const crossArm = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.11, 0.12), bank.poleMetal);
    crossArm.position.set(inward * 0.58, spec.height - 0.18, 0);
    group.add(crossArm);

    const lampHead = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.13, 0.26), lampNeon);
    lampHead.position.set(inward * 1.0, spec.height - 0.28, 0);
    group.add(lampHead);

    return group;
  }

  /**
   * Composes a 3-segment catenary overhead power cable spanning the street with a glowing node lantern.
   */
  public static composeCatenaryCableSpan(
    spanWidth: number,
    tone: NeonTone,
    bank: NeonMaterialBank
  ): THREE.Group {
    const sagGroup = new THREE.Group();
    sagGroup.name = 'CatenaryCableSpan';
    const segLen = spanWidth * 0.36;

    const leftSpan = new THREE.Mesh(
      new THREE.BoxGeometry(segLen, 0.055, 0.055),
      bank.cableMetal
    );
    leftSpan.position.set(-spanWidth * 0.33, -0.24, 0);
    leftSpan.rotation.z = -0.15;
    sagGroup.add(leftSpan);

    const midSpan = new THREE.Mesh(
      new THREE.BoxGeometry(segLen * 0.96, 0.055, 0.055),
      bank.cableMetal
    );
    midSpan.position.set(0, -0.46, 0);
    sagGroup.add(midSpan);

    const rightSpan = new THREE.Mesh(
      new THREE.BoxGeometry(segLen, 0.055, 0.055),
      bank.cableMetal
    );
    rightSpan.position.set(spanWidth * 0.33, -0.24, 0);
    rightSpan.rotation.z = 0.15;
    sagGroup.add(rightSpan);

    const midLantern = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.19, 0),
      this.resolveToneMaterial(bank, tone)
    );
    midLantern.position.set(0, -0.58, 0);
    sagGroup.add(midLantern);

    return sagGroup;
  }

  /**
   * Composes a sidewalk cyberpunk vending machine / data-kiosk prop adding rich midground street clutter.
   */
  public static composeStreetKioskProp(
    spec: {
      x: number;
      baseY: number;
      z: number;
      facingX: number;
      tone: NeonTone;
    },
    bank: NeonMaterialBank
  ): THREE.Group {
    const kiosk = new THREE.Group();
    kiosk.name = 'StreetVendingKiosk';
    kiosk.position.set(spec.x, spec.baseY, spec.z);

    const neonMat = this.resolveToneMaterial(bank, spec.tone);
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.58, 0.86), bank.hullDark);
    chassis.position.y = 0.79;
    chassis.castShadow = true;
    chassis.receiveShadow = true;
    kiosk.add(chassis);

    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.88, 0.66), neonMat);
    screen.position.set(spec.facingX * 0.31, 0.96, 0);
    kiosk.add(screen);

    const dispenserSlot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.18, 0.52), bank.amber);
    dispenserSlot.position.set(spec.facingX * 0.31, 0.32, 0);
    kiosk.add(dispenserSlot);

    return kiosk;
  }
}
