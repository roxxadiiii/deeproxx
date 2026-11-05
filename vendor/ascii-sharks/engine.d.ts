import { type SharkSpec } from "./world";
/**
 * Wires World + AsciiRenderer to a canvas: fixed-timestep loop, resize,
 * pointer input, pausing off-screen, and prefers-reduced-motion.
 */
export declare class OceanEngine {
    private canvas;
    private world;
    private renderer;
    private raf;
    private last;
    private acc;
    private visible;
    private reducedMotion;
    private resizeObserver;
    private intersectionObserver;
    private disposed;
    constructor(canvas: HTMLCanvasElement, sharks?: SharkSpec[]);
    destroy(): void;
    private resize;
    private schedule;
    private frame;
    /** Reduced motion: let the ecosystem settle, then show a single frame. */
    private drawStill;
    private onMotionPreference;
    private toLocal;
    private onPointerMove;
    private onPointerDown;
    private onPointerLeave;
}
//# sourceMappingURL=engine.d.ts.map