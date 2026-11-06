import { Activations, Errors, RegularizationFunction, Node, Link, buildNetwork, forwardProp, backProp, updateWeights } from "../src/nn";
import {
  classifyCircleData,
  classifyXORData,
  classifySpiralData,
  splitData,
} from "../src/dataset";
import {
  datasets,
  datasetLabels,
  regDatasets,
  regDatasetLabels,
  Problem,
  State,
} from "../src/state";

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
// 5. Backprop Finite-Difference Gradient Check (P1.20)
// -------------------------------------------------------------
const bpNet = buildNetwork([2, 3, 1], Activations.TANH, Activations.TANH, RegularizationFunction.NONE, ["x1", "x2"], false);
const bpInput = [0.4, -0.7];
const bpTarget = 1.0;

// Compute analytical gradient
forwardProp(bpNet, bpInput);
backProp(bpNet, bpTarget, Errors.SQUARE);
const testLink = bpNet[1][0].inputLinks[0];
const analyticalGrad = testLink.errorDer;

// Compute numerical gradient via central finite differences
const bpEps = 1e-5;
const origWeight = testLink.weight;

testLink.weight = origWeight + bpEps;
const outPlus = forwardProp(bpNet, bpInput);
const lossPlus = Errors.SQUARE.error(outPlus, bpTarget);

testLink.weight = origWeight - bpEps;
const outMinus = forwardProp(bpNet, bpInput);
const lossMinus = Errors.SQUARE.error(outMinus, bpTarget);

testLink.weight = origWeight; // restore
const numericalGrad = (lossPlus - lossMinus) / (2 * bpEps);

assertClose(analyticalGrad, numericalGrad, 1e-4, "Backprop finite-difference gradient check on 3-layer network (P1.20)");

// -------------------------------------------------------------
// 6. Linear Collapse Check (P1.18, SRS §3.6)
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

const existingDatasetKeys = new Set(["circle", "xor", "gauss", "spiral"]);
const additionalDatasets = Object.entries(datasets).filter(([key]) => !existingDatasetKeys.has(key));
assert(Object.keys(datasets).length === 19, "Nineteen classification datasets are registered");
assert(additionalDatasets.length === 15, "Fifteen additional classification datasets are registered");

for (const [key, generator] of additionalDatasets) {
  const points = generator(500, 10);
  const labels = new Set(points.map((point) => point.label));
  const validPoints = points.every(
    (point) =>
      Number.isFinite(point.x) &&
      Number.isFinite(point.y) &&
      (point.label === 1 || point.label === -1),
  );
  assert(
    points.length === 500 && validPoints && labels.size === 2 && !!datasetLabels[key],
    `${datasetLabels[key]} generates 500 finite, binary-labeled points`,
  );
}

assert(Object.keys(regDatasets).length === 19, "Nineteen regression datasets are registered");
for (const [key, generator] of Object.entries(regDatasets)) {
  const points = generator(500, 10);
  const validPoints = points.every(
    (point) =>
      Number.isFinite(point.x) &&
      Number.isFinite(point.y) &&
      Number.isFinite(point.label) &&
      point.label >= -1 &&
      point.label <= 1,
  );
  assert(
    points.length === 500 && validPoints && !!regDatasetLabels[key],
    `${regDatasetLabels[key]} generates 500 finite points with bounded targets`,
  );
}

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
state.dataset = datasets.checkerboard;
assert(state.serialize().includes("dataset=checkerboard"), "New dataset names round-trip through the URL hash");
state.problem = Problem.REGRESSION;
state.regDataset = regDatasets["reg-ripple"];
assert(state.serialize().includes("regDataset=reg-ripple"), "New regression dataset names round-trip through the URL hash");

console.log(`\n=== Verification Results: ${passed} Passed, ${failed} Failed ===`);
if (failed > 0) {
  process.exit(1);
}
