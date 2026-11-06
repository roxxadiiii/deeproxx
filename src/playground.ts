/* ============================================================
 * playground.ts — Main Orchestrator: Events, Training Loop, D3
 * SRS §4.4, §7, §8, §15, §17, §20, §31, §38, §39, §42, §44, §49, §50, §55
 * Roadmap: Phase 4 (P4), Phase 5 (P5), Phase 7 (P7), Phase 8 (P8), Phase 13 (P13.1)
 * ============================================================ */

import * as d3 from 'd3';
import * as nn from './nn';
import * as dataset from './dataset';
import {
  State,
  Problem,
  activations,
  regularizations,
  datasets,
  datasetLabels,
  regDatasets,
  regDatasetLabels,
} from './state';
import { HeatMap, COLOR_SCALE } from './heatmap';
import { AppendingLineChart } from './linechart';
import { OceanEngine } from './vendor/ascii-sharks/engine';

// Import stylesheet — Webpack injects this into <head> via style-loader
import '../styles.css';

// ─────────────────────────────────────────────────────────────
// SECTION 1: Feature Definitions (SRS §38)
// ─────────────────────────────────────────────────────────────

interface Feature {
  name: string;
  label: string;
  fn: (x: number, y: number) => number;
}

const FEATURES: Feature[] = [
  { name: 'x', label: 'X₁', fn: (x, _y) => x },
  { name: 'y', label: 'X₂', fn: (_x, y) => y },
  { name: 'xSquared', label: 'X₁²', fn: (x, _y) => x * x },
  { name: 'ySquared', label: 'X₂²', fn: (_x, y) => y * y },
  { name: 'xTimesY', label: 'X₁X₂', fn: (x, y) => x * y },
  { name: 'sinX', label: 'sin(X₁)', fn: (x, _y) => Math.sin(x) },
  { name: 'sinY', label: 'sin(X₂)', fn: (_x, y) => Math.sin(y) },
];

// ─────────────────────────────────────────────────────────────
// SECTION 2: Application State (SRS §4.4)
// ─────────────────────────────────────────────────────────────

let state: State;
let network: nn.Node[][];
let trainData: dataset.Example2D[] = [];
let testData: dataset.Example2D[] = [];
let isRunning: boolean = false;
let iter: number = 0;
let lossTrain: number = 0;
let lossTest: number = 0;
let heatMap: HeatMap;
let lineChart: AppendingLineChart;
const THEME_STORAGE_KEY = 'deeproxx-theme';

// ─────────────────────────────────────────────────────────────
// SECTION 3: Feature Input Builder (SRS §38.3)
// ─────────────────────────────────────────────────────────────

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

  const numLayersEl = document.getElementById('num-layers');
  if (numLayersEl) {
    const n = state.networkShape.length;
    numLayersEl.textContent = `${n} hidden layer${n === 1 ? '' : 's'}`;
  }

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

// ─────────────────────────────────────────────────────────────
// SECTION 4: Hover Card Logic (SRS §42)
// ─────────────────────────────────────────────────────────────

function showHoverCard(
  title: string,
  val: number,
  x: number,
  y: number,
  onSave: (newVal: number) => void,
): void {
  const hovercard = d3.select('#hovercard');
  if (hovercard.empty()) return;

  hovercard.classed('hidden', false);
  hovercard.style('left', `${x + 10}px`);
  hovercard.style('top', `${y - 10}px`);

  const label = hovercard.select('.hovercard-label');
  if (!label.empty()) label.text(title);

  const input = hovercard.select('input');
  if (!input.empty()) {
    input.property('value', val.toFixed(3));
    input.on('input', function (this: HTMLInputElement) {
      const parsed = parseFloat(this.value);
      if (!isNaN(parsed)) {
        onSave(parsed);
      }
    });
  }
}

function hideHoverCard(): void {
  const hovercard = d3.select('#hovercard');
  if (!hovercard.empty()) {
    hovercard.classed('hidden', true);
  }
  d3.selectAll('.link').classed('inactive', false);
}

// ─────────────────────────────────────────────────────────────
// SECTION 5: SVG Network Visualization (SRS §7, §17, §52, §55)
// ─────────────────────────────────────────────────────────────

function drawNetwork(net: nn.Node[][]): void {
  const svgSel = d3.select('#svg');
  if (svgSel.empty() || !net) return;

  const svgNode = svgSel.node() as SVGSVGElement;
  const width = svgNode ? svgNode.clientWidth || 500 : 500;
  const height = svgNode ? svgNode.clientHeight || 450 : 450;

  svgSel.selectAll('*').remove();

  const numLayers = net.length;
  const padX = 60;
  const topPad = 50;
  const bottomPad = 50;
  const availHeight = height - topPad - bottomPad;
  const layerSpacing = numLayers > 1 ? (width - 2 * padX) / (numLayers - 1) : 0;

  const nodePos: { [id: string]: { x: number; y: number } } = {};

  for (let l = 0; l < numLayers; l++) {
    const layer = net[l];
    const x = numLayers > 1 ? padX + l * layerSpacing : width / 2;
    const numNodes = layer.length;

    for (let n = 0; n < numNodes; n++) {
      const node = layer[n];
      // SRS §17.2: Centering formula
      const y = topPad + n * (availHeight / numNodes) + availHeight / (2 * numNodes);
      nodePos[node.id] = { x, y };
    }

    // Per-layer neuron + / - buttons for hidden layers (SRS §55)
    if (l > 0 && l < numLayers - 1) {
      const hiddenIdx = l - 1;
      const ctrlGroup = svgSel.append('g').attr('class', 'layer-ctrls');

      // + Button (above layer)
      const plusG = ctrlGroup
        .append('g')
        .attr('class', 'layer-neuron-btn')
        .attr('transform', `translate(${x}, ${topPad - 25})`)
        .style('cursor', 'pointer')
        .on('click', () => {
          if (state.networkShape[hiddenIdx] < 8) {
            state.networkShape[hiddenIdx]++;
            resetNetwork();
            state.serialize();
          }
        });

      plusG.append('circle').attr('r', 10).attr('stroke', 'none');

      plusG
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '3.5px')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .text('+');

      // − Button (below layer)
      const minusG = ctrlGroup
        .append('g')
        .attr('class', 'layer-neuron-btn')
        .attr('transform', `translate(${x}, ${height - bottomPad + 25})`)
        .style('cursor', 'pointer')
        .on('click', () => {
          if (state.networkShape[hiddenIdx] > 1) {
            state.networkShape[hiddenIdx]--;
            resetNetwork();
            state.serialize();
          }
        });

      minusG
        .append('circle')
        .attr('r', 10)
        .attr('stroke', 'none');

      minusG
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '3.5px')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .text('−');
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

          const pathEl = linksGroup
            .append('path')
            .attr('class', 'link')
            .attr('d', pathStr)
            .attr('fill', 'none')
            .attr('stroke', colorStr)
            .attr('stroke-width', widthVal)
            .attr('opacity', Math.min(1, Math.abs(link.weight) * 5));

          // Hover card on links (SRS §42, P5.9, P5.14)
          pathEl
            .on('mouseover', function () {
              d3.selectAll('.link').classed('inactive', true);
              d3.select(this).classed('inactive', false);
              const ev = d3.event as MouseEvent;
              showHoverCard('Weight', link.weight, ev.clientX, ev.clientY, (newVal) => {
                link.weight = newVal;
                pathEl
                  .attr('stroke', COLOR_SCALE(newVal))
                  .attr('stroke-width', Math.max(0.5, Math.abs(newVal) * 3));
                updateUI();
              });
            })
            .on('mouseout', (ev: MouseEvent) => {
              const related = ev.relatedTarget as HTMLElement;
              if (
                related &&
                (related.id === 'hovercard' || related.closest('#hovercard'))
              ) {
                return;
              }
              hideHoverCard();
            });
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
          .attr('class', 'node')
          .attr('transform', `translate(${pos.x},${pos.y})`);

        const circle = gNode
          .append('circle')
          .attr('r', 12)
          .attr('fill', colorStr)
          .attr('stroke-width', 1)
          .style('cursor', 'pointer');

        // Node hover card for bias (SRS §42, P5.10)
        circle
          .on('mouseover', () => {
            const ev = d3.event as MouseEvent;
            showHoverCard('Bias', node.bias, ev.clientX, ev.clientY, (newVal) => {
              node.bias = newVal;
              updateUI();
            });
          })
          .on('mouseout', (ev: MouseEvent) => {
            const related = ev.relatedTarget as HTMLElement;
            if (
              related &&
              (related.id === 'hovercard' || related.closest('#hovercard'))
            ) {
              return;
            }
            hideHoverCard();
          });
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

// ─────────────────────────────────────────────────────────────
// SECTION 6: Dataset Thumbnails Rendering (SRS §44)
// ─────────────────────────────────────────────────────────────

function renderThumbnails(): void {
  const galleries = [
    { containerId: 'classify-datasets', labels: datasetLabels },
    { containerId: 'regress-datasets', labels: regDatasetLabels },
  ];

  for (const gallery of galleries) {
    const container = document.getElementById(gallery.containerId);
    const grid = container?.querySelector('.thumb-grid');
    if (!grid) continue;

    grid.replaceChildren();
    for (const [key, label] of Object.entries(gallery.labels)) {
      const option = document.createElement('div');
      option.className = 'dataset-option';

      const canvas = document.createElement('canvas');
      canvas.id = `canvas-${key}`;
      canvas.className = 'dataset-thumb';
      canvas.dataset.dataset = key;
      canvas.width = 80;
      canvas.height = 80;
      canvas.title = `${label} dataset`;
      canvas.setAttribute('role', 'button');
      canvas.tabIndex = 0;
      canvas.setAttribute('aria-label', `${label} dataset`);

      const name = document.createElement('span');
      name.className = 'dataset-name';
      name.textContent = label;

      option.append(canvas, name);
      grid.appendChild(option);
    }
  }

  const canvases = document.querySelectorAll<HTMLCanvasElement>('canvas.dataset-thumb');
  canvases.forEach((canvas) => {
    const key = canvas.getAttribute('data-dataset');
    if (!key) return;
    const gen = datasets[key] || regDatasets[key];
    if (!gen) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pts = gen(120, 0);
    const toPx = (val: number, size: number) => ((val + 6) / 12) * size;

    pts.forEach((pt) => {
      const px = toPx(pt.x, w);
      const py = toPx(-pt.y, h);
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, 2 * Math.PI);
      ctx.fillStyle = COLOR_SCALE(pt.label);
      ctx.fill();
    });
  });
}

function updateSelectedThumbnail(): void {
  const canvases = document.querySelectorAll<HTMLCanvasElement>('canvas.dataset-thumb');
  canvases.forEach((canvas) => {
    const key = canvas.getAttribute('data-dataset');
    let isSelected = false;
    if (state.problem === Problem.REGRESSION) {
      isSelected = regDatasets[key || ''] === state.regDataset;
    } else {
      isSelected = datasets[key || ''] === state.dataset;
    }
    if (isSelected) {
      canvas.classList.add('selected');
    } else {
      canvas.classList.remove('selected');
    }
  });
}

// ─────────────────────────────────────────────────────────────
// SECTION 7: UI Controls Synchronization & Event Binding
// ─────────────────────────────────────────────────────────────

function syncUIFromState(): void {
  // Learning rate
  const lrSelect = document.getElementById('learningRate') as HTMLSelectElement;
  if (lrSelect) lrSelect.value = String(state.learningRate);

  // Activation
  const actSelect = document.getElementById('activations') as HTMLSelectElement;
  if (actSelect) {
    for (const [k, v] of Object.entries(activations)) {
      if (v === state.activation) {
        actSelect.value = k;
        break;
      }
    }
  }

  // Regularization
  const regSelect = document.getElementById('regularizations') as HTMLSelectElement;
  if (regSelect) {
    for (const [k, v] of Object.entries(regularizations)) {
      if (v === state.regularization) {
        regSelect.value = k;
        break;
      }
    }
  }

  // Regularization rate
  const regRateSelect = document.getElementById('regularRate') as HTMLSelectElement;
  if (regRateSelect) regRateSelect.value = String(state.regularizationRate);

  // Problem type
  const probSelect = document.getElementById('problem') as HTMLSelectElement;
  if (probSelect) probSelect.value = state.problem;

  // Sliders and displays
  const percSlider = document.getElementById('percTrainData') as HTMLInputElement;
  const percDisplay = document.getElementById('percTrainData-display');
  if (percSlider) percSlider.value = String(state.percTrainData);
  if (percDisplay) percDisplay.textContent = `${state.percTrainData}%`;

  const noiseSlider = document.getElementById('noise') as HTMLInputElement;
  const noiseDisplay = document.getElementById('noise-display');
  if (noiseSlider) noiseSlider.value = String(state.noise);
  if (noiseDisplay) noiseDisplay.textContent = String(state.noise);

  const batchSlider = document.getElementById('batchSize') as HTMLInputElement;
  const batchDisplay = document.getElementById('batchSize-display');
  if (batchSlider) batchSlider.value = String(state.batchSize);
  if (batchDisplay) batchDisplay.textContent = String(state.batchSize);

  // Feature checkboxes
  FEATURES.forEach((f) => {
    const cb = document.getElementById(`feature-${f.name}`) as HTMLInputElement;
    if (cb) cb.checked = !!(state as any)[f.name];
  });

  // Output view checkboxes
  const showTestCb = document.getElementById('show-test-data') as HTMLInputElement;
  if (showTestCb) showTestCb.checked = state.showTestData;

  const discCb = document.getElementById('discretize') as HTMLInputElement;
  if (discCb) discCb.checked = state.discretize;

  // Problem mode dataset thumbnails toggle
  const classDiv = document.getElementById('classify-datasets');
  const regDiv = document.getElementById('regress-datasets');
  if (classDiv && regDiv) {
    if (state.problem === Problem.REGRESSION) {
      classDiv.classList.add('hidden');
      regDiv.classList.remove('hidden');
    } else {
      classDiv.classList.remove('hidden');
      regDiv.classList.add('hidden');
    }
  }

  updateSelectedThumbnail();
}

function bindEventListeners(): void {
  const fullscreenButton = document.getElementById('fullscreen-main');
  const mainPart = document.getElementById('main-part');
  if (
    fullscreenButton instanceof HTMLButtonElement &&
    mainPart &&
    document.fullscreenEnabled &&
    typeof mainPart.requestFullscreen === 'function'
  ) {
    fullscreenButton.addEventListener('click', async () => {
      if (document.fullscreenElement === mainPart) {
        await document.exitFullscreen();
      } else {
        await mainPart.requestFullscreen();
      }
    });

    document.addEventListener('fullscreenchange', () => {
      const isFullscreen = document.fullscreenElement === mainPart;
      fullscreenButton.textContent = isFullscreen ? 'Exit fullscreen' : 'Fullscreen';
      fullscreenButton.setAttribute('aria-pressed', String(isFullscreen));
    });
  } else if (fullscreenButton) {
    fullscreenButton.classList.add('hidden');
  }

  // Top play/step/reset buttons (SRS §15.1)
  const playBtn = d3.select('#play-pause-button');
  if (!playBtn.empty()) {
    playBtn.on('click', () => {
      isRunning = !isRunning;
      updatePlayButton();
      hideHoverCard();
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
      hideHoverCard();
      generateData();
      resetNetwork();
      state.seed = Math.random().toString(36).substring(2, 8);
      state.serialize();
    });
  }

  // Top Hyperparameter dropdowns (SRS §15.3, §50.2)
  d3.select('#learningRate').on('change', function (this: HTMLSelectElement) {
    state.learningRate = +this.value;
    state.serialize();
  });

  d3.select('#regularRate').on('change', function (this: HTMLSelectElement) {
    state.regularizationRate = +this.value;
    state.serialize();
  });

  d3.select('#activations').on('change', function (this: HTMLSelectElement) {
    state.activation = activations[this.value];
    resetNetwork();
    state.serialize();
  });

  d3.select('#regularizations').on('change', function (this: HTMLSelectElement) {
    state.regularization = regularizations[this.value];
    resetNetwork();
    state.serialize();
  });

  d3.select('#problem').on('change', function (this: HTMLSelectElement) {
    state.problem = this.value as Problem;
    const classDiv = document.getElementById('classify-datasets');
    const regDiv = document.getElementById('regress-datasets');
    if (classDiv && regDiv) {
      if (state.problem === Problem.REGRESSION) {
        classDiv.classList.add('hidden');
        regDiv.classList.remove('hidden');
      } else {
        classDiv.classList.remove('hidden');
        regDiv.classList.add('hidden');
      }
    }
    updateSelectedThumbnail();
    generateData();
    resetNetwork();
    state.serialize();
  });

  // Dataset thumbnail clicks (SRS §44.3)
  d3.selectAll('canvas.dataset-thumb').on('click', function (this: HTMLCanvasElement) {
    const key = this.getAttribute('data-dataset');
    if (!key) return;
    if (state.problem === Problem.REGRESSION) {
      if (regDatasets[key]) state.regDataset = regDatasets[key];
    } else {
      if (datasets[key]) state.dataset = datasets[key];
    }
    updateSelectedThumbnail();
    generateData();
    resetNetwork();
    state.serialize();
  });

  d3.selectAll('canvas.dataset-thumb').on('keydown', function (this: HTMLCanvasElement) {
    const event = d3.event as KeyboardEvent;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.click();
    }
  });

  // Sliders (SRS §15.3, §48, §50)
  d3.select('#percTrainData').on('input', function (this: HTMLInputElement) {
    state.percTrainData = +this.value;
    const disp = document.getElementById('percTrainData-display');
    if (disp) disp.textContent = `${this.value}%`;
    generateData();
    resetNetwork();
    state.serialize();
  });

  d3.select('#noise').on('input', function (this: HTMLInputElement) {
    state.noise = +this.value;
    const disp = document.getElementById('noise-display');
    if (disp) disp.textContent = this.value;
    generateData();
    resetNetwork();
    state.serialize();
  });

  d3.select('#batchSize').on('input', function (this: HTMLInputElement) {
    state.batchSize = +this.value;
    const disp = document.getElementById('batchSize-display');
    if (disp) disp.textContent = this.value;
    state.serialize();
  });

  d3.select('#data-regen-button').on('click', () => {
    generateData();
    resetNetwork();
    state.serialize();
  });

  // Feature checkboxes (SRS §38)
  FEATURES.forEach((f) => {
    d3.select(`#feature-${f.name}`).on('change', function (this: HTMLInputElement) {
      (state as any)[f.name] = this.checked;
      // Ensure at least one feature is active
      if (getActiveFeatureIds().length === 0) {
        (state as any)[f.name] = true;
        this.checked = true;
        return;
      }
      resetNetwork();
      state.serialize();
    });
  });

  // Layer add/remove buttons (SRS §15.2, §47.1)
  const addLayerBtn = d3.select('#add-layers');
  if (!addLayerBtn.empty()) {
    addLayerBtn.on('click', () => {
      if (state.networkShape.length < 6) {
        state.networkShape.push(2);
        resetNetwork();
        state.serialize();
      }
    });
  }

  const removeLayerBtn = d3.select('#remove-layers');
  if (!removeLayerBtn.empty()) {
    removeLayerBtn.on('click', () => {
      if (state.networkShape.length > 0) {
        state.networkShape.pop();
        resetNetwork();
        state.serialize();
      }
    });
  }

  // Output checkboxes (SRS §40, §41)
  d3.select('#show-test-data').on('change', function (this: HTMLInputElement) {
    state.showTestData = this.checked;
    updateUI();
    state.serialize();
  });

  d3.select('#discretize').on('change', function (this: HTMLInputElement) {
    state.discretize = this.checked;
    updateUI();
    state.serialize();
  });

  // Hide hovercard on mouse leave of card
  d3.select('#hovercard').on('mouseleave', hideHoverCard);
}

function initOceanBackground(): void {
  const canvas = document.getElementById('site-ocean');
  if (
    !(canvas instanceof HTMLCanvasElement) ||
    typeof ResizeObserver === 'undefined' ||
    typeof IntersectionObserver === 'undefined' ||
    !canvas.getContext('2d')
  ) {
    return;
  }

  new OceanEngine(canvas, [
    { kind: 'classic', size: 1 },
    { kind: 'hammerhead', size: 0.8 },
    { kind: 'tiger', size: 0.72 },
    { kind: 'mako', size: 0.65 },
    { kind: 'zebra', size: 0.58 },
    { kind: 'nurse', size: 0.5 },
  ]);
}

function init(): void {
  state = State.deserializeState();
  initThemeToggle();
  initOceanBackground();

  const heatmapContainer = d3.select('#heatmap');
  if (!heatmapContainer.empty()) {
    heatMap = new HeatMap(heatmapContainer);
  }

  const linechartContainer = d3.select('#linechart');
  if (!linechartContainer.empty()) {
    lineChart = new AppendingLineChart(linechartContainer);
  }

  renderThumbnails();
  syncUIFromState();
  generateData();
  resetNetwork();
  bindEventListeners();
}

function initThemeToggle(): void {
  const toggle = document.getElementById('theme-toggle');
  if (!(toggle instanceof HTMLButtonElement)) return;

  const applyTheme = (theme: 'light' | 'dark') => {
    document.documentElement.dataset.theme = theme;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    toggle.textContent = theme === 'dark' ? '☀' : '☾';
    toggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    toggle.title = `Switch to ${nextTheme} mode`;

    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === 'dark' ? '#121317' : '#ffffff';
  };

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  toggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    applyTheme(theme);
    updateUI();
    drawNetwork(network);
  });
}

document.addEventListener('DOMContentLoaded', init);
