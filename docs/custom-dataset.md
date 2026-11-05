# 🎨 Guide: Adding a Custom Dataset Type

> **Project:** DeepRoxx  
> **Source of Truth:** `SRS.md` §24  
> **Roadmap Reference:** Phase 9 (P9.24)

---

DeepRoxx allows you to add custom 2D synthetic datasets in three straightforward steps without modifying any core mathematical routines.

---

## Step 1: Create the Data Generator Function

Open [`src/dataset.ts`](file:///home/roxxy/dev/deeproxx/src/dataset.ts) and export a new function conforming to the `DataGenerator` signature:

```typescript
export function classifyCheckerboardData(
  numSamples: number,
  noise: number
): Example2D[] {
  const points: Example2D[] = [];
  for (let i = 0; i < numSamples; i++) {
    let x = Math.random() * 12 - 6;
    let y = Math.random() * 12 - 6;

    // Optional: Add random noise displacement
    const noiseVal = (Math.random() - 0.5) * (noise / 50) * 2;
    x += noiseVal;
    y += noiseVal;

    // Define custom classification rule (+1 or -1)
    const label =
      (Math.floor(x + 6) % 2 === 0) ^ (Math.floor(y + 6) % 2 === 0) ? 1 : -1;

    points.push({ x, y, label });
  }
  return points;
}
```

---

## Step 2: Register in `src/state.ts`

Open [`src/state.ts`](file:///home/roxxy/dev/deeproxx/src/state.ts) and append your generator function to the `datasets` lookup map (or `regDatasets` for continuous regression tasks):

```typescript
export const datasets: { [key: string]: dataset.DataGenerator } = {
  circle: dataset.classifyCircleData,
  xor: dataset.classifyXORData,
  gauss: dataset.classifyTwoGaussData,
  spiral: dataset.classifySpiralData,
  checkerboard: dataset.classifyCheckerboardData, // <-- Register here
};
```

---

## Step 3: Add Thumbnail Canvas in `index.html`

Open [`index.html`](file:///home/roxxy/dev/deeproxx/index.html). In the dataset thumbnail container (`#classify-datasets`), add a canvas with a matching `data-dataset` attribute:

```html
<canvas
  id="canvas-checkerboard"
  class="dataset-thumb"
  data-dataset="checkerboard"
  width="80"
  height="80"
  title="Checkerboard dataset"
  role="button"
  tabindex="0"
  aria-label="Checkerboard dataset">
</canvas>
```

---

## 4. Verification

1. Run `npm run build` to compile the application.
2. Launch `npm run serve-watch` or open `index.html`.
3. DeepRoxx's `renderThumbnails()` function will automatically render a static preview on your canvas.
4. Clicking your canvas will select the dataset, update the URL hash (`#dataset=checkerboard`), regenerate points, and reset the simulation.

