/**
 * Defines the interface for an activation function.
 * Every activation function must supply both a forward `output`
 * and a `der` (derivative) for use in backpropagation.
 * SRS §3.2, P1.1
 */
export interface ActivationFunction {
    output(x: number): number;
    der(x: number): number;
}
/**
 * Defines the interface for a loss/error function.
 * `error` computes the scalar loss; `der` computes ∂E/∂output.
 * SRS §3.3, §25.1, P1.1
 */
export interface ErrorFunction {
    error(output: number, target: number): number;
    der(output: number, target: number): number;
}
/**
 * Defines the interface for a regularization penalty.
 * `output` computes R(w); `der` computes R'(w).
 * SRS §3.5, P1.1
 */
export interface RegularizationFunction {
    output(w: number): number;
    der(w: number): number;
}
/**
 * Collection of all built-in activation functions.
 * Each implements the ActivationFunction interface.
 * SRS §3.2.1–§3.2.4, P1.2–P1.5
 */
export declare class Activations {
    /**
     * Hyperbolic Tangent — squashes input to (-1, 1).
     * output: tanh(x)
     * derivative: 1 - tanh²(x)         (SRS §3.2.1)
     */
    static TANH: ActivationFunction;
    /**
     * Rectified Linear Unit — replaces negatives with 0.
     * output: max(0, x)
     * derivative: 0 if x ≤ 0, else 1   (SRS §3.2.2)
     */
    static RELU: ActivationFunction;
    /**
     * Sigmoid — squashes input to (0, 1).
     * output: 1 / (1 + e^-x)
     * derivative: σ(x) * (1 - σ(x))    (SRS §3.2.3)
     */
    static SIGMOID: ActivationFunction;
    /**
     * Linear — passes input directly through (identity).
     * output: x
     * derivative: 1                     (SRS §3.2.4)
     */
    static LINEAR: ActivationFunction;
}
/**
 * Built-in error/loss functions.
 * SRS §3.3, §25.1, P1.6
 */
export declare class Errors {
    /**
     * Square Loss: E = ½(output - target)²
     * derivative: ∂E/∂output = output - target   (SRS §3.3)
     */
    static SQUARE: ErrorFunction;
}
/**
 * Built-in regularization penalty functions.
 * SRS §3.5, P1.7–P1.8
 */
export declare class RegularizationFunction {
    /**
     * L1 Lasso: R(w) = |w|, R'(w) = sign(w)
     * Drives weights to exactly 0 — creating sparse networks.  (SRS §3.5)
     */
    static L1: RegularizationFunction;
    /**
     * L2 Ridge: R(w) = ½w², R'(w) = w
     * Keeps weights small but never zeros them.               (SRS §3.5)
     */
    static L2: RegularizationFunction;
    /** No regularization — null object pattern. */
    static NONE: RegularizationFunction;
}
/**
 * Represents a single neuron in the network.
 * Stores forward-pass values and gradient accumulators for backprop.
 * SRS §4.1, §51.3, P1.9–P1.10
 */
export declare class Node {
    /** Unique identifier string for this node. */
    id: string;
    /** Incoming connection weights from the previous layer. */
    inputLinks: Link[];
    /** Outgoing connection weights to the next layer. */
    outputs: Link[];
    /** Bias term b_i^(L). Initialized to 0.1 (or 0 if initZero). */
    bias: number;
    /**
     * Pre-activation weighted sum:
     * z = b + Σ(w_ji · a_j)    (SRS §3.1)
     */
    totalInput: number;
    /**
     * Post-activation output:
     * a = σ(z)                 (SRS §3.1)
     */
    output: number;
    /**
     * Gradient of the loss w.r.t. this node's output:
     * ∂E/∂a                   (SRS §3.4)
     */
    outputDer: number;
    /**
     * Gradient of the loss w.r.t. this node's pre-activation input:
     * δ_i^(L) = ∂E/∂z         (SRS §3.4)
     */
    inputDer: number;
    /**
     * Accumulates inputDer across a mini-batch.
     * Reset after each weight update.
     */
    accInputDer: number;
    /** Number of samples accumulated in the current batch. */
    numAccumulatedDers: number;
    /** The activation function assigned to this node. */
    activation: ActivationFunction;
    /**
     * Constructs a new Node.
     * @param id - Unique identifier string.
     * @param activation - The activation function for this node.
     * @param initZero - If true, biases are initialized to 0 instead of 0.1.
     */
    constructor(id: string, activation: ActivationFunction, initZero?: boolean);
    /**
     * Computes the forward pass for this node.
     * z = b + Σ(w_ji · a_j), then a = σ(z).
     * SRS §3.1, §14.1, P1.10
     *
     * @returns The activated output `a`.
     */
    updateOutput(): number;
}
/**
 * Represents a weighted connection (synapse) between two neurons.
 * SRS §4.1, §51.4, §43, P1.11–P1.12
 */
export declare class Link {
    /**
     * Unique identifier: `"source.id-dest.id"`.
     */
    id: string;
    /** The upstream (source) neuron. */
    source: Node;
    /** The downstream (destination) neuron. */
    dest: Node;
    /**
     * The trainable weight parameter.
     * Initialized uniformly in [-0.5, 0.5].   (SRS §26.2)
     */
    weight: number;
    /**
     * Marks this link as dead (pruned by L1 regularization).
     * When true, this link is skipped during forward and backward passes.
     * SRS §43
     */
    isDead: boolean;
    /**
     * Gradient of the loss w.r.t. this link's weight:
     * ∂E/∂w = δ_dest · a_source    (SRS §3.4)
     */
    errorDer: number;
    /**
     * Accumulated errorDer across a mini-batch.
     * Reset after each weight update.
     */
    accErrorDer: number;
    /** Number of samples accumulated in the current batch. */
    numAccumulatedDers: number;
    /** The regularization function applied to this link's weight. */
    regularization: RegularizationFunction;
    /**
     * Constructs a new Link.
     * @param source - The upstream node.
     * @param dest - The downstream node.
     * @param regularization - The regularization function (or NONE).
     * @param initZero - If true, weight is initialized to 0.
     */
    constructor(source: Node, dest: Node, regularization: RegularizationFunction, initZero?: boolean);
}
/**
 * Constructs the neural network as a 2D array of Nodes.
 * Each element [layer][neuron] gives direct access to a Node.
 *
 * @param networkShape - Number of neurons per layer, e.g. [2, 4, 2, 1].
 *                       Index 0 = input layer; last index = output layer.
 * @param activation - Activation function for hidden layer nodes.
 * @param outputActivation - Activation function for output layer nodes.
 * @param regularization - Regularization function for all link weights.
 * @param inputIds - String IDs for the input layer nodes (e.g. ["x", "y"]).
 * @param initZero - If true, all weights and biases are initialized to 0.
 * @returns 2D array: network[layerIndex][nodeIndex] → Node
 *
 * SRS §4.1, P1.13
 */
export declare function buildNetwork(networkShape: number[], activation: ActivationFunction, outputActivation: ActivationFunction, regularization: RegularizationFunction, inputIds: string[], initZero?: boolean): Node[][];
/**
 * Computes the forward pass through the entire network.
 * Sets each node's `output` field and returns the final output value.
 *
 * @param network - The 2D network array from buildNetwork.
 * @param inputs - Input feature values, one per input-layer node.
 * @returns The scalar output of the final layer's single node.
 *
 * SRS §4.1, §14.1, P1.14
 */
export declare function forwardProp(network: Node[][], inputs: number[]): number;
/**
 * Runs the backward pass to compute all error gradients.
 * After calling this, each Node.inputDer and each Link.errorDer
 * will contain the correct partial derivatives for the current sample.
 *
 * @param network - The 2D network array from buildNetwork.
 * @param target - The ground-truth label for the current sample.
 * @param errorFunc - The loss function to use (e.g. Errors.SQUARE).
 *
 * SRS §3.4, §4.1, §14.2, P1.15
 */
export declare function backProp(network: Node[][], target: number, errorFunc: ErrorFunction): void;
/**
 * Applies the accumulated gradients to update all weights and biases.
 * Implements SGD + regularization.
 * Handles L1 zero-crossing kill logic (SRS §43).
 *
 * @param network - The 2D network array from buildNetwork.
 * @param learningRate - Step size for gradient descent.
 * @param regularizationRate - λ scaling factor for regularization penalty.
 *
 * SRS §3.4, §4.1, §14.3, §43, P1.16
 */
export declare function updateWeights(network: Node[][], learningRate: number, regularizationRate: number): void;
//# sourceMappingURL=nn.d.ts.map