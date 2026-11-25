/**
 * MapLoader: Declarative map schema & registry for rich 3D Cyberpunk Street & Skyline scenes.
 * Default map `'cyberpunk-citadel'` defines a layered nocturnal cyberpunk boulevard in 3 depth planes:
 *  - Foreground (`z: +2 .. +9`): Streetlamps, utility poles with overhead cables, neon bollards,
 *    wind-swaying hanging street signs, crosswalk, and high-contrast central Netrunner protagonist
 *  - Midground (`z: -8 .. +2`): Multi-story brutalist/cyber buildings with lit window grids, storefront
 *    awnings, vertical/cantilevered neon signboards, elevated transit overpass, and holo-reactor portal
 *  - Background (`z: -24 .. -10`): Towering arcology megastructures in perspective convergence, rooftop
 *    antennas, sky-beams, and synth horizon ring.
 */

export type MapThemeStyle = 'cyberpunk' | 'sanctuary';

export interface BuildingSpawnDef {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  neonTone: 'cyan' | 'magenta' | 'amber';
  floors?: number;
  hasAntenna?: boolean;
  hasBillboard?: boolean;
  hasStorefront?: boolean;
  setbackRatio?: number;
}

export interface StreetPoleSpawnDef {
  x: number;
  z: number;
  height: number;
  side: -1 | 1;
  tone: 'cyan' | 'magenta' | 'amber';
  hasHangingBanner?: boolean;
}

export interface TreeSpawnDef {
  x: number;
  z: number;
  scale: number;
}

export interface BoulderSpawnDef {
  x: number;
  z: number;
  scale: number;
}

export interface BrazierSpawnDef {
  x: number;
  z: number;
  tone?: 'cyan' | 'magenta' | 'amber';
}

export interface DroneSpawnDef {
  origin: [number, number, number];
  amplitude: [number, number, number];
  speed: number;
  phase: number;
  tone: 'cyan' | 'magenta' | 'amber';
}

export interface PlaygroundMapDefinition {
  id: string;
  title: string;
  themeStyle: MapThemeStyle;
  terrainSize: number;
  terrainSegments: number;
  waterSize: number;
  waterLevel: number;
  fogDensity: number;
  cameraAnchor: [number, number, number];
  cameraLookAt: [number, number, number];
  shrineCenter: [number, number];
  avatarSpawn: [number, number];
  causewayStones: number;
  buildings: BuildingSpawnDef[];
  streetPoles: StreetPoleSpawnDef[];
  drones: DroneSpawnDef[];
  trees: TreeSpawnDef[];
  boulders: BoulderSpawnDef[];
  braziers: BrazierSpawnDef[];
}

const CYBERPUNK_CITADEL_MAP: PlaygroundMapDefinition = {
  id: 'cyberpunk-citadel',
  title: 'Neo-District 09 // Rain-Slicked Cyberpunk Avenue',
  themeStyle: 'cyberpunk',
  terrainSize: 60,
  terrainSegments: 64,
  waterSize: 68,
  waterLevel: -0.06,
  fogDensity: 0.021,
  // Street-level perspective camera framing foreground streetlamps, central protagonist, and towering avenue canyon!
  cameraAnchor: [0.0, 3.35, 13.4],
  cameraLookAt: [0.0, 2.55, -5.5],
  shrineCenter: [0, -4.6],
  avatarSpawn: [0.0, 4.15],
  causewayStones: 8,
  buildings: [
    // === FOREGROUND CANYON FRAMING BUILDINGS (z: +3.5 .. +7.2) ===
    {
      x: -7.1,
      z: 5.4,
      width: 3.1,
      depth: 3.2,
      height: 8.6,
      floors: 5,
      neonTone: 'cyan',
      hasBillboard: true,
      hasStorefront: true,
      setbackRatio: 0.78,
    },
    {
      x: 7.2,
      z: 5.2,
      width: 3.2,
      depth: 3.2,
      height: 9.2,
      floors: 6,
      neonTone: 'magenta',
      hasBillboard: true,
      hasStorefront: true,
      setbackRatio: 0.75,
    },

    // === MIDGROUND URBAN STREET WALLS & CANTILEVERED NEON SIGNAGE (z: -6.5 .. +1.2) ===
    {
      x: -6.6,
      z: 0.8,
      width: 3.0,
      depth: 3.4,
      height: 11.4,
      floors: 7,
      neonTone: 'amber',
      hasBillboard: true,
      hasStorefront: true,
      hasAntenna: true,
      setbackRatio: 0.72,
    },
    {
      x: 6.7,
      z: 0.6,
      width: 3.1,
      depth: 3.4,
      height: 12.2,
      floors: 8,
      neonTone: 'cyan',
      hasBillboard: true,
      hasStorefront: true,
      hasAntenna: true,
      setbackRatio: 0.7,
    },
    {
      x: -6.4,
      z: -4.2,
      width: 3.2,
      depth: 3.4,
      height: 14.5,
      floors: 9,
      neonTone: 'magenta',
      hasBillboard: true,
      hasStorefront: true,
      hasAntenna: true,
      setbackRatio: 0.68,
    },
    {
      x: 6.5,
      z: -4.4,
      width: 3.2,
      depth: 3.4,
      height: 15.2,
      floors: 10,
      neonTone: 'amber',
      hasBillboard: true,
      hasStorefront: true,
      hasAntenna: true,
      setbackRatio: 0.68,
    },
    // Secondary outer-tier mid-rise blocks adding lateral skyline density
    {
      x: -11.2,
      z: -1.8,
      width: 3.8,
      depth: 4.0,
      height: 13.6,
      floors: 8,
      neonTone: 'cyan',
      hasAntenna: true,
    },
    {
      x: 11.4,
      z: -2.0,
      width: 3.8,
      depth: 4.0,
      height: 14.0,
      floors: 9,
      neonTone: 'magenta',
      hasAntenna: true,
    },

    // === DEEP PERSPECTIVE SKYLINE ARCOLOGIES (z: -11 .. -21) ===
    {
      x: -14.2,
      z: -12.5,
      width: 4.4,
      depth: 4.2,
      height: 19.5,
      floors: 12,
      neonTone: 'cyan',
      hasAntenna: true,
      setbackRatio: 0.65,
    },
    {
      x: -7.2,
      z: -13.8,
      width: 4.2,
      depth: 4.0,
      height: 23.5,
      floors: 14,
      neonTone: 'magenta',
      hasAntenna: true,
      hasBillboard: true,
      setbackRatio: 0.66,
    },
    {
      x: -2.6,
      z: -18.2,
      width: 4.0,
      depth: 4.0,
      height: 27.5,
      floors: 16,
      neonTone: 'cyan',
      hasAntenna: true,
      setbackRatio: 0.62,
    },
    {
      x: 2.8,
      z: -18.6,
      width: 4.2,
      depth: 4.0,
      height: 29.0,
      floors: 17,
      neonTone: 'amber',
      hasAntenna: true,
      setbackRatio: 0.6,
    },
    {
      x: 7.5,
      z: -14.0,
      width: 4.2,
      depth: 4.0,
      height: 22.8,
      floors: 14,
      neonTone: 'cyan',
      hasAntenna: true,
      hasBillboard: true,
      setbackRatio: 0.66,
    },
    {
      x: 14.4,
      z: -12.2,
      width: 4.4,
      depth: 4.2,
      height: 18.8,
      floors: 11,
      neonTone: 'magenta',
      hasAntenna: true,
      setbackRatio: 0.68,
    },
  ],
  streetPoles: [
    { x: -4.35, z: 6.4, height: 4.3, side: -1, tone: 'cyan', hasHangingBanner: true },
    { x: 4.35, z: 6.4, height: 4.3, side: 1, tone: 'magenta', hasHangingBanner: true },
    { x: -4.35, z: 1.9, height: 4.5, side: -1, tone: 'amber', hasHangingBanner: true },
    { x: 4.35, z: 1.9, height: 4.5, side: 1, tone: 'cyan', hasHangingBanner: true },
    { x: -4.35, z: -2.6, height: 4.6, side: -1, tone: 'magenta', hasHangingBanner: true },
    { x: 4.35, z: -2.6, height: 4.6, side: 1, tone: 'amber', hasHangingBanner: true },
  ],
  drones: [
    { origin: [0, 5.4, -1.2], amplitude: [6.4, 0.42, 3.6], speed: 0.68, phase: 0.0, tone: 'cyan' },
    { origin: [0, 7.2, -7.4], amplitude: [9.6, 0.52, 2.8], speed: -0.52, phase: 2.1, tone: 'magenta' },
    { origin: [0, 9.4, -12.5], amplitude: [11.5, 0.48, 2.2], speed: 0.44, phase: 4.2, tone: 'amber' },
  ],
  // Preserved backward-compatible arrays
  trees: [
    { x: -4.6, z: 3.6, scale: 1.0 },
    { x: 4.6, z: 3.6, scale: 1.0 },
    { x: -4.6, z: -0.8, scale: 1.1 },
    { x: 4.6, z: -0.8, scale: 1.1 },
  ],
  boulders: [
    { x: -3.9, z: 5.1, scale: 0.65 },
    { x: 3.9, z: 5.1, scale: 0.65 },
  ],
  braziers: [
    { x: -3.65, z: 3.2, tone: 'cyan' },
    { x: 3.65, z: 3.2, tone: 'magenta' },
  ],
};

const BUILTIN_MAPS: Record<string, PlaygroundMapDefinition> = {
  'cyberpunk-citadel': CYBERPUNK_CITADEL_MAP,
  'sanctuary-isle': {
    ...CYBERPUNK_CITADEL_MAP,
    id: 'sanctuary-isle',
  },
};

export class MapLoader {
  public static load(mapId?: string): PlaygroundMapDefinition {
    if (mapId && BUILTIN_MAPS[mapId]) {
      return BUILTIN_MAPS[mapId]!;
    }
    return CYBERPUNK_CITADEL_MAP;
  }

  public static listMapIds(): string[] {
    return Object.keys(BUILTIN_MAPS);
  }
}
