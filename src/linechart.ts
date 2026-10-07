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
  private trainPath: d3.Selection<SVGPathElement>;
  private testPath: d3.Selection<SVGPathElement>;

  constructor(
    container: d3.Selection<any>,
    xLabel: string = 'Epoch',
    yLabel: string = 'Loss',
  ) {
    const containerNode = container.node() as HTMLElement;
    const totalWidth = containerNode ? containerNode.clientWidth || 250 : 250;
    const totalHeight = containerNode ? containerNode.clientHeight || 120 : 120;

    this.width = totalWidth - AppendingLineChart.MARGIN.left - AppendingLineChart.MARGIN.right;
    this.height = totalHeight - AppendingLineChart.MARGIN.top - AppendingLineChart.MARGIN.bottom;

    let svgSel = container.select('svg');
    if (svgSel.empty()) {
      svgSel = container.append('svg');
    }
    this.svg = svgSel as d3.Selection<SVGSVGElement>;
    this.svg.attr('width', totalWidth).attr('height', totalHeight);

    this.svg.selectAll('*').remove();

    const g = this.svg
      .append('g')
      .attr('transform', `translate(${AppendingLineChart.MARGIN.left},${AppendingLineChart.MARGIN.top})`);

    this.xScale = d3.scale.linear().domain([0, 1]).range([0, this.width]);
    this.yScale = d3.scale.linear().domain([0, 1]).range([this.height, 0]);

    this.buildLineGenerators();

    this.trainPath = g
      .append('path')
      .attr('class', 'train-line')
      .attr('fill', 'none')
      .attr('stroke', '#0877bd')
      .attr('stroke-width', '1.5');

    this.testPath = g
      .append('path')
      .attr('class', 'test-line')
      .attr('fill', 'none')
      .attr('stroke', '#f59322')
      .attr('stroke-width', '1.5');
  }

  private buildLineGenerators(): void {
    this.trainLine = d3.svg
      .line<number>()
      .x((_d, i) => this.xScale(i))
      .y((d) => this.yScale(d));

    this.testLine = d3.svg
      .line<number>()
      .x((_d, i) => this.xScale(i))
      .y((d) => this.yScale(d));
  }

  addDataPoint(values: [number, number]): void {
    if (!values) return;
    this.trainLossHistory.push(values[0]);
    this.testLossHistory.push(values[1]);

    const maxEpoch = Math.max(1, this.trainLossHistory.length - 1);
    const maxLoss = Math.max(
      1,
      d3.max(this.trainLossHistory.concat(this.testLossHistory)) || 1,
    );

    this.xScale.domain([0, maxEpoch]);
    this.yScale.domain([0, maxLoss]);

    this.trainPath.attr('d', this.trainLine(this.trainLossHistory) || '');
    this.testPath.attr('d', this.testLine(this.testLossHistory) || '');
  }

  reset(): void {
    this.trainLossHistory = [];
    this.testLossHistory = [];
    this.xScale.domain([0, 1]);
    this.yScale.domain([0, 1]);
    if (this.trainPath) this.trainPath.attr('d', '');
    if (this.testPath) this.testPath.attr('d', '');
  }
}

