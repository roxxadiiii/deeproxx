/* ============================================================
 * nn.ts — Mathematical Core: Nodes, Links, Backpropagation
 * SRS §3, §4.1, §14, §25, §26, §43, §51
 * Roadmap: Phase 1 (P1.1 – P1.25)
 * ============================================================ */

// ─────────────────────────────────────────────────────────────
// SECTION 1: Core Interfaces  (SRS §51.2)
// ─────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────
// SECTION 2: Activation Functions (SRS §3.2)
// ─────────────────────────────────────────────────────────────

/**
 * Collection of all built-in activation functions.
 * Each implements the ActivationFunction interface.
 * SRS §3.2.1–§3.2.4, P1.2–P1.5
 */
export class Activations {
  /**
   * Hyperbolic Tangent — squashes input to (-1, 1).
   * output: tanh(x)
   * derivative: 1 - tanh²(x)         (SRS §3.2.1)
   */
  public static TANH: ActivationFunction = {
    output: (x: number) => Math.tanh(x),
    der: (x: number) => {
      const o = Math.tanh(x);
      return 1 - o * o;
    },
  };

  /**
   * Rectified Linear Unit — replaces negatives with 0.
   * output: max(0, x)
   * derivative: 0 if x ≤ 0, else 1   (SRS §3.2.2)
   */
  public static RELU: ActivationFunction = {
    output: (x: number) => Math.max(0, x),
    der: (x: number) => (x <= 0 ? 0 : 1),
  };

  /**
   * Sigmoid — squashes input to (0, 1).
   * output: 1 / (1 + e^-x)
   * derivative: σ(x) * (1 - σ(x))    (SRS §3.2.3)
   */
  public static SIGMOID: ActivationFunction = {
    output: (x: number) => 1 / (1 + Math.exp(-x)),
    der: (x: number) => {
      const o = 1 / (1 + Math.exp(-x));
      return o * (1 - o);
    },
  };

  /**
   * Linear — passes input directly through (identity).
   * output: x
   * derivative: 1                     (SRS §3.2.4)
   */
  public static LINEAR: ActivationFunction = {
    output: (x: number) => x,
    der: (_x: number) => 1,
  };
}

// ─────────────────────────────────────────────────────────────
// SECTION 3: Error / Loss Functions (SRS §3.3, §25)
// ─────────────────────────────────────────────────────────────

/**
 * Built-in error/loss functions.
 * SRS §3.3, §25.1, P1.6
 */
export class Errors {
  /**
   * Square Loss: E = ½(output - target)²
   * derivative: ∂E/∂output = output - target   (SRS §3.3)
   */
  public static SQUARE: ErrorFunction = {
    error: (output: number, target: number) => 0.5 * Math.pow(output - target, 2),
    der: (output: number, target: number) => output - target,
  };
}

// ─────────────────────────────────────────────────────────────
// SECTION 4: Regularization Functions (SRS §3.5)
// ─────────────────────────────────────────────────────────────

/**
 * Built-in regularization penalty functions.
 * SRS §3.5, P1.7–P1.8
 */
export class RegularizationFunction {
  /**
   * L1 Lasso: R(w) = |w|, R'(w) = sign(w)
   * Drives weights to exactly 0 — creating sparse networks.  (SRS §3.5)
   */
  public static L1: RegularizationFunction = {
    output: (w: number) => Math.abs(w),
    der: (w: number) => (w < 0 ? -1 : w > 0 ? 1 : 0),
  };

  /**
   * L2 Ridge: R(w) = ½w², R'(w) = w
   * Keeps weights small but never zeros them.               (SRS §3.5)
   */
  public static L2: RegularizationFunction = {
    output: (w: number) => 0.5 * w * w,
    der: (w: number) => w,
  };

  /** No regularization — null object pattern. */
  public static NONE: RegularizationFunction = {
    output: (_w: number) => 0,
    der: (_w: number) => 0,
  };
}

// ─────────────────────────────────────────────────────────────
// SECTION 5: Node (Neuron) Class (SRS §4.1)
// ─────────────────────────────────────────────────────────────

/**
 * Represents a single neuron in the network.
 * Stores forward-pass values and gradient accumulators for backprop.
 * SRS §4.1, §51.3, P1.9–P1.10
 */
export class Node {
  /** Unique identifier string for this node. */
  id: string;

  /** Incoming connection weights from the previous layer. */
  inputLinks: Link[] = [];

  /** Outgoing connection weights to the next layer. */
  outputs: Link[] = [];

  /** Bias term b_i^(L). Initialized to 0.1 (or 0 if initZero). */
  bias: number = 0.1;

  /**
   * Pre-activation weighted sum:
   * z = b + Σ(w_ji · a_j)    (SRS §3.1)
   */
  totalInput: number = 0;

  /**
   * Post-activation output:
   * a = σ(z)                 (SRS §3.1)
   */
  output: number = 0;

  /**
   * Gradient of the loss w.r.t. this node's output:
   * ∂E/∂a                   (SRS §3.4)
   */
  outputDer: number = 0;

  /**
   * Gradient of the loss w.r.t. this node's pre-activation input:
   * δ_i^(L) = ∂E/∂z         (SRS §3.4)
   */
  inputDer: number = 0;

  /**
   * Accumulates inputDer across a mini-batch.
   * Reset after each weight update.
   */
  accInputDer: number = 0;

  /** Number of samples accumulated in the current batch. */
  numAccumulatedDers: number = 0;

  /** The activation function assigned to this node. */
  activation: ActivationFunction;

  /**
   * Constructs a new Node.
   * @param id - Unique identifier string.
   * @param activation - The activation function for this node.
   * @param initZero - If true, biases are initialized to 0 instead of 0.1.
   */
  constructor(id: string, activation: ActivationFunction, initZero?: boolean) {
    this.id = id;
    this.activation = activation;
    // SRS §26.2: bias initialized to 0.1 unless initZero is set
    this.bias = initZero ? 0 : 0.1;
  }

  /**
   * Computes the forward pass for this node.
   * z = b + Σ(w_ji · a_j), then a = σ(z).
   * SRS §3.1, §14.1, P1.10
   *
   * @returns The activated output `a`.
   */
  updateOutput(): number {
    // Step 1: Start with bias
    this.totalInput = this.bias;
    // Step 2: Sum weighted inputs from all non-dead incoming links
    for (const link of this.inputLinks) {
      if (link.isDead) continue;
      this.totalInput += link.weight * link.source.output;
    }
    // Step 3: Apply activation function
    this.output = this.activation.output(this.totalInput);
    return this.output;
  }
}

// ─────────────────────────────────────────────────────────────
// SECTION 6: Link (Synapse) Class (SRS §4.1)
// ─────────────────────────────────────────────────────────────

/**
 * Represents a weighted connection (synapse) between two neurons.
 * SRS §4.1, §51.4, §43, P1.11–P1.12
 */
export class Link {
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
  isDead: boolean = false;

  /**
   * Gradient of the loss w.r.t. this link's weight:
   * ∂E/∂w = δ_dest · a_source    (SRS §3.4)
   */
  errorDer: number = 0;

  /**
   * Accumulated errorDer across a mini-batch.
   * Reset after each weight update.
   */
  accErrorDer: number = 0;

  /** Number of samples accumulated in the current batch. */
  numAccumulatedDers: number = 0;

  /** The regularization function applied to this link's weight. */
  regularization: RegularizationFunction;

  /**
   * Constructs a new Link.
   * @param source - The upstream node.
   * @param dest - The downstream node.
   * @param regularization - The regularization function (or NONE).
   * @param initZero - If true, weight is initialized to 0.
   */
  constructor(
    source: Node,
    dest: Node,
    regularization: RegularizationFunction,
    initZero?: boolean,
  ) {
    this.id = `${source.id}-${dest.id}`;
    this.source = source;
    this.dest = dest;
    this.regularization = regularization;
    // SRS §26.2: random init in [-0.5, 0.5]
    this.weight = initZero ? 0 : Math.random() - 0.5;
  }
}

// ─────────────────────────────────────────────────────────────
// SECTION 7: Core Engine Functions (SRS §4.1)
// ─────────────────────────────────────────────────────────────

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
export function buildNetwork(
  networkShape: number[],
  activation: ActivationFunction,
  outputActivation: ActivationFunction,
  regularization: RegularizationFunction,
  inputIds: string[],
  initZero?: boolean,
): Node[][] {
  const numLayers = networkShape.length;
  const network: Node[][] = [];

  for (let layerIdx = 0; layerIdx < numLayers; layerIdx++) {
    const isOutputLayer = layerIdx === numLayers - 1;
    const isInputLayer = layerIdx === 0;
    const currentLayer: Node[] = [];
    network.push(currentLayer);

    const numNodes = networkShape[layerIdx];
    for (let nodeIdx = 0; nodeIdx < numNodes; nodeIdx++) {
      // Determine node ID
      const nodeId = isInputLayer ? inputIds[nodeIdx] : `${layerIdx}_${nodeIdx}`;
      // Determine activation function
      const nodeActivation = isOutputLayer ? outputActivation : activation;
      // Create node
      const node = new Node(nodeId, nodeActivation, initZero);
      currentLayer.push(node);

      // Connect to all nodes in the previous layer
      if (layerIdx > 0) {
        const prevLayer = network[layerIdx - 1];
        for (const prevNode of prevLayer) {
          const link = new Link(prevNode, node, regularization, initZero);
          prevNode.outputs.push(link);
          node.inputLinks.push(link);
        }
      }
    }
  }

  return network;
}

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
export function forwardProp(network: Node[][], inputs: number[]): number {
  // Assign inputs to the input layer nodes
  const inputLayer = network[0];
  for (let i = 0; i < inputLayer.length; i++) {
    inputLayer[i].output = inputs[i];
  }

  // Forward pass through hidden layers and output layer
  for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
    for (const node of network[layerIdx]) {
      node.updateOutput();
    }
  }

  // Return output of the final layer's single node
  return network[network.length - 1][0].output;
}

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
export function backProp(
  network: Node[][],
  target: number,
  errorFunc: ErrorFunction,
): void {
  // Step 1: Output layer — compute ∂E/∂output for the final node
  const outputLayer = network[network.length - 1];
  const outputNode = outputLayer[0];
  outputNode.outputDer = errorFunc.der(outputNode.output, target);

  // Step 2: Backward pass through all layers (output → first hidden)
  for (let layerIdx = network.length - 1; layerIdx >= 1; layerIdx--) {
    const currentLayer = network[layerIdx];

    for (const node of currentLayer) {
      // δ = ∂E/∂output · σ'(z)
      node.inputDer = node.outputDer * node.activation.der(node.totalInput);
      node.accInputDer += node.inputDer;
      node.numAccumulatedDers++;

      // Backpropagate through input links
      for (const link of node.inputLinks) {
        if (link.isDead) continue;

        // ∂E/∂w = δ · a_source
        link.errorDer = node.inputDer * link.source.output;
        link.accErrorDer += link.errorDer;
        link.numAccumulatedDers++;

        // Propagate error to previous layer node
        // (don't propagate into the input layer itself — layerIdx > 1)
        link.source.outputDer += link.weight * node.inputDer;
      }
    }
  }

  // Reset outputDer for all nodes (for next sample)
  for (let layerIdx = 0; layerIdx < network.length; layerIdx++) {
    for (const node of network[layerIdx]) {
      node.outputDer = 0;
    }
  }
}

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
export function updateWeights(
  network: Node[][],
  learningRate: number,
  regularizationRate: number,
): void {
  // Update layers starting from the first hidden layer (skip input layer)
  for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
    for (const node of network[layerIdx]) {
      // Update bias using averaged gradient
      if (node.numAccumulatedDers > 0) {
        node.bias -= learningRate * (node.accInputDer / node.numAccumulatedDers);
      }
      node.accInputDer = 0;
      node.numAccumulatedDers = 0;

      // Update each incoming link weight
      for (const link of node.inputLinks) {
        if (link.isDead) continue;

        if (link.numAccumulatedDers > 0) {
          const avgGrad = link.accErrorDer / link.numAccumulatedDers;
          // Compute regularization derivative
          const regulDer =
            regularizationRate > 0
              ? link.regularization.der(link.weight)
              : 0;

          const oldWeight = link.weight;
          const newWeight =
            oldWeight -
            learningRate * avgGrad -
            learningRate * regularizationRate * regulDer;

          // L1 zero-crossing kill (SRS §43): if L1 regularization is active and sign changed, set weight to 0 and mark dead
          if (
            regularizationRate > 0 &&
            link.regularization === RegularizationFunction.L1 &&
            oldWeight * newWeight < 0
          ) {
            link.weight = 0;
            link.isDead = true;
          } else {
            link.weight = newWeight;
          }
        }

        link.accErrorDer = 0;
        link.numAccumulatedDers = 0;
      }
    }
  }
}
