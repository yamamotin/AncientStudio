/**
 * MapLoader: Declarative map schema & registry for lightweight 3D ASCII Realms scenes.
 * Default map `'cyberpunk-citadel'` defines a high-contrast Cyberpunk Neo-Sector with
 * skyscrapers, neon billboards, rain-slicked reflective canal, skybridges, and patrol drones.
 * Retains backward-compatible alias support for `'sanctuary-isle'` so existing callers work seamlessly.
 */

export type MapThemeStyle = 'cyberpunk' | 'sanctuary';

export interface BuildingSpawnDef {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  neonTone: 'cyan' | 'magenta' | 'amber';
  hasAntenna?: boolean;
  hasBillboard?: boolean;
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
  drones: DroneSpawnDef[];
  trees: TreeSpawnDef[];
  boulders: BoulderSpawnDef[];
  braziers: BrazierSpawnDef[];
}

const CYBERPUNK_CITADEL_MAP: PlaygroundMapDefinition = {
  id: 'cyberpunk-citadel',
  title: 'Neo-Kyoto Sector 09 // Cyberpunk Plaza',
  themeStyle: 'cyberpunk',
  terrainSize: 52,
  terrainSegments: 64,
  waterSize: 68,
  waterLevel: -0.72,
  fogDensity: 0.028,
  cameraAnchor: [0.0, 4.85, 13.8],
  cameraLookAt: [0.0, 2.2, -3.2],
  shrineCenter: [0, -2.2],
  avatarSpawn: [-1.1, 2.6],
  causewayStones: 7,
  buildings: [
    // Midground flanking megastructures (strong vertical '|', '[', ']' silhouettes)
    { x: -6.4, z: -3.8, width: 2.6, depth: 2.6, height: 9.2, neonTone: 'cyan', hasAntenna: true, hasBillboard: true },
    { x: 6.5, z: -4.0, width: 2.8, depth: 2.6, height: 10.4, neonTone: 'magenta', hasAntenna: true, hasBillboard: true },
    { x: -9.6, z: -0.5, width: 2.4, depth: 2.8, height: 7.4, neonTone: 'amber', hasBillboard: true },
    { x: 9.8, z: -0.8, width: 2.5, depth: 2.8, height: 7.8, neonTone: 'cyan', hasBillboard: true },
    // Foreground street-canyon framing pylons
    { x: -7.8, z: 4.8, width: 1.9, depth: 1.9, height: 5.2, neonTone: 'magenta' },
    { x: 7.9, z: 4.6, width: 1.9, depth: 1.9, height: 5.5, neonTone: 'amber' },
    // Towering background skyline monoliths (depth + fog layering)
    { x: -12.8, z: -11.5, width: 3.8, depth: 3.6, height: 16.5, neonTone: 'cyan', hasAntenna: true },
    { x: -5.2, z: -13.2, width: 4.2, depth: 3.8, height: 21.0, neonTone: 'magenta', hasAntenna: true },
    { x: 0.0, z: -15.4, width: 4.8, depth: 4.0, height: 24.5, neonTone: 'amber', hasAntenna: true },
    { x: 5.6, z: -13.0, width: 4.0, depth: 3.8, height: 19.8, neonTone: 'cyan', hasAntenna: true },
    { x: 13.0, z: -11.2, width: 3.8, depth: 3.6, height: 15.8, neonTone: 'magenta', hasAntenna: true },
  ],
  drones: [
    { origin: [0, 4.9, -1.5], amplitude: [6.8, 0.45, 3.2], speed: 0.62, phase: 0.0, tone: 'cyan' },
    { origin: [0, 6.4, -5.8], amplitude: [9.2, 0.55, 2.4], speed: -0.48, phase: 2.1, tone: 'magenta' },
  ],
  // Retain populated arrays for backward compatibility with map contract assertions
  trees: [
    { x: -4.2, z: 0.9, scale: 1.0 },
    { x: 4.2, z: 0.9, scale: 1.0 },
    { x: -4.5, z: -5.8, scale: 1.15 },
    { x: 4.5, z: -5.8, scale: 1.15 },
  ],
  boulders: [
    { x: -3.1, z: 2.2, scale: 0.65 },
    { x: 3.1, z: 2.2, scale: 0.65 },
  ],
  braziers: [
    { x: -2.25, z: 1.75, tone: 'cyan' },
    { x: 2.25, z: 1.75, tone: 'magenta' },
  ],
};

const BUILTIN_MAPS: Record<string, PlaygroundMapDefinition> = {
  'cyberpunk-citadel': CYBERPUNK_CITADEL_MAP,
  // Map legacy 'sanctuary-isle' alias directly to the upgraded cyberpunk sector so all presets render the crisp urban skyline
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
