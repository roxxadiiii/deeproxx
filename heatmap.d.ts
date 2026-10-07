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
    updateBackground(network: nn.Node[][], inputs: (x: number, y: number) => number[], trainData: {
        x: number;
        y: number;
        label: number;
    }[], testData: {
        x: number;
        y: number;
        label: number;
    }[], showTestData: boolean, discretize: boolean): void;
    /**
     * Converts a data coordinate value to a canvas pixel position.
     * Maps [-EXTENT, +EXTENT] → [0, canvasDimension].
     * Note: Y-axis is flipped (data y=+6 → canvas y=0, data y=-6 → canvas y=height).
     *
     * SRS §46.3, P6.3
     */
    private toPixelX;
    private toPixelY;
    /**
     * Draws dataset points as colored circles on the canvas.
     * Training data: filled circles; Test data: ring-outlined circles.
     *
     * SRS §4.5, §41.3, §46.5, P6.7 – P6.8
     *
     * @param data - The data points to render.
     * @param isTest - If true, renders as outlined rings (test data style).
     */
    private drawDataPoints;
}
//# sourceMappingURL=heatmap.d.ts.map