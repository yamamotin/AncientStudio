/**
 * MapLoader: Lightweight declarative map schema & registry for small ASCII Realms playgrounds.
 * Keeps map definitions compact, deterministic, and completely free of MMORPG bloat.
 */

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
}

export interface PlaygroundMapDefinition {
  id: string;
  title: string;
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
  trees: TreeSpawnDef[];
  boulders: BoulderSpawnDef[];
  braziers: BrazierSpawnDef[];
}

const SANCTUARY_ISLE_MAP: PlaygroundMapDefinition = {
  id: 'sanctuary-isle',
  title: 'Ancient Sanctuary Isle',
  terrainSize: 44,
  terrainSegments: 72,
  waterSize: 64,
  waterLevel: -0.78,
  fogDensity: 0.036,
  cameraAnchor: [0.0, 5.2, 13.6],
  cameraLookAt: [0.0, 1.3, -1.6],
  shrineCenter: [0, -1.8],
  avatarSpawn: [-1.15, 2.55],
  causewayStones: 6,
  trees: [
    { x: -5.4, z: -3.2, scale: 1.25 },
    { x: -6.8, z: 0.8, scale: 1.05 },
    { x: -3.9, z: -6.4, scale: 1.4 },
    { x: 4.8, z: -4.1, scale: 1.3 },
    { x: 6.4, z: -0.6, scale: 1.1 },
    { x: 3.6, z: -6.8, scale: 1.45 },
    { x: -8.5, z: -5.2, scale: 1.6 },
    { x: 8.2, z: -5.5, scale: 1.55 },
    { x: -2.4, z: 4.1, scale: 0.88 },
    { x: 3.1, z: 3.8, scale: 0.92 },
    { x: -10.5, z: -1.5, scale: 1.5 },
    { x: 10.2, z: 1.8, scale: 1.35 },
  ],
  boulders: [
    { x: -3.1, z: 1.4, scale: 0.65 },
    { x: 2.9, z: 1.2, scale: 0.75 },
    { x: -4.8, z: 2.8, scale: 0.9 },
    { x: 5.1, z: 2.5, scale: 0.82 },
    { x: -1.9, z: -4.5, scale: 0.7 },
    { x: 2.3, z: -4.8, scale: 0.6 },
  ],
  braziers: [
    { x: -2.05, z: 1.65 },
    { x: 2.05, z: 1.65 },
  ],
};

const BUILTIN_MAPS: Record<string, PlaygroundMapDefinition> = {
  [SANCTUARY_ISLE_MAP.id]: SANCTUARY_ISLE_MAP,
};

export class MapLoader {
  public static load(mapId?: string): PlaygroundMapDefinition {
    if (mapId && BUILTIN_MAPS[mapId]) {
      return BUILTIN_MAPS[mapId]!;
    }
    return SANCTUARY_ISLE_MAP;
  }

  public static listMapIds(): string[] {
    return Object.keys(BUILTIN_MAPS);
  }
}
