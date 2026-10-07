# Deep Playground

> Interactive Neural Network Visualization — built from SRS v4.0

A browser-based neural network simulator. No server required.
Adjust hyperparameters, datasets, and architectures to see learning in real time.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # → dist/
```

## Development

| Command | Description |
|---|---|
| `npm run dev` | Start webpack dev server with HMR |
| `npm run build` | Production bundle → `dist/` |
| `npm run lint` | ESLint TypeScript |
| `npm run type-check` | TypeScript type check only |

## Project Structure

```
deeproxx/
├── src/
│   ├── nn.ts           ← Mathematical core (nodes, links, backprop)
│   ├── dataset.ts      ← Data generators (circle, XOR, gauss, spiral, regression)
│   ├── state.ts        ← URL hash serialization & global config
│   ├── playground.ts   ← Main orchestrator (events, training loop, D3 SVG)
│   ├── heatmap.ts      ← Canvas decision boundary renderer
│   ├── linechart.ts    ← D3 loss curve chart
│   └── seedrandom.d.ts ← Type declarations for seedrandom
├── index.html          ← 4-column layout (Data | Features | Layers | Output)
├── styles.css          ← Design system (CSS custom properties, flexbox layout)
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## Architecture

See `ARCHITECTURE.md` for the mental model diagram (SRS §59).

## Deployment

- **GitHub Pages**: automatic via `.github/workflows/deploy.yml`
- **Netlify**: set build=`npm run build`, publish=`dist`

## License

Apache 2.0 — see `LICENSE`