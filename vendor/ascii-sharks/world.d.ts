export declare const SHARK_NODES = 20;
export type SharkKind = "classic" | "hammerhead" | "zebra" | "tiger" | "greathammer" | "mako" | "thresher" | "nurse";
/** Which sharks to put in the water; size is relative to the biggest. */
export type SharkSpec = {
    kind: SharkKind;
    size: number;
};
export interface Fish {
    x: number;
    y: number;
    vx: number;
    vy: number;
    species: number;
    /** 0 calm → 1 panicking. Spreads to neighbours. */
    alarm: number;
    alive: boolean;
    respawnAt: number;
    /** Tail-beat phase. */
    phase: number;
    /** Smoothed angular velocity (rad/s); hard turns flash silver. */
    turn: number;
    /** 0.55 far → 1 near. */
    depth: number;
    /** Rotation sense shared by a school when it mills into a bait ball. */
    millDir: 1 | -1;
}
export interface Shark {
    id: number;
    kind: SharkKind;
    length: number;
    /** Spine positions, snout first: [x0, y0, x1, y1, ...]. */
    nodes: Float32Array;
    heading: number;
    speed: number;
    /** Tail-beat phase; drives the body wave in the renderer. */
    phase: number;
    /** Smoothed angular velocity (rad/s); the shark banks its fins into turns. */
    turn: number;
    hunger: number;
    wander: number;
    orbitDir: 1 | -1;
    orbitRadius: number;
    target: Fish | null;
    retargetAt: number;
    /** 0 far / dim → 1 near / bright. */
    depth: number;
}
export interface WorldEvent {
    kind: "eat" | "splash";
    x: number;
    y: number;
}
export declare class World {
    private sharkSpecs;
    private fishCount?;
    width: number;
    height: number;
    time: number;
    fish: Fish[];
    sharks: Shark[];
    events: WorldEvent[];
    pointer: {
        x: number;
        y: number;
        active: boolean;
    };
    /** Fish neighbourhood radius; the spatial hash bucket size matches it. */
    private perception;
    /** Per-species personal space in px (x, y). */
    private sepX;
    private sepY;
    private foreignSep;
    private bucketCols;
    private bucketRows;
    private bucketHead;
    private bucketCount;
    private bucketNext;
    private lastSpawn;
    private tmp;
    /** fishCount overrides the area-based population (the sidebar wants a single small school). */
    constructor(sharkSpecs?: SharkSpec[], fishCount?: number);
    resize(width: number, height: number, cellW: number, cellH: number): void;
    seed(): void;
    splash(x: number, y: number): void;
    step(dt: number): void;
    private rebuildHash;
    private bucketOf;
    private stepFish;
    private stepSharks;
    /**
     * Pick prey in the shark's forward cone, preferring close fish in sparse
     * buckets (stragglers) over fish buried in a dense school.
     */
    private findPrey;
    private respawn;
}
//# sourceMappingURL=world.d.ts.map