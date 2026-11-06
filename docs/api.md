# 📚 DeepRoxx API Reference

> **Project:** DeepRoxx  
> **Source of Truth:** `SRS.md` §58  
> **Roadmap Reference:** Phase 9 (P9.30) & Phase 12 (P12.14)

---

## 1. Mathematical Core: `src/nn.ts`

| Export | Type | Signature | Description |
| :--- | :--- | :--- | :--- |
| `Node` | Class | `constructor(id: string, activation: ActivationFunction, initZero?: boolean)` | Represents a single artificial neuron with forward and backward gradient accumulators. |
| `Link` | Class | `constructor(source: Node, dest: Node, regularization: RegularizationFunction, initZero?: boolean)` | Represents a weighted synapse connection between two neurons. |
| `Activations` | Class/Object | `.TANH`, `.RELU`, `.SIGMOID`, `.LINEAR` | Static activation function objects containing forward `output(x)` and derivative `der(x)`. |
| `RegularizationFunction` | Interface/Class | `.L1`, `.L2`, `.NONE` | Static penalty implementations containing penalty `output(w)` and gradient `der(w)`. |
| `Errors` | Class/Object | `.SQUARE` | Loss function implementation containing error calculation and output gradient. |
| `buildNetwork` | Function | `(shape: number[], act, outAct, reg, inputIds: string[], initZero?) => Node[][]` | Dynamically instantiates and interconnects layers of nodes and links. |
| `forwardProp` | Function | `(network: Node[][], inputs: number[]) => number` | Executes forward pass layer by layer, returning the final scalar prediction. |
| `backProp` | Function | `(network: Node[][], target: number, errorFunc: ErrorFunction) => void` | Backpropagates output error to compute and accumulate parameter gradients. |
| `updateWeights` | Function | `(network: Node[][], lr: number, regRate: number) => void` | Updates weights and biases with averaged batch gradients and applies L1/L2 regularization. |

---

## 2. Dataset Engine: `src/dataset.ts`

| Export | Type | Signature | Description |
| :--- | :--- | :--- | :--- |
| `Example2D` | Interface | `{ x: number; y: number; label: number }` | Data structure representing a single labeled 2D data sample. |
| `DataGenerator` | Type | `(numSamples: number, noise: number) => Example2D[]` | Common type signature for all 2D data generation functions. |
| `normalRandom` | Function | `(mean?: number, variance?: number) => number` | Samples numbers from a Gaussian distribution via Box-Muller rejection sampling. |
| `shuffle` | Function | `(array: any[]) => void` | Performs an in-place Fisher-Yates array permutation. |
| `splitData` | Function | `(data: Example2D[], percTrain: number) => [Example2D[], Example2D[]]` | Deterministically partitions a dataset into training and testing slices. |
| `classifyCircleData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates concentric circle classification data. |
| `classifyXORData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates 4-quadrant XOR classification data. |
| `classifyTwoGaussData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates two-cluster Gaussian classification data. |
| `classifySpiralData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates two interlocking Archimedean spiral arms. |
| `classifyMoonsData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates two interleaving half-moon classes. |
| `classifyCheckerboardData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates alternating square cells in a checkerboard pattern. |
| `classifyFourGaussData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates four Gaussian clusters with alternating diagonal labels. |
| `classifySixClustersData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates six Gaussian clusters arranged around the origin. |
| `classifyVerticalStripesData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates vertical alternating bands. |
| `classifyHorizontalStripesData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates horizontal alternating bands. |
| `classifyDiagonalStripesData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates alternating diagonal bands. |
| `classifySineWaveData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates points separated by a sinusoidal decision boundary. |
| `classifyParabolaData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates points separated by a parabolic decision boundary. |
| `classifyRadialSectorsData` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates alternating positive and negative angular sectors. |
| `regressPlane` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates continuous planar regression data ($z = \frac{x+y}{12}$). |
| `regressGaussian` | Function | `(numSamples: number, noise: number) => Example2D[]` | Generates multi-peaked continuous RBF regression data. |

---

## 3. Configuration & State: `src/state.ts`

| Export | Type | Signature | Description |
| :--- | :--- | :--- | :--- |
| `State` | Class | Instance | Global application configuration container mapping to UI controls and URL hash. |
| `Problem` | Enum | `CLASSIFICATION = 'classification'`, `REGRESSION = 'regression'` | Task type discriminator. |
| `Type` | Enum | `STRING`, `NUMBER`, `ARRAY_NUMBER`, `ARRAY_STRING`, `BOOLEAN`, `OBJECT` | Serialization type descriptors. |
| `activations` | Object | `{ relu, tanh, sigmoid, linear }` | Key-to-object map for activation functions. |
| `regularizations` | Object | `{ none, L1, L2 }` | Key-to-object map for regularization functions. |
| `datasets` | Object | `{ circle, xor, gauss, spiral, moons, checkerboard, ... }` | Key-to-function map for 14 classification data generators. |
| `regDatasets` | Object | `{ 'reg-plane', 'reg-gauss' }` | Key-to-function map for regression data generators. |
| `State.deserializeState` | Static Method | `() => State` | Parses `window.location.hash` and reconstructs configured state. |
| `State.prototype.serialize` | Method | `() => string` | Encodes current state properties into a URI hash string and updates browser location. |

---

## 4. Visualizations: `src/heatmap.ts` & `src/linechart.ts`

| Export | Module | Signature | Description |
| :--- | :--- | :--- | :--- |
| `COLOR_SCALE` | `heatmap.ts` | `d3.scale.linear()` | D3 continuous color scale mapping $[-1, 0, 1] \to [\text{orange}, \text{grey}, \text{blue}]$. |
| `HeatMap` | `heatmap.ts` | `constructor(container, numCells = 30)` | Canvas 2D rasterizer for decision boundary backgrounds and overlaid data points. |
| `AppendingLineChart` | `linechart.ts` | `constructor(container, _xLabel?, _yLabel?)` | D3 SVG line chart managing real-time auto-scaling loss history curves. |
| `addDataPoint` | `linechart.ts` | `(values: [number, number]) => void` | Appends training and testing loss values and triggers SVG path redraw. |
| `reset` | `linechart.ts` | `() => void` | Clears historical loss arrays and resets coordinate scales. |
