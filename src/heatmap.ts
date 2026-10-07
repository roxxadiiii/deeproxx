/* ============================================================
 * heatmap.ts — Canvas Decision Boundary Renderer
 * SRS §4.5, §46, §53
 * Roadmap: Phase 6 (P6.1 – P6.9, P6.15 – P6.22)
 * ============================================================ */

import * as d3 from 'd3';
import * as nn from './nn';

// ─────────────────────────────────────────────────────────────
// SECTION 1: Color Scale (SRS §7.2, §53)
// ─────────────────────────────────────────────────────────────

/**
 * D3 linear color scale mapping prediction values to visual colors.
 * Domain: [-1, 0, +1]
 * Range:  [orange, grey, blue]  (SRS §6.2, §7.2)
 *
 * - Orange (#f59322) = negative prediction
 * - Grey   (#e8eaeb) = neutral (near 0)
 * - Blue   (#0877bd) = positive prediction
 *
 * `.clamp(true)` ensures values outside [-1, 1] are clamped to the edges.
 * SRS §7.2, P6.5
 */
export const COLOR_SCALE = d3.scale
  .linear<string>()
  .domain([-1, 0, 1])
  .range(['#f59322', '#e8eaeb', '#0877bd'])
  .clamp(true);

// ─────────────────────────────────────────────────────────────
// SECTION 2: HeatMap Class (SRS §4.5)
// ─────────────────────────────────────────────────────────────

/**
 * Renders the decision boundary background on an HTML5 Canvas element.
 *
 * Approach:
 *  - Computes predictions on a 30×30 grid over [-6, 6]²
 *  - Writes pixel colors to an ImageData buffer (fast, avoids DOM overhead)
 *  - Overlays training and test data points as circles
 *
 * SRS §4.5, §9.1, §9.2, P6.1
 */
export class HeatMap {
  /** Number of grid cells per axis. Default: 30. */
  private numCells: number;

  /** HTML5 Canvas 2D rendering context. */
  private ctx: CanvasRenderingContext2D;

  /** Canvas element width in pixels. */
  private width: number;

  /** Canvas element height in pixels. */
  private height: number;

  /** The data coordinate space: [-EXTENT, +EXTENT]. */
  private static readonly EXTENT = 6;

  /**
   * Constructs a HeatMap renderer.
   * @param container - D3 selection of the container div (#heatmap).
   * @param numCells - Grid resolution (default 30×30).
   * SRS §4.5, P6.1
   */
  constructor(container: d3.Selection<any>, numCells: number = 30) {
    this.numCells = numCells;
    let canvasSel = container.select('canvas');
    if (canvasSel.empty()) {
      canvasSel = container.append('canvas');
    }
    const canvas = canvasSel.node() as HTMLCanvasElement;
    const containerNode = container.node() as HTMLElement;
    this.width = containerNode ? containerNode.clientWidth || 300 : 300;
    this.height = containerNode ? containerNode.clientHeight || 300 : 300;
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d')!;
  }

  updateBackground(
    network: nn.Node[][],
    inputs: (x: number, y: number) => number[],
    trainData: { x: number; y: number; label: number }[],
    testData: { x: number; y: number; label: number }[],
    showTestData: boolean,
    discretize: boolean,
  ): void {
    const cellWidth = this.width / this.numCells;
    const cellHeight = this.height / this.numCells;

    for (let i = 0; i < this.numCells; i++) {
      for (let j = 0; j < this.numCells; j++) {
        const x = -HeatMap.EXTENT + ((i + 0.5) / this.numCells) * (2 * HeatMap.EXTENT);
        const y = HeatMap.EXTENT - ((j + 0.5) / this.numCells) * (2 * HeatMap.EXTENT);

        const inputValues = inputs(x, y);
        let pred = nn.forwardProp(network, inputValues);

        if (discretize) {
          pred = pred >= 0 ? 1 : -1;
        }

        const colorStr = COLOR_SCALE(pred);
        this.ctx.fillStyle = colorStr;
        this.ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth + 0.5, cellHeight + 0.5);
      }
    }

    this.drawDataPoints(trainData, false);
    if (showTestData && testData) {
      this.drawDataPoints(testData, true);
    }
  }

  private toPixelX(x: number): number {
    return ((x + HeatMap.EXTENT) / (2 * HeatMap.EXTENT)) * this.width;
  }

  private toPixelY(y: number): number {
    return ((HeatMap.EXTENT - y) / (2 * HeatMap.EXTENT)) * this.height;
  }

  private drawDataPoints(
    data: { x: number; y: number; label: number }[],
    isTest: boolean,
  ): void {
    if (!data) return;
    for (const point of data) {
      const px = this.toPixelX(point.x);
      const py = this.toPixelY(point.y);
      const colorStr = COLOR_SCALE(point.label);

      this.ctx.beginPath();
      this.ctx.arc(px, py, 3.5, 0, 2 * Math.PI);
      if (isTest) {
        this.ctx.strokeStyle = colorStr;
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
      } else {
        this.ctx.fillStyle = colorStr;
        this.ctx.fill();
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
      }
    }
  }
}
