import * as d3 from 'd3';
import * as nn from './nn';
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
export declare const COLOR_SCALE: any;
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
export declare class HeatMap {
    /** Number of grid cells per axis. Default: 30. */
    private numCells;
    /** HTML5 Canvas 2D rendering context. */
    private ctx;
    /** Canvas element width in pixels. */
    private width;
    /** Canvas element height in pixels. */
    private height;
    /** The data coordinate space: [-EXTENT, +EXTENT]. */
    private static readonly EXTENT;
    /**
     * Constructs a HeatMap renderer.
     * @param container - D3 selection of the container div (#heatmap).
     * @param numCells - Grid resolution (default 30×30).
     * SRS §4.5, P6.1
     */
    constructor(container: d3.Selection<any>, numCells?: number);
    updateBackground(network: nn.Node[][], inputs: (x: number, y: number) => number[], trainData: {
        x: number;
        y: number;
        label: number;
    }[], testData: {
        x: number;
        y: number;
        label: number;
    }[], showTestData: boolean, discretize: boolean): void;
    private toPixelX;
    private toPixelY;
    private drawDataPoints;
}
//# sourceMappingURL=heatmap.d.ts.map