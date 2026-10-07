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
export declare function normalRandom(mean?: number, variance?: number): number;
/**
 * In-place Fisher-Yates shuffle. Mutates the input array.
 * Uses Math.random() (seeded by seedrandom for reproducibility).
 * SRS §45.1, P2.10
 *
 * @param array - The array to shuffle in-place.
 */
export declare function shuffle(array: any[]): void;
/**
 * Splits a dataset into training and test sets.
 * Shuffles first to ensure randomness before slicing.
 * SRS §48.2, P2.11
 *
 * @param data - The full labeled dataset.
 * @param percTrain - Percentage (10–90) of data to use for training.
 * @returns [trainData, testData]
 */
export declare function splitData(data: Example2D[], percTrain: number): [Example2D[], Example2D[]];
/**
 * Generates the Circle dataset.
 * SRS §4.3.1, P2.3
 */
export declare function classifyCircleData(numSamples: number, noise: number): Example2D[];
/**
 * Generates the XOR dataset.
 * SRS §4.3.1, P2.4
 */
export declare function classifyXORData(numSamples: number, noise: number): Example2D[];
/**
 * Generates the Two Gaussian (Two Clusters) dataset.
 * SRS §4.3.1, P2.5
 */
export declare function classifyTwoGaussData(numSamples: number, noise: number): Example2D[];
/**
 * Generates the Spiral dataset.
 * SRS §4.3.1, P2.6
 */
export declare function classifySpiralData(numSamples: number, noise: number): Example2D[];
/**
 * Generates the Regression Plane dataset.
 * SRS §4.3.2, P2.7
 */
export declare function regressPlane(numSamples: number, noise: number): Example2D[];
/**
 * Generates the Regression Gaussian dataset.
 * SRS §4.3.2, §39.4, P2.8
 */
export declare function regressGaussian(numSamples: number, noise: number): Example2D[];
//# sourceMappingURL=dataset.d.ts.map