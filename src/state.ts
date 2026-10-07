/* ============================================================
 * state.ts — Global Configuration & URL Hash Serialization
 * SRS §4.2, §5, §28, §35, §51
 * Roadmap: Phase 3 (P3.1 – P3.19)
 * ============================================================ */

import * as nn from './nn';
import * as dataset from './dataset';

// NOTE: seedrandom patches Math.random() globally.
import 'seedrandom';

// ─────────────────────────────────────────────────────────────
// SECTION 1: Enumerations (SRS §4.2)
// ─────────────────────────────────────────────────────────────

/**
 * Indicates how a `State` property is serialized to/from the URL hash.
 * SRS §4.2, P3.1
 */
export enum Type {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  ARRAY_NUMBER = 'ARRAY_NUMBER',
  ARRAY_STRING = 'ARRAY_STRING',
  BOOLEAN = 'BOOLEAN',
  OBJECT = 'OBJECT',
}

/**
 * Defines the task type: binary classification or continuous regression.
 * SRS §4.2, P3.2
 */
export enum Problem {
  CLASSIFICATION = 'classification',
  REGRESSION = 'regression',
}

// ─────────────────────────────────────────────────────────────
// SECTION 2: Lookup Objects (SRS §58.3)
// ─────────────────────────────────────────────────────────────

/**
 * Maps URL-param key strings to ActivationFunction objects.
 * Used for OBJECT-typed state properties.
 * SRS §5, P3.5
 */
export const activations: { [key: string]: nn.ActivationFunction } = {
  relu: nn.Activations.RELU,
  tanh: nn.Activations.TANH,
  sigmoid: nn.Activations.SIGMOID,
  linear: nn.Activations.LINEAR,
};

/**
 * Maps URL-param key strings to RegularizationFunction objects.
 * SRS §5, P3.5
 */
export const regularizations: { [key: string]: nn.RegularizationFunction } = {
  none: nn.RegularizationFunction.NONE,
  L1: nn.RegularizationFunction.L1,
  L2: nn.RegularizationFunction.L2,
};

/**
 * Maps URL-param key strings to classification DataGenerator functions.
 * SRS §5, P3.5
 */
export const datasets: { [key: string]: dataset.DataGenerator } = {
  circle: dataset.classifyCircleData,
  xor: dataset.classifyXORData,
  gauss: dataset.classifyTwoGaussData,
  spiral: dataset.classifySpiralData,
};

/**
 * Maps URL-param key strings to regression DataGenerator functions.
 * SRS §5, §39.4, P3.5
 */
export const regDatasets: { [key: string]: dataset.DataGenerator } = {
  'reg-plane': dataset.regressPlane,
  'reg-gauss': dataset.regressGaussian,
};

// ─────────────────────────────────────────────────────────────
// SECTION 3: Property Descriptor (SRS §4.2)
// ─────────────────────────────────────────────────────────────

/**
 * Describes a single serializable state property.
 * Used in the PROPS registry.
 */
interface PropDescriptor {
  /** The state object's property key name. */
  name: string;
  /** How this property is serialized. */
  type: Type;
  /** For OBJECT types, the lookup map from key → value. */
  keyMap?: { [key: string]: any };
  /** The default value if the URL param is missing. */
  defaultValue?: any;
}

// ─────────────────────────────────────────────────────────────
// SECTION 4: State Class (SRS §4.2, §5)
// ─────────────────────────────────────────────────────────────

/**
 * Maintains all configuration state for the playground.
 * Properties map 1-to-1 to URL hash parameters and UI controls.
 * SRS §4.2, §5, P3.3
 */
export class State {

  // ── Training Parameters (SRS §5) ──────────────────────────

  /** SGD step size. Range: 0.00001 – 10. Default: 0.03. */
  learningRate: number = 0.03;

  /** The activation function for hidden layers. Default: TANH. */
  activation: nn.ActivationFunction = nn.Activations.TANH;

  /** The regularization penalty type. Default: NONE. */
  regularization: nn.RegularizationFunction = nn.RegularizationFunction.NONE;

  /** Regularization strength λ. Range: 0 – 10. Default: 0. */
  regularizationRate: number = 0;

  /** The task type: classification or regression. Default: CLASSIFICATION. */
  problem: Problem = Problem.CLASSIFICATION;

  // ── Data Parameters ────────────────────────────────────────

  /** The active classification dataset generator. Default: circle. */
  dataset: dataset.DataGenerator = dataset.classifyCircleData;

  /** The active regression dataset generator. Default: reg-plane. */
  regDataset: dataset.DataGenerator = dataset.regressPlane;

  /** Percentage of data used for training (10 – 90). Default: 50. */
  percTrainData: number = 50;

  /** Dataset noise level (0 – 50). Default: 0. */
  noise: number = 0;

  /** Samples per mini-batch (1 – 30). Default: 10. */
  batchSize: number = 10;

  // ── Network Architecture ───────────────────────────────────

  /**
   * Comma-separated neuron counts for hidden layers only.
   * Input and output layers are determined by features and task.
   * Default: [4, 2] (two hidden layers).
   * SRS §5
   */
  networkShape: number[] = [4, 2];

  // ── Feature Toggles (SRS §38.2) ───────────────────────────

  /** Use raw x feature. */
  x: boolean = true;

  /** Use raw y feature. */
  y: boolean = true;

  /** Use x² feature. */
  xSquared: boolean = false;

  /** Use y² feature. */
  ySquared: boolean = false;

  /** Use x·y cross feature. */
  xTimesY: boolean = false;

  /** Use sin(x) feature. */
  sinX: boolean = false;

  /** Use sin(y) feature. */
  sinY: boolean = false;

  // ── Reproducibility ────────────────────────────────────────

  /** Random seed for deterministic dataset and weight initialization. */
  seed: string = '';

  // ── UI State (SRS §4.2 `_hide` suffix) ────────────────────

  /** Whether the tutorial UI is hidden. */
  tutorial: string = '';

  // ── Static: Property Registry ─────────────────────────────

  /**
   * Registry of all serializable properties.
   * Maps each property to its serialization type and optional lookup map.
   * SRS §4.2, P3.4
   */
  static PROPS: PropDescriptor[] = [
    { name: 'activation',         type: Type.OBJECT,       keyMap: activations,     defaultValue: nn.Activations.TANH },
    { name: 'regularization',     type: Type.OBJECT,       keyMap: regularizations, defaultValue: nn.RegularizationFunction.NONE },
    { name: 'batchSize',          type: Type.NUMBER,                                defaultValue: 10 },
    { name: 'dataset',            type: Type.OBJECT,       keyMap: datasets,        defaultValue: dataset.classifyCircleData },
    { name: 'regDataset',         type: Type.OBJECT,       keyMap: regDatasets,     defaultValue: dataset.regressPlane },
    { name: 'learningRate',       type: Type.NUMBER,                                defaultValue: 0.03 },
    { name: 'regularizationRate', type: Type.NUMBER,                                defaultValue: 0 },
    { name: 'noise',              type: Type.NUMBER,                                defaultValue: 0 },
    { name: 'networkShape',       type: Type.ARRAY_NUMBER,                          defaultValue: [4, 2] },
    { name: 'seed',               type: Type.STRING,                                defaultValue: '' },
    { name: 'problem',            type: Type.OBJECT,       keyMap: { classification: Problem.CLASSIFICATION, regression: Problem.REGRESSION }, defaultValue: Problem.CLASSIFICATION },
    { name: 'percTrainData',      type: Type.NUMBER,                                defaultValue: 50 },
    { name: 'x',                  type: Type.BOOLEAN,                               defaultValue: true },
    { name: 'y',                  type: Type.BOOLEAN,                               defaultValue: true },
    { name: 'xSquared',           type: Type.BOOLEAN,                               defaultValue: false },
    { name: 'ySquared',           type: Type.BOOLEAN,                               defaultValue: false },
    { name: 'xTimesY',            type: Type.BOOLEAN,                               defaultValue: false },
    { name: 'sinX',               type: Type.BOOLEAN,                               defaultValue: false },
    { name: 'sinY',               type: Type.BOOLEAN,                               defaultValue: false },
    { name: 'tutorial',           type: Type.STRING,                                defaultValue: '' },
  ];

  // ─────────────────────────────────────────────────────────
  // Static Methods
  // ─────────────────────────────────────────────────────────

  /**
   * Safely parses a comma-separated array string.
   * Returns [] for empty strings to prevent parse errors.
   * SRS §4.2, P3.6
   *
   * @param value - The raw comma-separated string.
   * @returns An array of strings (may be empty).
   */
  static parseArray(value: string): string[] {
    // TODO P3.6: return value.trim() === '' ? [] : value.split(',')
    throw new Error('Not implemented: State.parseArray');
  }

  /**
   * Reads and parses the URL hash fragment to reconstruct State.
   * Splits on `&` (parameter separator) and `=` (key-value separator).
   * Falls back to defaults for missing or invalid parameters.
   * Generates a fresh random seed if none is present in the URL.
   *
   * SRS §4.2, §28.3, §35.2, P3.7
   *
   * @returns A fully populated State object.
   */
  static deserializeState(): State {
    // TODO P3.7: Parse window.location.hash
    // Algorithm:
    //   1. state = new State()
    //   2. hash = window.location.hash.slice(1) (remove leading '#')
    //   3. params = {} — split hash on '&', then split each on '=', store key → value
    //   4. For each prop in State.PROPS:
    //      - rawValue = params[prop.name]
    //      - if missing → skip (default remains)
    //      - if Type.NUMBER → state[prop.name] = +rawValue
    //      - if Type.BOOLEAN → state[prop.name] = rawValue === 'true'
    //      - if Type.STRING → state[prop.name] = rawValue
    //      - if Type.ARRAY_NUMBER → state[prop.name] = parseArray(rawValue).map(Number)
    //      - if Type.OBJECT → state[prop.name] = prop.keyMap![rawValue] ?? default
    //   5. Handle _hide suffix properties for UI toggles
    //   6. If seed is empty: generate new seed, call Math.seedrandom(seed), state.seed = seed
    //      Else: Math.seedrandom(state.seed)
    //   7. return state
    throw new Error('Not implemented: State.deserializeState');
  }

  /**
   * Serializes all state properties back into the URL hash fragment.
   * Converts objects to their keys, arrays to comma-separated strings.
   * Updates `window.location.hash` in place (no page reload).
   *
   * SRS §4.2, §28.2, P3.8
   */
  serialize(): void {
    // TODO P3.8: Serialize state to window.location.hash
    // Algorithm:
    //   1. parts: string[] = []
    //   2. For each prop in State.PROPS:
    //      - value = this[prop.name]
    //      - if Type.OBJECT: find the key in prop.keyMap whose value === current value
    //      - if Type.ARRAY_NUMBER: value.join(',')
    //      - if Type.BOOLEAN: value.toString()
    //      - else: String(value)
    //      - parts.push(`${prop.name}=${serializedValue}`)
    //   3. Append _hide suffix properties
    //   4. window.location.hash = parts.join('&')
    throw new Error('Not implemented: State.prototype.serialize');
  }
}
