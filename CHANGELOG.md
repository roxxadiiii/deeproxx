# 📝 Changelog

All notable changes to **DeepRoxx** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-05

### Added
- **Mathematical Core Engine (`src/nn.ts`)**:
  - `Node` and `Link` representations with forward and backpropagation gradient accumulators.
  - Activation functions: Tanh, ReLU, Sigmoid, and Linear with exact derivatives.
  - Squared error loss function with derivative $a - y$.
  - L1 (Lasso) and L2 (Ridge) weight regularization with automatic L1 zero-crossing connection pruning (`isDead = true`).
  - Dynamic multi-layer network graph builder `buildNetwork()`.
- **Dataset Engine (`src/dataset.ts`)**:
  - Classification generators: Circle, XOR, Two Gaussian Clusters, and Spiral.
  - Regression generators: Linear Plane and Multi-peak Gaussian RBF.
  - Box-Muller normal sampling, uniform Fisher-Yates shuffle, and train/test splitting.
- **State Management & URL Serialization (`src/state.ts`)**:
  - URL hash bidirectional serialization supporting all hyperparameters and UI flags.
  - Deterministic pseudo-random seed generation via `seedrandom`.
- **Visualization Engines**:
  - Canvas 2D decision boundary rasterizer (`src/heatmap.ts`) across a $30 \times 30$ coordinate grid.
  - D3 SVG loss history curve chart (`src/linechart.ts`) with independent train/test curves.
  - D3 dynamic SVG network graph with cubic Bezier curves and weight-based stroke width/color.
  - Interactive hover card inspector for link weights and neuron biases.
  - Per-layer `+` and `−` neuron controls directly in SVG.
  - Live 2D canvas dataset preview thumbnails.
- **UI & Layout**:
  - Frosted glass floating pill top sub-nav bar with live epoch counter, play/pause, step, and reset controls.
  - 4-column responsive layout: Data, Features, Hidden Layers, and Output.
- **Documentation & Educational Artifacts (Phase 9)**:
  - System architecture document with complete mental model (`ARCHITECTURE.md`).
  - Beginner Machine Learning primer (`docs/primer.md`).
  - Five student lab worksheets and teacher answer keys with rubrics (`docs/labs/lab1.md` - `docs/labs/lab5.md`).
  - General and Technical FAQ (`docs/faq.md`).
  - Troubleshooting decision tree and 6 common failure scenarios (`docs/troubleshooting.md`).
  - Custom dataset creation guide (`docs/custom-dataset.md`).
  - 60+ term machine learning glossary (`docs/glossary.md`).
  - Comprehensive API reference (`docs/api.md`).
- **Testing & Tooling**:
  - Mathematical verification suite (`test/verify.ts`) with 30 passing assertions including numerical finite-difference gradient checks.
  - Full TypeScript, ESLint, and Prettier toolchain.

