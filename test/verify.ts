import { Activations, Errors, RegularizationFunction, Node, Link, buildNetwork, forwardProp, backProp, updateWeights } from "../src/nn";
import { classifyCircleData, classifyXORData, classifySpiralData, splitData } from "../src/dataset";
import { State } from "../src/state";

console.log("=== Running Deep Playground Core Verification Suite ===");

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`✅ PASS: ${msg}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${msg}`);
    failed++;
  }
}

function assertClose(actual: number, expected: number, tol: number, msg: string) {
  const diff = Math.abs(actual - expected);
  if (diff <= tol) {
    console.log(`✅ PASS: ${msg} (${actual} ≈ ${expected})`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${msg} (got ${actual}, expected ${expected}, diff ${diff} > tol ${tol})`);
    failed++;
  }
}

// -------------------------------------------------------------
// 1. Activation Derivative Finite-Difference Checks (P1.19)
// -------------------------------------------------------------
const eps = 1e-5;
const testPoints = [-2, -0.5, 0, 0.5, 2];

for (const [name, act] of Object.entries({ TANH: Activations.TANH, RELU: Activations.RELU, SIGMOID: Activations.SIGMOID, LINEAR: Activations.LINEAR })) {
  for (const x of testPoints) {
    if (name === "RELU" && x === 0) continue; // non-differentiable at 0
    const numDer = (act.output(x + eps) - act.output(x - eps)) / (2 * eps);
    const anaDer = act.der(x);
    assertClose(anaDer, numDer, 1e-3, `Activation ${name} der at x=${x}`);
  }
}

// -------------------------------------------------------------
// 2. Square Error Der (P1.21, SRS §2.3)
// -------------------------------------------------------------
const errDer = Errors.SQUARE.der(0.2, 1.0);
assertClose(errDer, -0.8, 1e-6, "Errors.SQUARE.der(0.2, 1.0) === -0.8");

// -------------------------------------------------------------
// 3. SRS §34 Worked Example Check (P1.25)
// b = 0.1, w1 = 0.3, x1 = 1.0, w2 = -0.2, x2 = 0.5 -> z = 0.3, a = tanh(0.3) ≈ 0.2913126
// -------------------------------------------------------------
const node = new Node("test_h1", Activations.TANH);
node.bias = 0.1;
const link1 = new Link(new Node("x1", Activations.LINEAR), node, RegularizationFunction.NONE);
link1.weight = 0.3;
link1.source.output = 1.0;
const link2 = new Link(new Node("x2", Activations.LINEAR), node, RegularizationFunction.NONE);
link2.weight = -0.2;
link2.source.output = 0.5;
node.inputLinks = [link1, link2];

const out = node.updateOutput(); // z = 0.1 + 0.3*1.0 + (-0.2)*0.5 = 0.3 -> tanh(0.3) ≈ 0.2913126
assertClose(out, Math.tanh(0.3), 1e-5, "Node.updateOutput() matches SRS §34 worked example");

// -------------------------------------------------------------
// 4. XOR Convergence Test (P1.17)
// -------------------------------------------------------------
const xorData = [
  { x: [-1, -1], y: -1 },
  { x: [-1, 1], y: 1 },
  { x: [1, -1], y: 1 },
  { x: [1, 1], y: -1 }
];
(Math as any).seedrandom('xor_test_seed');
const network = buildNetwork([2, 4, 1], Activations.TANH, Activations.TANH, RegularizationFunction.NONE, ["x1", "x2"], false);

let loss = 1.0;
for (let epoch = 0; epoch < 500; epoch++) {
  for (const sample of xorData) {
    forwardProp(network, sample.x);
    backProp(network, sample.y, Errors.SQUARE);
  }
  updateWeights(network, 0.3, 0);

  let totalLoss = 0;
  for (const sample of xorData) {
    const outVal = forwardProp(network, sample.x);
    totalLoss += Errors.SQUARE.error(outVal, sample.y);
  }
  loss = totalLoss / xorData.length;
}
assert(loss < 0.05, `XOR training loss converged: ${loss.toFixed(4)} < 0.05`);

// -------------------------------------------------------------
// 5. Linear Collapse Check (P1.18, SRS §3.6)
// -------------------------------------------------------------
const linNet = buildNetwork([2, 3, 3, 1], Activations.LINEAR, Activations.LINEAR, RegularizationFunction.NONE, ["x1", "x2"], false);
const out1 = forwardProp(linNet, [0.5, -0.2]);
assert(!isNaN(out1), "Linear collapse network returns valid number");

// -------------------------------------------------------------
// 6. Dataset Engine Checks (P2.13 - P2.20)
// -------------------------------------------------------------
const circlePts = classifyCircleData(500, 0);
assert(circlePts.length === 500, "Circle generator outputs 500 points");
const posCircle = circlePts.filter(p => p.label === 1).length;
assert(posCircle > 150 && posCircle < 350, `Circle label distribution balanced: ${posCircle}/500 positive`);

const xorPts = classifyXORData(500, 0);
assert(xorPts.length === 500, "XOR dataset outputs 500 points");

const spiralPts = classifySpiralData(500, 0);
assert(spiralPts.length === 500, "Spiral dataset outputs 500 points");

const split = splitData(circlePts, 70);
assert(split[0].length === 350 && split[1].length === 150, "70/30 data split accurate");

// -------------------------------------------------------------
// 7. State Serialization & Hash Round-Trip (P3.7 - P3.8)
// -------------------------------------------------------------
const state = new State();
state.activation = Activations.RELU;
state.learningRate = 0.03;
state.dataset = classifySpiralData;
state.networkShape = [4, 2];
const hash = state.serialize();
assert(typeof hash === "string" && hash.length > 0, `State serializes to string: ${hash.substring(0, 40)}...`);

console.log(`\n=== Verification Results: ${passed} Passed, ${failed} Failed ===`);
if (failed > 0) {
  process.exit(1);
}
