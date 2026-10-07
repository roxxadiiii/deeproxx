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
    // TODO P6.1: Set up canvas element inside container
    // 1. this.numCells = numCells
    // 2. Append a <canvas> to container
    // 3. Set canvas width and height from container dimensions
    // 4. this.ctx = canvas.node().getContext('2d')
    throw new Error('Not implemented: HeatMap constructor');
  }

  /**
   * Renders the decision boundary by evaluating the network at each grid cell.
   *
   * Algorithm (SRS §4.5, §9.1):
   *  1. Create a 30×30 grid of (x, y) coordinate pairs over [-6, 6]²
   *  2. For each grid cell: call nn.forwardProp(network, [x, y]) to get prediction
   *  3. Map prediction to RGBA color via COLOR_SCALE
   *  4. Write all RGBA values to an ImageData buffer
   *  5. ctx.putImageData(imageData, 0, 0)  — fast pixel write
   *  6. Draw data points on top
   *
   * SRS §4.5, §46, P6.2 – P6.7
   *
   * @param network - The trained network to evaluate.
   * @param inputs - The feature input builder function.
   * @param trainData - Training samples to overlay.
   * @param testData - Test samples to overlay (if showTestData is true).
   * @param showTestData - Whether to render test data points.
   * @param discretize - If true, snap predictions to +1 or -1 before coloring.
   */
  updateBackground(
    network: nn.Node[][],
    inputs: (x: number, y: number) => number[],
    trainData: { x: number; y: number; label: number }[],
    testData: { x: number; y: number; label: number }[],
    showTestData: boolean,
    discretize: boolean,
  ): void {
    // TODO P6.2 – P6.7: Implement heatmap rendering
    // Step 1: Allocate ImageData (this.width × this.height)
    // Step 2: Iterate grid cells (numCells × numCells)
    //         - Map cell (i, j) to data coords (x, y) in [-EXTENT, +EXTENT]
    //         - Call nn.forwardProp(network, inputs(x, y))
    //         - If discretize: snap to ±1
    //         - Convert color via COLOR_SCALE → parse RGB values
    //         - Fill corresponding pixels in ImageData (pixel block per cell)
    // Step 3: ctx.putImageData(imageData, 0, 0)
    // Step 4: drawDataPoints(trainData, false)
    // Step 5: if showTestData → drawDataPoints(testData, true)
    throw new Error('Not implemented: HeatMap.updateBackground');
  }

  /**
   * Converts a data coordinate value to a canvas pixel position.
   * Maps [-EXTENT, +EXTENT] → [0, canvasDimension].
   * Note: Y-axis is flipped (data y=+6 → canvas y=0, data y=-6 → canvas y=height).
   *
   * SRS §46.3, P6.3
   */
  private toPixelX(x: number): number {
    // TODO P6.3: return (x + EXTENT) / (2 * EXTENT) * this.width
    throw new Error('Not implemented: HeatMap.toPixelX');
  }

  private toPixelY(y: number): number {
    // TODO P6.3: return (EXTENT - y) / (2 * EXTENT) * this.height  ← Y-flip
    throw new Error('Not implemented: HeatMap.toPixelY');
  }

  /**
   * Draws dataset points as colored circles on the canvas.
   * Training data: filled circles; Test data: ring-outlined circles.
   *
   * SRS §4.5, §41.3, §46.5, P6.7 – P6.8
   *
   * @param data - The data points to render.
   * @param isTest - If true, renders as outlined rings (test data style).
   */
  private drawDataPoints(
    data: { x: number; y: number; label: number }[],
    isTest: boolean,
  ): void {
    // TODO P6.7 – P6.8: Draw each data point as a circle
    // For each point:
    //   px = toPixelX(point.x)
    //   py = toPixelY(point.y)
    //   color = COLOR_SCALE(point.label)
    //   if isTest: draw ring outline (arc with no fill, stroke only)
    //   else: draw filled circle
    throw new Error('Not implemented: HeatMap.drawDataPoints');
  }
}
