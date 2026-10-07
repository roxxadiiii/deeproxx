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
  // TODO P2.9: Implement Box-Muller transform
  // Algorithm (rejection sampling):
  //   1. Loop:
  //      v1 = 2 * Math.random() - 1
  //      v2 = 2 * Math.random() - 1
  //      s = v1 * v1 + v2 * v2
  //      if s < 1 and s != 0: break
  //   2. result = Math.sqrt(-2 * Math.log(s) / s) * v1
  //   3. return mean + Math.sqrt(variance) * result
  throw new Error('Not implemented: normalRandom');
}

/**
 * Computes the Euclidean distance from the origin (0, 0).
 */
function dist(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

/**
 * In-place Fisher-Yates shuffle. Mutates the input array.
 * Uses Math.random() (seeded by seedrandom for reproducibility).
 * SRS §45.1, P2.10
 *
 * @param array - The array to shuffle in-place.
 */
export function shuffle(array: any[]): void {
  // TODO P2.10: Implement Fisher-Yates shuffle
  // Algorithm:
  //   for i = array.length - 1 downto 1:
  //     j = Math.floor(Math.random() * (i + 1))
  //     swap array[i] and array[j]
  throw new Error('Not implemented: shuffle');
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
  // TODO P2.11: shuffle then slice at percTrain%
  // trainData = data.slice(0, Math.floor(data.length * percTrain / 100))
  // testData  = data.slice(trainData.length)
  throw new Error('Not implemented: splitData');
}

// ─────────────────────────────────────────────────────────────
// SECTION 3: Classification Generators (SRS §4.3.1)
// ─────────────────────────────────────────────────────────────

/**
 * Generates the Circle dataset.
 *
 * Geometry:
 *  - Points sampled randomly within a circle of radius 5.
 *  - r < 2.5  → label +1 (inner cluster)
 *  - 3.5 < r < 5.0 → label -1 (outer ring)
 *  - Points in 2.5 ≤ r ≤ 3.5 are excluded (gap zone).
 *  - Noise adds uniform offset to coordinates.
 *
 * SRS §4.3.1, P2.3
 */
export function classifyCircleData(
  numSamples: number,
  noise: number,
): Example2D[] {
  // TODO P2.3: Generate circle data
  // for each sample:
  //   r = Math.random() * 5
  //   angle = Math.random() * 2 * Math.PI
  //   x = r * Math.cos(angle) + noise offset
  //   y = r * Math.sin(angle) + noise offset
  //   label: dist(x,y) < 2.5 → +1; else if dist(x,y) > 3.5 → -1; else skip
  throw new Error('Not implemented: classifyCircleData');
}

/**
 * Generates the XOR dataset.
 *
 * Geometry:
 *  - Random points (x, y) in [-5, 5].
 *  - Padding of 0.3 keeps points away from the axes.
 *  - x·y ≥ 0 (same-sign diagonal quadrant) → label +1.
 *  - x·y < 0 (opposite quadrant) → label -1.
 *
 * SRS §4.3.1, P2.4
 */
export function classifyXORData(
  numSamples: number,
  noise: number,
): Example2D[] {
  // TODO P2.4: Generate XOR data
  // for each sample:
  //   x = Math.random() * 10 - 5  (with noise and padding 0.3)
  //   y = Math.random() * 10 - 5  (with noise and padding 0.3)
  //   label = x * y >= 0 ? 1 : -1
  throw new Error('Not implemented: classifyXORData');
}

/**
 * Generates the Two Gaussian (Two Clusters) dataset.
 *
 * Geometry:
 *  - Cluster 1 centered at (2, 2), label +1.
 *  - Cluster 2 centered at (-2, -2), label -1.
 *  - Variance scales from 0.5 to 4.0 proportional to noise (0–50).
 *
 * SRS §4.3.1, P2.5
 */
export function classifyTwoGaussData(
  numSamples: number,
  noise: number,
): Example2D[] {
  // TODO P2.5: Generate two Gaussian clusters
  // variance = scaleNoise(noise, 0, 50, 0.5, 4.0)
  // for half samples: x = normalRandom(2, variance), y = normalRandom(2, variance), label +1
  // for other half: x = normalRandom(-2, variance), y = normalRandom(-2, variance), label -1
  throw new Error('Not implemented: classifyTwoGaussData');
}

/**
 * Generates the Spiral dataset.
 *
 * Geometry:
 *  - Spiral 1 (positive): r = (i/n)*5, angle = 1.75*(i/n)*2π.
 *  - Spiral 2 (negative): same radius, angle shifted by π.
 *  - Uniform noise added to coordinates.
 *
 * SRS §4.3.1, P2.6
 */
export function classifySpiralData(
  numSamples: number,
  noise: number,
): Example2D[] {
  // TODO P2.6: Generate spiral data using polar coordinates
  // for i in 0..n/2:
  //   r = i / (n/2) * 5
  //   t = 1.75 * (i / (n/2)) * 2 * Math.PI
  //   Spiral 1: x = r * sin(t) + noise, y = r * cos(t) + noise, label +1
  //   Spiral 2: x = r * sin(t + PI) + noise, y = r * cos(t + PI) + noise, label -1
  throw new Error('Not implemented: classifySpiralData');
}

// ─────────────────────────────────────────────────────────────
// SECTION 4: Regression Generators (SRS §4.3.2, §39.4)
// ─────────────────────────────────────────────────────────────

/**
 * Generates the Regression Plane dataset.
 *
 * Target function: z = x + y, normalized to [-1, 1].
 * Points sampled uniformly in [-6, 6]².
 *
 * SRS §4.3.2, P2.7
 */
export function regressPlane(
  numSamples: number,
  noise: number,
): Example2D[] {
  // TODO P2.7: Generate regression plane data
  // for each sample:
  //   x = Math.random() * 12 - 6 + noise offset
  //   y = Math.random() * 12 - 6 + noise offset
  //   label = (x + y) / 12  (normalized to [-1, 1])
  throw new Error('Not implemented: regressPlane');
}

/**
 * Generates the Regression Gaussian dataset.
 *
 * Six Gaussian centers defined in 2D space.
 * The target at (x, y) is the maximum radial influence from any center.
 * Output is normalized to [-1, 1].
 *
 * SRS §4.3.2, §39.4, P2.8
 */
export function regressGaussian(
  numSamples: number,
  noise: number,
): Example2D[] {
  // TODO P2.8: Generate regression Gaussian data
  // Define 6 Gaussian centers with (cx, cy, amplitude) values
  // For each sample (x, y) in [-6,6]²:
  //   label = max over centers of: amplitude * exp(-dist²(x-cx, y-cy))
  //   label += noise offset; clamp to [-1, 1]
  throw new Error('Not implemented: regressGaussian');
}
