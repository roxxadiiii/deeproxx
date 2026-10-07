import * as d3 from 'd3';
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
export declare class AppendingLineChart {
    /** The D3 SVG root element. */
    private svg;
    /** Historical training loss values. */
    private trainLossHistory;
    /** Historical test loss values. */
    private testLossHistory;
    /** D3 scale mapping epoch index (0 → N) to SVG x-pixels. */
    private xScale;
    /** D3 scale mapping loss value (0 → max) to SVG y-pixels. */
    private yScale;
    /** D3 line path generator for the train curve. */
    private trainLine;
    /** D3 line path generator for the test curve. */
    private testLine;
    /** Chart inner dimensions. */
    private width;
    private height;
    /** Chart margins. */
    private static readonly MARGIN;
    /**
     * Constructs the AppendingLineChart and appends it to `container`.
     * @param container - D3 selection of the host div (#linechart).
     * @param xLabel - Label for the X axis (e.g. "Epoch").
     * @param yLabel - Label for the Y axis (e.g. "Loss").
     * SRS §4.6, P6.10
     */
    constructor(container: d3.Selection<any>, xLabel?: string, yLabel?: string);
    /**
     * Creates D3 line generators for train and test curves.
     * X maps epoch index; Y maps loss value.
     * SRS §4.6, P6.11
     */
    private buildLineGenerators;
    /**
     * Appends a new data point to both loss history arrays and redraws.
     * Rescales axes if the new max loss exceeds the current Y domain.
     *
     * @param values - [trainLoss, testLoss] for the current epoch.
     * SRS §4.6, §54.5, P6.13
     */
    addDataPoint(values: [number, number]): void;
    /**
     * Clears all history and removes SVG paths.
     * Called when the user resets the training session.
     * SRS §4.6, P6.14
     */
    reset(): void;
}
//# sourceMappingURL=linechart.d.ts.map