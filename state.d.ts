import * as nn from './nn';
import * as dataset from './dataset';
import 'seedrandom';
/**
 * Indicates how a `State` property is serialized to/from the URL hash.
 * SRS §4.2, P3.1
 */
export declare enum Type {
    STRING = "STRING",
    NUMBER = "NUMBER",
    ARRAY_NUMBER = "ARRAY_NUMBER",
    ARRAY_STRING = "ARRAY_STRING",
    BOOLEAN = "BOOLEAN",
    OBJECT = "OBJECT"
}
/**
 * Defines the task type: binary classification or continuous regression.
 * SRS §4.2, P3.2
 */
export declare enum Problem {
    CLASSIFICATION = "classification",
    REGRESSION = "regression"
}
/**
 * Maps URL-param key strings to ActivationFunction objects.
 * Used for OBJECT-typed state properties.
 * SRS §5, P3.5
 */
export declare const activations: {
    [key: string]: nn.ActivationFunction;
};
/**
 * Maps URL-param key strings to RegularizationFunction objects.
 * SRS §5, P3.5
 */
export declare const regularizations: {
    [key: string]: nn.RegularizationFunction;
};
/**
 * Maps URL-param key strings to classification DataGenerator functions.
 * SRS §5, P3.5
 */
export declare const datasets: {
    [key: string]: dataset.DataGenerator;
};
/**
 * Maps URL-param key strings to regression DataGenerator functions.
 * SRS §5, §39.4, P3.5
 */
export declare const regDatasets: {
    [key: string]: dataset.DataGenerator;
};
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
    keyMap?: {
        [key: string]: any;
    };
    /** The default value if the URL param is missing. */
    defaultValue?: any;
}
/**
 * Maintains all configuration state for the playground.
 * Properties map 1-to-1 to URL hash parameters and UI controls.
 * SRS §4.2, §5, P3.3
 */
export declare class State {
    /** SGD step size. Range: 0.00001 – 10. Default: 0.03. */
    learningRate: number;
    /** The activation function for hidden layers. Default: TANH. */
    activation: nn.ActivationFunction;
    /** The regularization penalty type. Default: NONE. */
    regularization: nn.RegularizationFunction;
    /** Regularization strength λ. Range: 0 – 10. Default: 0. */
    regularizationRate: number;
    /** The task type: classification or regression. Default: CLASSIFICATION. */
    problem: Problem;
    /** The active classification dataset generator. Default: circle. */
    dataset: dataset.DataGenerator;
    /** The active regression dataset generator. Default: reg-plane. */
    regDataset: dataset.DataGenerator;
    /** Percentage of data used for training (10 – 90). Default: 50. */
    percTrainData: number;
    /** Dataset noise level (0 – 50). Default: 0. */
    noise: number;
    /** Samples per mini-batch (1 – 30). Default: 10. */
    batchSize: number;
    /**
     * Comma-separated neuron counts for hidden layers only.
     * Input and output layers are determined by features and task.
     * Default: [4, 2] (two hidden layers).
     * SRS §5
     */
    networkShape: number[];
    /** Use raw x feature. */
    x: boolean;
    /** Use raw y feature. */
    y: boolean;
    /** Use x² feature. */
    xSquared: boolean;
    /** Use y² feature. */
    ySquared: boolean;
    /** Use x·y cross feature. */
    xTimesY: boolean;
    /** Use sin(x) feature. */
    sinX: boolean;
    /** Use sin(y) feature. */
    sinY: boolean;
    /** Random seed for deterministic dataset and weight initialization. */
    seed: string;
    /** Whether to render test dataset points on the heatmap. */
    showTestData: boolean;
    /** Whether to discretize the heatmap output into binary classification outputs. */
    discretize: boolean;
    /** Whether the tutorial UI is hidden. */
    tutorial: string;
    /**
     * Registry of all serializable properties.
     * Maps each property to its serialization type and optional lookup map.
     * SRS §4.2, P3.4
     */
    static PROPS: PropDescriptor[];
    /**
     * Safely parses a comma-separated array string.
     * Returns [] for empty strings to prevent parse errors.
     * SRS §4.2, P3.6
     *
     * @param value - The raw comma-separated string.
     * @returns An array of strings (may be empty).
     */
    static parseArray(value: string): string[];
    /**
     * Reads and parses the URL hash fragment to reconstruct State.
     * SRS §4.2, §28.3, §35.2, P3.7
     */
    static deserializeState(): State;
    /**
     * Serializes all state properties back into the URL hash fragment.
     * SRS §4.2, §28.2, P3.8
     */
    serialize(): string;
}
export {};
//# sourceMappingURL=state.d.ts.map