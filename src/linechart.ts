/* ============================================================
 * linechart.ts — Real-Time Loss Curve Renderer (D3 SVG)
 * SRS §4.6, §54
 * Roadmap: Phase 6 (P6.10 – P6.14, P6.18)
 * ============================================================ */

import * as d3 from 'd3';

// ─────────────────────────────────────────────────────────────
// SECTION 1: AppendingLineChart Class (SRS §4.6)
// ─────────────────────────────────────────────────────────────

/**
 * Renders an SVG line chart that appends new loss values over time.
 * Maintains separate curves for train loss and test loss.
 *
 * Design:
 *  - Uses D3 line generators with X = epoch index, Y = loss value.
 *  - Y-axis auto-rescales as new data arrives.
 *  - Two colored paths: one per loss series.
 *
 * SRS §4.6, §54.5, P6.10
 */
export class AppendingLineChart {
  /** The D3 SVG root element. */
  private svg: d3.Selection<SVGSVGElement>;

  /** Historical training loss values. */
  private trainLossHistory: number[] = [];

  /** Historical test loss values. */
  private testLossHistory: number[] = [];

  /** D3 scale mapping epoch index (0 → N) to SVG x-pixels. */
  private xScale: d3.scale.Linear<number, number>;

  /** D3 scale mapping loss value (0 → max) to SVG y-pixels. */
  private yScale: d3.scale.Linear<number, number>;

  /** D3 line path generator for the train curve. */
  private trainLine: d3.svg.Line<number>;

  /** D3 line path generator for the test curve. */
  private testLine: d3.svg.Line<number>;

  /** Chart inner dimensions. */
  private width: number;
  private height: number;

  /** Chart margins. */
  private static readonly MARGIN = { top: 10, right: 20, bottom: 30, left: 40 };

  /**
   * Constructs the AppendingLineChart and appends it to `container`.
   * @param container - D3 selection of the host div (#linechart).
   * @param xLabel - Label for the X axis (e.g. "Epoch").
   * @param yLabel - Label for the Y axis (e.g. "Loss").
   * SRS §4.6, P6.10
   */
  constructor(
    container: d3.Selection<any>,
    xLabel: string = 'Epoch',
    yLabel: string = 'Loss',
  ) {
    // TODO P6.10: Build SVG structure
    // 1. Compute width and height from container dimensions minus margins
    // 2. Append <svg> → <g> (main group translated by margins)
    // 3. Initialize xScale as d3.scale.linear() domain [0, 1] range [0, width]
    // 4. Initialize yScale as d3.scale.linear() domain [0, 1] range [height, 0]
    // 5. Append X-axis and Y-axis groups
    // 6. Create line generators (see TODO P6.11)
    // 7. Append two <path> elements for train and test lines
    throw new Error('Not implemented: AppendingLineChart constructor');
  }

  /**
   * Creates D3 line generators for train and test curves.
   * X maps epoch index; Y maps loss value.
   * SRS §4.6, P6.11
   */
  private buildLineGenerators(): void {
    // TODO P6.11:
    // this.trainLine = d3.svg.line<number>()
    //   .x((d, i) => this.xScale(i))
    //   .y(d => this.yScale(d))
    // this.testLine = same structure
    throw new Error('Not implemented: AppendingLineChart.buildLineGenerators');
  }

  /**
   * Appends a new data point to both loss history arrays and redraws.
   * Rescales axes if the new max loss exceeds the current Y domain.
   *
   * @param values - [trainLoss, testLoss] for the current epoch.
   * SRS §4.6, §54.5, P6.13
   */
  addDataPoint(values: [number, number]): void {
    // TODO P6.13: Implement data append and redraw
    // 1. this.trainLossHistory.push(values[0])
    // 2. this.testLossHistory.push(values[1])
    // 3. Recompute xScale domain to [0, trainLossHistory.length]
    // 4. Recompute yScale domain to [0, Math.max(...trainLossHistory, ...testLossHistory)]
    // 5. Update X and Y axes
    // 6. Redraw both <path> elements using line generators
    throw new Error('Not implemented: AppendingLineChart.addDataPoint');
  }

  /**
   * Clears all history and removes SVG paths.
   * Called when the user resets the training session.
   * SRS §4.6, P6.14
   */
  reset(): void {
    // TODO P6.14:
    // this.trainLossHistory = []
    // this.testLossHistory = []
    // Reset xScale and yScale domains to [0, 1]
    // Remove <path> elements for both lines
    throw new Error('Not implemented: AppendingLineChart.reset');
  }
}
