export interface Species {
    name: string;
    cruise: number;
    maxSpeed: number;
    minSpeed: number;
    /** Relative odds of a new school being this species. */
    weight: number;
    schoolSize: [number, number];
    /** Personal space in grid cells (x, y), so every fish gets its own glyph. */
    spacing: [number, number];
    align: number;
    cohesion: number;
    jitter: number;
    /** Tangential pull around the local centre: >0 makes a rotating bait ball. */
    mill: number;
    /** Damps vertical speed; real fish mostly cruise level. */
    verticalDrag: number;
}
export declare const SPECIES: Species[];
export declare function pickSpecies(): number;
//# sourceMappingURL=species.d.ts.map