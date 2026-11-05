# 🤝 Contributing to DeepRoxx

Thank you for your interest in contributing to **DeepRoxx**! This project is an open-source, interactive neural network simulator designed for students and educators.

---

## 🛠️ Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/roxxadiiii/deeproxx.git
   cd deeproxx
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

4. **Run tests and linters:**
   ```bash
   npm run type-check   # TypeScript compiler verification
   npm run lint         # ESLint check
   npm test             # Core mathematical verification test suite
   npm run build        # Production Webpack build
   ```

---

## 🎨 Adding a Custom Dataset (3 Steps)

DeepRoxx is designed so that educators and students can add custom 2D synthetic datasets without touching the simulation loop or math engine:

1. **Implement Generator Function in [`src/dataset.ts`](file:///home/roxxy/dev/deeproxx/src/dataset.ts):**
   ```typescript
   export function classifyMyData(numSamples: number, noise: number): Example2D[] {
     const points: Example2D[] = [];
     for (let i = 0; i < numSamples; i++) {
       const x = Math.random() * 12 - 6;
       const y = Math.random() * 12 - 6;
       const label = (x * x + y * y > 4) ? 1 : -1;
       points.push({ x, y, label });
     }
     return points;
   }
   ```

2. **Register in [`src/state.ts`](file:///home/roxxy/dev/deeproxx/src/state.ts):**
   Add your function to the `datasets` lookup map (or `regDatasets` for regression):
   ```typescript
   export const datasets = {
     // ...
     mydata: dataset.classifyMyData
   };
   ```

3. **Add Thumbnail Canvas in [`index.html`](file:///home/roxxy/dev/deeproxx/index.html):**
   ```html
   <canvas class="dataset-thumb" data-dataset="mydata" width="80" height="80" title="My Dataset"></canvas>
   ```

DeepRoxx's thumbnail renderer and click handlers will automatically wire the new dataset into the UI and URL hash serializer!

---

## 📋 Pull Request Guidelines

- All pull requests must pass `npm run type-check`, `npm run lint`, and `npm test`.
- Keep changes surgical and adhere to the architectural guidelines in [`ARCHITECTURE.md`](file:///home/roxxy/dev/deeproxx/ARCHITECTURE.md).
- Follow conventional commit messages (e.g. `feat: ...`, `fix: ...`, `docs: ...`).

