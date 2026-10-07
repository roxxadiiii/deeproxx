/* ============================================================
 * seedrandom.d.ts
 * TypeScript type declarations for the `seedrandom` library.
 * SRS §4, P0.7
 * ============================================================ */

interface Math {
  /**
   * Seeds the Math.random() function for deterministic output.
   * @param seed - A seed string or number.
   * @param options - Optional configuration object.
   */
  seedrandom(seed?: string | number, options?: SeedrandomOptions): string;
}

interface SeedrandomOptions {
  /** If true, returns the seed used rather than the seeded prng. */
  pass?: (prng: () => number, seed: string) => any;
  /** If true, entropy from the seed is used in addition to new entropy. */
  entropy?: boolean;
  /** If true, the state is stored so it can be retrieved later. */
  state?: boolean | object;
  /** If provided, the result is passed to this callback. */
  global?: boolean;
}

declare module 'seedrandom' {
  function seedrandom(seed?: string, options?: SeedrandomOptions): () => number;
  export = seedrandom;
}
