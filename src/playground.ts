/* ============================================================
 * playground.ts — Main Orchestrator: Events, Training Loop, D3
 * SRS §4.4, §7, §8, §15, §17, §20, §31, §38, §39, §42, §49, §50
 * Roadmap: Phase 4 (P4), Phase 5 (P5), Phase 7 (P7), Phase 8 (P8)
 * ============================================================ */

import * as d3 from 'd3';
import * as nn from './nn';
import * as dataset from './dataset';
import { State, Problem, activations, regularizations, datasets, regDatasets } from './state';
import { HeatMap, COLOR_SCALE } from './heatmap';
import { AppendingLineChart } from './linechart';

// Import stylesheet — Webpack injects this into <head> via style-loader
import '../styles.css';

// ─────────────────────────────────────────────────────────────
// SECTION 1: Feature Definitions (SRS §38)
// ─────────────────────────────────────────────────────────────

/**
 * Defines a single input feature transformation.
 * Each feature maps raw (x, y) coordinates to a scalar value.
 * SRS §38.2, §38.3, P7.7 – P7.8
 */
interface Feature {
  /** Unique feature name, matches the state property name. */
  name: string;
  /** Human-readable label displayed in the UI. */
  label: string;
  /** The transformation function applied to raw coordinates. */
  fn: (x: number, y: number) => number;
}

/**
 * All 7 supported input features.
 * The order determines the input layer node order.
 * SRS §38.2, P7.7
 */
const FEATURES: Feature[] = [
  { name: 'x',       label: 'X₁',           fn: (x, _y) => x },
  { name: 'y',       label: 'X₂',           fn: (_x, y) => y },
  { name: 'xSquared', label: 'X₁²',          fn: (x, _y) => x * x },
  { name: 'ySquared', label: 'X₂²',          fn: (_x, y) => y * y },
  { name: 'xTimesY', label: 'X₁X₂',          fn: (x, y) => x * y },
  { name: 'sinX',    label: 'sin(X₁)',        fn: (x, _y) => Math.sin(x) },
  { name: 'sinY',    label: 'sin(X₂)',        fn: (_x, y) => Math.sin(y) },
];

// ─────────────────────────────────────────────────────────────
// SECTION 2: Application State (SRS §4.4)
// ─────────────────────────────────────────────────────────────

/** Loaded/active application configuration state. */
let state: State;

/** The current neural network (2D array of Nodes). */
let network: nn.Node[][];

/** Training dataset (after split). */
let trainData: dataset.Example2D[] = [];

/** Test dataset (after split). */
let testData: dataset.Example2D[] = [];

/** Whether the simulation loop is actively running. */
let isRunning: boolean = false;

/** Current training step (epoch) counter. */
let iter: number = 0;

/** Current training loss (computed over all trainData). */
let lossTrain: number = 0;

/** Current test loss (computed over all testData). */
let lossTest: number = 0;

/** The heatmap visualization renderer. */
let heatMap: HeatMap;

/** The loss curve chart renderer. */
let lineChart: AppendingLineChart;

// ─────────────────────────────────────────────────────────────
// SECTION 3: Feature Input Builder (SRS §38.3)
// ─────────────────────────────────────────────────────────────

/**
 * Builds the feature input vector for a given (x, y) data point.
 * Only includes features that are toggled ON in the current state.
 * The feature IDs are used to name the input layer nodes in buildNetwork.
 *
 * @param x - Raw x coordinate.
 * @param y - Raw y coordinate.
 * @returns A number array of active feature values.
 * SRS §38.3, P7.7
 */
function constructInput(x: number, y: number): number[] {
  return FEATURES.filter((f) => (state as any)[f.name]).map((f) => f.fn(x, y));
}

function getActiveFeatureIds(): string[] {
  return FEATURES.filter((f) => (state as any)[f.name]).map((f) => f.name);
}

function generateData(): void {
  const gen = state.problem === Problem.REGRESSION ? state.regDataset : state.dataset;
  const rawData = gen(500, state.noise);
  [trainData, testData] = dataset.splitData(rawData, state.percTrainData);
}

function getBatch(): dataset.Example2D[] {
  const batchSize = Math.min(state.batchSize, trainData.length);
  dataset.shuffle(trainData);
  return trainData.slice(0, batchSize);
}

function getLoss(net: nn.Node[][], data: dataset.Example2D[]): number {
  if (!data || data.length === 0) return 0;
  let totalLoss = 0;
  for (const sample of data) {
    const inputs = constructInput(sample.x, sample.y);
    const output = nn.forwardProp(net, inputs);
    totalLoss += nn.Errors.SQUARE.error(output, sample.label);
  }
  return totalLoss / data.length;
}

function resetNetwork(): void {
  iter = 0;
  lossTrain = 0;
  lossTest = 0;
  if (lineChart) lineChart.reset();
  const featureIds = getActiveFeatureIds();
  const inputSize = Math.max(1, featureIds.length);
  const shape = [inputSize, ...state.networkShape, 1];
  network = nn.buildNetwork(
    shape,
    state.activation,
    state.problem === Problem.REGRESSION ? nn.Activations.LINEAR : nn.Activations.TANH,
    state.regularization,
    featureIds.length > 0 ? featureIds : ['x'],
  );
  updateUI();
  drawNetwork(network);
}

function oneStep(): void {
  iter++;
  const batch = getBatch();
  for (const sample of batch) {
    const inputs = constructInput(sample.x, sample.y);
    nn.forwardProp(network, inputs);
    nn.backProp(network, sample.label, nn.Errors.SQUARE);
  }
  nn.updateWeights(network, state.learningRate, state.regularizationRate);
  lossTrain = getLoss(network, trainData);
  lossTest = getLoss(network, testData);
  if (lineChart) lineChart.addDataPoint([lossTrain, lossTest]);
  updateUI();
  drawNetwork(network);
  if (isRunning) {
    requestAnimationFrame(oneStep);
  }
}

function updateUI(): void {
  const iterEl = document.getElementById('iter-number');
  if (iterEl) iterEl.textContent = String(iter);

  const lossTrainEl = document.getElementById('loss-train');
  if (lossTrainEl) lossTrainEl.textContent = lossTrain.toFixed(3);

  const lossTestEl = document.getElementById('loss-test');
  if (lossTestEl) lossTestEl.textContent = lossTest.toFixed(3);

  if (heatMap && network) {
    heatMap.updateBackground(
      network,
      constructInput,
      trainData,
      testData,
      state.showTestData,
      state.discretize,
    );
  }
}

function buildLinkPath(x1: number, y1: number, x2: number, y2: number): string {
  const dx = (x2 - x1) * 0.4;
  return `M ${x1},${y1} C ${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
}

function drawNetwork(net: nn.Node[][]): void {
  const svgSel = d3.select('#svg');
  if (svgSel.empty() || !net) return;

  const svgNode = svgSel.node() as SVGSVGElement;
  const width = svgNode ? svgNode.clientWidth || 500 : 500;
  const height = svgNode ? svgNode.clientHeight || 400 : 400;

  svgSel.selectAll('*').remove();

  const numLayers = net.length;
  const padX = 50;
  const layerSpacing = (width - 2 * padX) / Math.max(1, numLayers - 1);

  const nodePos: { [id: string]: { x: number; y: number } } = {};

  for (let l = 0; l < numLayers; l++) {
    const layer = net[l];
    const x = padX + l * layerSpacing;
    const numNodes = layer.length;
    const nodeSpacing = 40;
    const startY = height / 2 - ((numNodes - 1) * nodeSpacing) / 2;

    for (let n = 0; n < numNodes; n++) {
      const node = layer[n];
      const y = startY + n * nodeSpacing;
      nodePos[node.id] = { x, y };
    }
  }

  // Draw links
  const linksGroup = svgSel.append('g').attr('class', 'links');
  for (let l = 1; l < numLayers; l++) {
    for (const node of net[l]) {
      for (const link of node.inputLinks) {
        if (link.isDead) continue;
        const sourceP = nodePos[link.source.id];
        const destP = nodePos[link.dest.id];
        if (sourceP && destP) {
          const pathStr = buildLinkPath(sourceP.x, sourceP.y, destP.x, destP.y);
          const colorStr = COLOR_SCALE(link.weight);
          const widthVal = Math.max(0.5, Math.abs(link.weight) * 3);
          linksGroup
            .append('path')
            .attr('d', pathStr)
            .attr('fill', 'none')
            .attr('stroke', colorStr)
            .attr('stroke-width', widthVal)
            .attr('opacity', 0.8);
        }
      }
    }
  }

  // Draw nodes
  const nodesGroup = svgSel.append('g').attr('class', 'nodes');
  for (let l = 0; l < numLayers; l++) {
    for (const node of net[l]) {
      const pos = nodePos[node.id];
      if (pos) {
        const colorStr = COLOR_SCALE(node.output);
        const gNode = nodesGroup
          .append('g')
          .attr('transform', `translate(${pos.x},${pos.y})`);

        gNode
          .append('circle')
          .attr('r', 12)
          .attr('fill', colorStr)
          .attr('stroke', '#1d1d1f') // DESIGN.md colors.ink
          .attr('stroke-width', 1);
      }
    }
  }
}

/** Sync the sub-nav primary CTA label with the training state. */
function updatePlayButton(): void {
  const btn = document.getElementById('play-pause-button');
  if (!btn) return;
  btn.textContent = isRunning ? 'Pause' : 'Play';
  btn.setAttribute('aria-pressed', String(isRunning));
}

function bindEventListeners(): void {
  const playBtn = d3.select('#play-pause-button');
  if (!playBtn.empty()) {
    playBtn.on('click', () => {
      isRunning = !isRunning;
      updatePlayButton();
      if (isRunning) requestAnimationFrame(oneStep);
    });
  }

  const stepBtn = d3.select('#next-step-button');
  if (!stepBtn.empty()) {
    stepBtn.on('click', () => {
      if (!isRunning) oneStep();
    });
  }

  const resetBtn = d3.select('#reset-button');
  if (!resetBtn.empty()) {
    resetBtn.on('click', () => {
      isRunning = false;
      updatePlayButton();
      generateData();
      resetNetwork();
      state.seed = '';
      state.serialize();
    });
  }

  const addLayerBtn = d3.select('#add-layers');
  if (!addLayerBtn.empty()) {
    addLayerBtn.on('click', () => {
      if (state.networkShape.length < 6) {
        state.networkShape.push(2);
        resetNetwork();
      }
    });
  }

  const removeLayerBtn = d3.select('#remove-layers');
  if (!removeLayerBtn.empty()) {
    removeLayerBtn.on('click', () => {
      if (state.networkShape.length > 0) {
        state.networkShape.pop();
        resetNetwork();
      }
    });
  }
}

function init(): void {
  state = State.deserializeState();

  const heatmapContainer = d3.select('#heatmap');
  if (!heatmapContainer.empty()) {
    heatMap = new HeatMap(heatmapContainer);
  }

  const linechartContainer = d3.select('#linechart');
  if (!linechartContainer.empty()) {
    lineChart = new AppendingLineChart(linechartContainer);
  }

  generateData();
  resetNetwork();
  bindEventListeners();
}

document.addEventListener('DOMContentLoaded', init);

