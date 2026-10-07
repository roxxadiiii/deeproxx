/* ============================================================
 * dataset.ts — Data Generators: Circle, XOR, Gauss, Spiral
 * SRS §4.3, §39.4, §45, §47, §48
 * Roadmap: Phase 2 (P2.1 – P2.20)
 * ============================================================ */

// ─────────────────────────────────────────────────────────────
// SECTION 1: Core Types (SRS §51.2)
// ─────────────────────────────────────────────────────────────

/**
 * A single labeled 2D data point.
 * `x` and `y` are the input features; `label` is +1 or -1 for
 * classification, or a continuous value for regression.
 * SRS §51.2, P2.1
 */
export interface Example2D {
  x: number;
  y: number;
  label: number;
}

/**
 * Type alias for all dataset generator functions.
 * Each generator accepts a sample count and noise level (0–50).
 * SRS §51.2, P2.2
 */
export type DataGenerator = (numSamples: number, noise: number) => Example2D[];

// ─────────────────────────────────────────────────────────────
// SECTION 2: Mathematical Helper Functions (SRS §45)
// ─────────────────────────────────────────────────────────────

/**
 * Generates a normally distributed random number.
 * Implements the Box-Muller transform with rejection sampling.
 * Rejection rate ≈ 78.5% (= π/4).  (SRS §45.2)
 *
 * @param mean - Center of the distribution.
 * @param variance - Spread of the distribution.
 * @returns A random number sampled from N(mean, variance).
 *
 * SRS §45.2, P2.9
 */
export function normalRandom(mean: number = 0, variance: number = 1): number {
  let v1: number, v2: number, s: number;
  do {
    v1 = 2 * Math.random() - 1;
    v2 = 2 * Math.random() - 1;
    s = v1 * v1 + v2 * v2;
  } while (s >= 1 || s === 0);
  const result = Math.sqrt(-2 * Math.log(s) / s) * v1;
  return mean + Math.sqrt(variance) * result;
}

/**
 * Computes the Euclidean distance from the origin (0, 0).
 */
function dist(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

/**
 * Helper to map noise [0, 50] to a target range.
 */
function scaleNoise(noise: number, minOut: number = 0, maxOut: number = 1): number {
  return minOut + (noise / 50) * (maxOut - minOut);
}

/**
 * In-place Fisher-Yates shuffle. Mutates the input array.
 * Uses Math.random() (seeded by seedrandom for reproducibility).
 * SRS §45.1, P2.10
 *
 * @param array - The array to shuffle in-place.
 */
export function shuffle(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/**
 * Splits a dataset into training and test sets.
 * Shuffles first to ensure randomness before slicing.
 * SRS §48.2, P2.11
 *
 * @param data - The full labeled dataset.
 * @param percTrain - Percentage (10–90) of data to use for training.
 * @returns [trainData, testData]
 */
export function splitData(
  data: Example2D[],
  percTrain: number,
): [Example2D[], Example2D[]] {
  const dataCopy = data.slice();
  shuffle(dataCopy);
  const numTrain = Math.floor((dataCopy.length * percTrain) / 100);
  const trainData = dataCopy.slice(0, numTrain);
  const testData = dataCopy.slice(numTrain);
  return [trainData, testData];
}

// ─────────────────────────────────────────────────────────────
// SECTION 3: Classification Generators (SRS §4.3.1)
// ─────────────────────────────────────────────────────────────

/**
 * Generates the Circle dataset.
 * SRS §4.3.1, P2.3
 */
export function classifyCircleData(
  numSamples: number,
  noise: number,
): Example2D[] {
  const points: Example2D[] = [];
  const radius = 5;
  const numShapes = numSamples / 2;

  // Generate positive points inside r < 2.5
  for (let i = 0; i < numShapes; i++) {
    const r = (Math.random() * radius * 0.5);
    const angle = Math.random() * 2 * Math.PI;
    const noiseX = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    const noiseY = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    const x = r * Math.sin(angle) + noiseX;
    const y = r * Math.cos(angle) + noiseY;
    points.push({ x, y, label: 1 });
  }

  // Generate negative points in outer ring (3.5 < r < 5.0)
  for (let i = 0; i < numShapes; i++) {
    const r = (Math.random() * radius * 0.3) + radius * 0.7;
    const angle = Math.random() * 2 * Math.PI;
    const noiseX = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    const noiseY = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    const x = r * Math.sin(angle) + noiseX;
    const y = r * Math.cos(angle) + noiseY;
    points.push({ x, y, label: -1 });
  }

  return points;
}

/**
 * Generates the XOR dataset.
 * SRS §4.3.1, P2.4
 */
export function classifyXORData(
  numSamples: number,
  noise: number,
): Example2D[] {
  const points: Example2D[] = [];
  const padding = 0.3;

  for (let i = 0; i < numSamples; i++) {
    let x = Math.random() * 10 - 5;
    let y = Math.random() * 10 - 5;

    // Apply padding away from axes
    if (Math.abs(x) < padding) x = x >= 0 ? padding : -padding;
    if (Math.abs(y) < padding) y = y >= 0 ? padding : -padding;

    const noiseX = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    const noiseY = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    x += noiseX;
    y += noiseY;

    const label = x * y >= 0 ? 1 : -1;
    points.push({ x, y, label });
  }

  return points;
}

/**
 * Generates the Two Gaussian (Two Clusters) dataset.
 * SRS §4.3.1, P2.5
 */
export function classifyTwoGaussData(
  numSamples: number,
  noise: number,
): Example2D[] {
  const points: Example2D[] = [];
  const variance = scaleNoise(noise, 0.5, 4.0);

  for (let i = 0; i < numSamples / 2; i++) {
    const x = normalRandom(2, variance);
    const y = normalRandom(2, variance);
    points.push({ x, y, label: 1 });
  }

  for (let i = 0; i < numSamples / 2; i++) {
    const x = normalRandom(-2, variance);
    const y = normalRandom(-2, variance);
    points.push({ x, y, label: -1 });
  }

  return points;
}

/**
 * Generates the Spiral dataset.
 * SRS §4.3.1, P2.6
 */
export function classifySpiralData(
  numSamples: number,
  noise: number,
): Example2D[] {
  const points: Example2D[] = [];
  const n = numSamples / 2;

  // Spiral 1 (label +1)
  for (let i = 0; i < n; i++) {
    const r = (i / n) * 5;
    const t = 1.75 * (i / n) * 2 * Math.PI;
    const noiseX = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    const noiseY = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    const x = r * Math.sin(t) + noiseX;
    const y = r * Math.cos(t) + noiseY;
    points.push({ x, y, label: 1 });
  }

  // Spiral 2 (label -1)
  for (let i = 0; i < n; i++) {
    const r = (i / n) * 5;
    const t = 1.75 * (i / n) * 2 * Math.PI + Math.PI;
    const noiseX = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    const noiseY = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    const x = r * Math.sin(t) + noiseX;
    const y = r * Math.cos(t) + noiseY;
    points.push({ x, y, label: -1 });
  }

  return points;
}

// ─────────────────────────────────────────────────────────────
// SECTION 4: Regression Generators (SRS §4.3.2, §39.4)
// ─────────────────────────────────────────────────────────────

/**
 * Generates the Regression Plane dataset.
 * SRS §4.3.2, P2.7
 */
export function regressPlane(
  numSamples: number,
  noise: number,
): Example2D[] {
  const points: Example2D[] = [];

  for (let i = 0; i < numSamples; i++) {
    let x = Math.random() * 12 - 6;
    let y = Math.random() * 12 - 6;
    const noiseX = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    const noiseY = (Math.random() - 0.5) * scaleNoise(noise, 0, 2);
    x += noiseX;
    y += noiseY;
    const label = (x + y) / 12;
    points.push({ x, y, label });
  }

  return points;
}

/**
 * Generates the Regression Gaussian dataset.
 * SRS §4.3.2, §39.4, P2.8
 */
export function regressGaussian(
  numSamples: number,
  noise: number,
): Example2D[] {
  const points: Example2D[] = [];
  const centers = [
    { cx: -2, cy: 2, amp: 1.0 },
    { cx: 2, cy: 2, amp: -0.8 },
    { cx: -3, cy: -3, amp: 0.5 },
    { cx: 3, cy: -2, amp: 0.9 },
    { cx: 0, cy: 0, amp: -1.0 },
    { cx: 0, cy: 4, amp: 0.7 },
  ];

  for (let i = 0; i < numSamples; i++) {
    let x = Math.random() * 12 - 6;
    let y = Math.random() * 12 - 6;
    const noiseVal = (Math.random() - 0.5) * scaleNoise(noise, 0, 1);
    
    let maxVal = -Infinity;
    for (const c of centers) {
      const d2 = Math.pow(x - c.cx, 2) + Math.pow(y - c.cy, 2);
      const val = c.amp * Math.exp(-d2 / 4);
      if (val > maxVal) {
        maxVal = val;
      }
    }
    const label = Math.min(1, Math.max(-1, maxVal + noiseVal));
    points.push({ x, y, label });
  }

  return points;
}

