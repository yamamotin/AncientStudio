/**
 * Deterministic 2D/3D procedural value & fractional Brownian motion (fBm) noise
 * for reproducible low-poly RPG terrain, boulders, and ember turbulence without external dependencies.
 */

function fract(x: number): number {
  return x - Math.floor(x);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function fade(t: number): number {
  return t * t * (3 - 2 * t);
}

export function hash2D(ix: number, iz: number): number {
  const n = Math.sin(ix * 127.1 + iz * 311.7) * 43758.5453123;
  return fract(n);
}

export function valueNoise2D(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = fade(x - ix);
  const fz = fade(z - iz);

  const a = hash2D(ix, iz);
  const b = hash2D(ix + 1, iz);
  const c = hash2D(ix, iz + 1);
  const d = hash2D(ix + 1, iz + 1);

  return lerp(lerp(a, b, fx), lerp(c, d, fx), fz) * 2 - 1;
}

export function fbm2D(x: number, z: number, octaves = 4): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1.0;
  let norm = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * valueNoise2D(x * frequency, z * frequency);
    norm += amplitude;
    frequency *= 2.03;
    amplitude *= 0.5;
  }

  return value / (norm || 1);
}

export function ridgedFbm2D(x: number, z: number, octaves = 4): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1.0;
  let norm = 0;

  for (let i = 0; i < octaves; i++) {
    const n = 1.0 - Math.abs(valueNoise2D(x * frequency, z * frequency));
    value += amplitude * (n * n);
    norm += amplitude;
    frequency *= 2.05;
    amplitude *= 0.5;
  }

  return value / (norm || 1);
}

/**
 * Evaluates world terrain elevation at (x, z) so stones, torches, trees, and ruins
 * sit accurately on the sculpted low-poly terrain, surrounded by a reflective sanctuary lake moat.
 */
export const WATER_SURFACE_Y = -1.62;

export function evaluateTerrainHeight(x: number, z: number): number {
  // Central sanctuary island around (0, -2.5) so the ancient shrine & braziers rise above the lake
  const dx = x;
  const dz = z + 2.5;
  const distFromSanctuary = Math.sqrt(dx * dx + dz * dz);

  // Island crown at r < 4.2, surrounded by a carved water moat ring (r in 4.8 .. 9.6)
  const islandCrown = distFromSanctuary < 4.8 ? Math.cos((distFromSanctuary / 4.8) * Math.PI * 0.5) * 0.68 : 0;
  const moatRing = Math.exp(-Math.pow((distFromSanctuary - 7.1) / 2.35, 2)) * 1.42;

  // Winding stone causeway bridge leading from foreground (0, +7.5) across the water toward shrine (0, -2.5)
  const pathCenterX = Math.sin(z * 0.28) * 1.25;
  const distFromPath = Math.abs(x - pathCenterX);
  const onCauseway = z > -2.8 && z < 11.2 ? Math.exp(-(distFromPath * distFromPath) * 0.55) : 0;

  // Rolling rocky hills & distant mountain ridges outside the moat
  const outerMask = Math.min(1, Math.max(0, (distFromSanctuary - 6.2) / 4.5));
  const baseNoise = fbm2D(x * 0.085 + 3.1, z * 0.085 - 1.7, 4) * 3.1;
  const ridgeNoise = Math.abs(fbm2D(x * 0.16 - 5.2, z * 0.16 + 2.4, 3)) * 2.2;

  // Rise dramatically in the far background (z < -12) and framing canyon sides (|x| > 8.5)
  const sideCanyon = Math.pow(Math.max(0, Math.abs(x) - 7.8) * 0.24, 1.65);
  const farMountains =
    z < -11.5
      ? Math.pow((-11.5 - z) * 0.27, 1.55) *
        (0.65 + 0.65 * Math.abs(valueNoise2D(x * 0.14, z * 0.12)))
      : 0;

  const rawHeight =
    (baseNoise + ridgeNoise * 0.65) * outerMask +
    islandCrown -
    moatRing * (1 - onCauseway * 0.92) +
    onCauseway * 0.42 +
    sideCanyon +
    farMountains;

  const terraced = Math.round(rawHeight * 1.6) / 1.6;
  return lerp(rawHeight, terraced, 0.35) - 1.28;
}
