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

/**
 * Evaluates world terrain elevation at (x, z) so stones, torches, trees, and ruins
 * sit accurately on the sculpted low-poly terrain.
 */
export function evaluateTerrainHeight(x: number, z: number): number {
  // Central sanctuary plateau around (0, -2.5) so the ancient shrine & braziers sit cleanly
  const dx = x;
  const dz = z + 2.5;
  const distFromSanctuary = Math.sqrt(dx * dx + dz * dz);
  const sanctuaryMask = Math.min(1, Math.max(0, (distFromSanctuary - 3.6) / 4.8));

  // Winding stone path leading from foreground (0, +7) toward shrine (0, -2.5)
  const pathCenterX = Math.sin(z * 0.28) * 1.35;
  const distFromPath = Math.abs(x - pathCenterX);
  const pathCarve = z > -3.0 && z < 11.0 ? Math.exp(-(distFromPath * distFromPath) * 0.42) : 0;

  // Rolling rocky hills & distant mountain ridges
  const baseNoise = fbm2D(x * 0.085 + 3.1, z * 0.085 - 1.7, 4) * 3.1;
  const ridgeNoise = Math.abs(fbm2D(x * 0.16 - 5.2, z * 0.16 + 2.4, 3)) * 2.2;

  // Rise dramatically in the far background (z < -12) and framing canyon sides (|x| > 8)
  const sideCanyon = Math.pow(Math.max(0, Math.abs(x) - 6.2) * 0.22, 1.65);
  const farMountains = z < -9.5 ? Math.pow((-9.5 - z) * 0.26, 1.55) * (0.65 + 0.65 * Math.abs(valueNoise2D(x * 0.14, z * 0.12))) : 0;

  // Stepped RPG terrace quantization blended with organic slope
  const rawHeight = (baseNoise + ridgeNoise * 0.65) * sanctuaryMask + sideCanyon + farMountains - pathCarve * 0.55;
  const terraced = Math.round(rawHeight * 1.6) / 1.6;

  return lerp(rawHeight, terraced, 0.38) - 1.35;
}
