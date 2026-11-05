import { type World } from "./world";
/** Visible dark-grey cell grid, snapped to device pixels. Shared with the sidebar backdrop. */
export declare function paintGrid(g: CanvasRenderingContext2D, W: number, H: number, cw: number, ch: number, dpr: number): void;
export declare class AsciiRenderer {
    private canvas;
    private ctx;
    private bg;
    private dpr;
    private width;
    private height;
    private cw;
    private ch;
    private cols;
    private rows;
    private fontFamily;
    private dotKind;
    private dotPhase;
    private dotFreq;
    private energy;
    private energyTmp;
    private heat;
    private bucketOf;
    private bucketOrder;
    private bucketCounts;
    private dotStyles;
    private sharkFlag;
    private sharkShade;
    private sharkKey;
    private sharkDepth;
    private sharkKind;
    /** Cells darkened by a shark's shadow on the seabed. */
    private sharkShadow;
    private spine;
    private arc;
    private arcTotal;
    private shape;
    private sharkId;
    private finTipLeft;
    private finTipRight;
    private hitFlag;
    private hitShade;
    private hitS;
    private hitV;
    private hitDist;
    /** Cells holding a fish this frame (frame stamp); dots skip them. */
    private fishStamp;
    private frameId;
    /** Fish cells bucketed by brightness, so each bucket is one fillStyle. */
    private fishBuckets;
    private fishStyles;
    constructor(canvas: HTMLCanvasElement);
    get cellWidth(): number;
    get cellHeight(): number;
    setFontFamily(family: string): void;
    resize(width: number, height: number, dpr: number): void;
    private paintBackground;
    render(world: World, dt: number): void;
    private cellIndex;
    private stamp;
    private consumeEvents;
    private depositWake;
    /** Blur + decay so wakes spread out like ripples and fade. */
    private diffuse;
    /**
     * Classify one point against the current shark (spine/arc already built).
     * Body coordinates: s along the spine (0 snout → 1 tail), v across it.
     * Writes hit* fields and returns whether the point is on the shark.
     */
    private sampleShark;
    /** Whether a body point (s along, v across) falls on a dark marking. */
    private marked;
    /**
     * Build a smooth, undulating render spine from the sim spine, then
     * supersample every cell in the shark's bounding box against the shape.
     * Fully covered cells become solid skin; partial cells become edge glyphs.
     */
    private rasterizeSharks;
    private drawSharks;
    /**
     * Snap each fish to a cell and bucket it by brightness: far fish are dim,
     * near fish brighter, and turning or panicking fish glint. Nearer fish
     * claim a cell first when two land in the same one.
     */
    private markFish;
    private drawFish;
    private drawHeat;
    /**
     * Every cell's dot twinkles on its own clock, is modulated by slow
     * caustic light bands, and flares cyan where the wake field is strong.
     * Dots are bucketed by colour/alpha so each bucket is one fillStyle.
     */
    private drawDots;
}
//# sourceMappingURL=renderer.d.ts.map