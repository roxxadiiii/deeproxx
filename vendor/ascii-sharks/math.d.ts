export declare const TAU: number;
export declare const clamp: (v: number, lo: number, hi: number) => number;
export declare const rand: (lo: number, hi: number) => number;
export declare const randInt: (lo: number, hi: number) => number;
export declare function smoothstep(e0: number, e1: number, x: number): number;
/** Shortest signed angle from a to b, in (-PI, PI]. */
export declare function angleDiff(a: number, b: number): number;
/** Cheap integer hash → [0, 1). Deterministic, so textures stay stable. */
export declare function hash3(x: number, y: number, z: number): number;
/**
 * Divergence-free ocean current: the curl of a slowly drifting stream
 * function ψ(x, y, t). Because it has no sources or sinks, it moves the
 * schools around without bunching them up in one corner.
 */
export declare function current(x: number, y: number, t: number, out: {
    x: number;
    y: number;
}): {
    x: number;
    y: number;
};
//# sourceMappingURL=math.d.ts.map