# DeepRoxx

> Interactive Neural Network Visualization — built from SRS v4.0

An interactive, browser-based neural network simulator. No server required.
Adjust hyperparameters, datasets, and architectures in real time to visualize how weights, biases, and decision boundaries evolve during training.

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # → dist/
npm test           # Run 30-assertion mathematical verification suite
```

---

## 🛠️ Development Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start webpack dev server with hot module reloading |
| `npm run build` | Compile optimized production bundles to `dist/` |
| `npm test` | Run core mathematical verification test suite |
| `npm run lint` | ESLint TypeScript static analysis |
| `npm run lint:fix` | Automatically fix ESLint and Prettier formatting |
| `npm run type-check` | TypeScript compiler type checking without emitting files |

---

## 📁 Project Structure

```
deeproxx/
├── src/
│   ├── nn.ts           ← Mathematical core (nodes, links, backprop, SGD)
│   ├── dataset.ts      ← Synthetic data generators (circle, XOR, gauss, spiral, regression)
│   ├── state.ts        ← URL hash serialization & global configuration registry
│   ├── playground.ts   ← Main orchestrator (events, training loop, D3 SVG)
│   ├── heatmap.ts      ← Canvas decision boundary renderer (30×30 grid)
│   ├── linechart.ts    ← Real-time scrolling D3 loss curve chart
│   └── seedrandom.d.ts ← TypeScript typings for deterministic PRNG
├── test/
│   └── verify.ts       ← 30-assertion mathematical & gradient verification suite
├── docs/
│   ├── primer.md       ← Beginner ML Primer from first principles
│   ├── labs/           ← 5 Classroom Student Worksheets & Teacher Answer Keys
│   ├── faq.md          ← General & Technical FAQ
│   ├── troubleshooting.md ← Decision tree & 6 common troubleshooting scenarios
│   ├── custom-dataset.md  ← 3-step guide for adding custom 2D datasets
│   ├── glossary.md     ← 60+ machine learning terms defined
│   └── api.md          ← Consolidated exported API reference
├── ARCHITECTURE.md     ← Architecture breakdown & SRS §59 mental model diagram
├── CONTRIBUTING.md     ← Contribution guidelines
├── CHANGELOG.md        ← Release notes
├── index.html          ← 4-column layout (Data | Features | Layers | Output)
├── styles.css          ← Design system (frosted glass pill nav, tokens)
├── package.json
├── tsconfig.json
└── webpack.config.js
```

---

## 🏛️ Architecture & Theory

See [`ARCHITECTURE.md`](file:///home/roxxy/dev/deeproxx/ARCHITECTURE.md) for the complete mental model diagram, state machine, and data flow specification.

---

## 📚 Educational Resources & Labs

- **[ML Primer](file:///home/roxxy/dev/deeproxx/docs/primer.md)**: Introduction to neurons, weights, biases, and loss.
- **[Classroom Labs](file:///home/roxxy/dev/deeproxx/docs/labs/)**: 5 worksheets with teacher answer keys and grading rubrics.
- **[Troubleshooting Guide](file:///home/roxxy/dev/deeproxx/docs/troubleshooting.md)**: Flowchart decision tree and diagnosis guide.
- **[Glossary](file:///home/roxxy/dev/deeproxx/docs/glossary.md)**: 60+ neural network and machine learning terms.
- **[Custom Dataset Guide](file:///home/roxxy/dev/deeproxx/docs/custom-dataset.md)**: Step-by-step dataset extension guide.
- **[API Reference](file:///home/roxxy/dev/deeproxx/docs/api.md)**: Full function signatures and exported module catalog.

---

## 🌐 Deployment

- **GitHub Pages**: Automated continuous deployment via `.github/workflows/deploy.yml`.
- **Netlify**: Continuous deployment: build command `npm run build`, publish directory `dist`.

---

## 📄 License

Apache 2.0 — see [`LICENSE`](file:///home/roxxy/dev/deeproxx/LICENSE).
