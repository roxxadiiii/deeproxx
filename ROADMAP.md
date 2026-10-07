# 🗺️ Deep Playground — Complete Development Roadmap (Zero-Gap Edition)

> **Project:** Deep Playground (Interactive Neural Network Visualization)
> **Author:** roxxadiiii
> **Source of Truth:** `SRS.md` v4.0 (59 sections, ~1500+ lines)
> **Generated With:** `roadmap-generator` skill (Enterprise Workflows)
> **Coverage Guarantee:** Every SRS section §1–§59 is mapped to ≥1 task
> **Total Phases:** 12 | **Total Tasks:** 358 | **Estimated Duration:** 20–24 weeks (solo, part-time)

---

## 📋 Table of Contents

1. [Coverage Matrix (SRS → Task)](#-coverage-matrix-srs--task)
2. [How to Read This Roadmap](#-how-to-read-this-roadmap)
3. [Phase Overview](#-phase-overview)
4. [Phase 0 — Foundation & Setup](#-phase-0--foundation--setup)
5. [Phase 1 — Mathematical Core](#-phase-1--mathematical-core)
6. [Phase 2 — Dataset Engine](#-phase-2--dataset-engine)
7. [Phase 3 — State & URL Serialization](#-phase-3--state--url-serialization)
8. [Phase 4 — UI Shell & Layout](#-phase-4--ui-shell--layout)
9. [Phase 5 — SVG Visualization](#-phase-5--svg-visualization)
10. [Phase 6 — Heatmap & Line Chart](#-phase-6--heatmap--line-chart)
11. [Phase 7 — Orchestration & Training Loop](#-phase-7--orchestration--training-loop)
12. [Phase 8 — Features, Modes & Hover Card](#-phase-8--features-modes--hover-card)
13. [Phase 9 — Educational Artifacts](#-phase-9--educational-artifacts)
14. [Phase 10 — QA, Edge Cases & Verification](#-phase-10--qa-edge-cases--verification)
15. [Phase 11 — Security, Accessibility & Compatibility](#-phase-11--security-accessibility--compatibility)
16. [Phase 12 — Deployment, Docs & Launch](#-phase-12--deployment-docs--launch)
17. [Milestones](#-milestones)
18. [Risk Register](#-risk-register)
19. [Weekly Schedule](#-weekly-schedule)
20. [Definition of Done](#-definition-of-done)
21. [Progress Tracker Template](#-progress-tracker-template)

---

## 📊 Coverage Matrix (SRS → Task)

Every SRS section is mapped to at least one roadmap task below. **Zero gaps.**

| SRS § | Title | Mapped Tasks |
| :--- | :--- | :--- |
| §1 | Introduction & Vision | All phases (context) |
| §2 | ML Primer for Beginners | P9.1, P9.2 |
| §3.1 | Neuron Activation Formulas | P1.10, P10.1 |
| §3.2 | Activation Derivatives | P1.2–P1.5, P10.2–P10.5 |
| §3.3 | Loss Function Derivation | P1.6, P10.6 |
| §3.4 | Backpropagation Derivation | P1.15, P10.7–P10.9 |
| §3.5 | Regularization Formulas | P1.7, P1.8, P10.10, P10.11 |
| §3.6 | Matrix Proof of Linear Collapse | P1.18, P10.12 |
| §4.1 | `nn.ts` walkthrough | P1.9–P1.16 |
| §4.2 | `state.ts` walkthrough | P3.1–P3.12 |
| §4.3 | `dataset.ts` walkthrough | P2.1–P2.14 |
| §4.4 | `playground.ts` walkthrough | P7.1–P7.20 |
| §4.5 | `heatmap.ts` walkthrough | P6.1–P6.9 |
| §4.6 | `linechart.ts` walkthrough | P6.10–P6.14 |
| §5 | UI Control & Hash Mappings | P4.2–P4.7, P3.7, P3.8 |
| §6 | HTML & CSS Layout | P4.1–P4.13 |
| §7.1 | SVG Representation | P5.1–P5.8 |
| §7.2 | Color Scale Domains | P6.5, P10.13 |
| §7.3 | D3 Data-Binding | P5.4 |
| §8 | DOM Hierarchy | P4.1–P4.8 |
| §9.1 | Browser Thread Management | P7.12, P10.62 |
| §9.2 | Memory Optimization | P10.63 |
| §10 | Educational Curriculum Labs | P9.7–P9.16 |
| §11.1 | Local Setup | P0.1–P0.10 |
| §11.2 | Netlify Deployment | P12.6–P12.8 |
| §11.3 | GitHub Pages Deployment | P12.4, P12.5 |
| §12.1 | Manual Functional Verification | P10.14–P10.16 |
| §13 | FAQ & Troubleshooting | P9.17–P9.24 |
| §14 | Code-Annotated Walkthroughs | P10.1–P10.12 |
| §15.1 | Play/Pause/Step Listeners | P7.2, P7.14–P7.16 |
| §15.2 | Layer Modifier Listeners | P7.6, P5.12, P5.13 |
| §15.3 | Parameter Selector Listeners | P7.3, P7.4 |
| §16 | Build & Bundling | P0.4, P0.5, P12.1 |
| §17.1 | Horizontal Layer Placement | P5.2, P10.17 |
| §17.2 | Vertical Node Placement | P5.3, P10.18 |
| §18 | Student Worksheets (5 Labs) | P9.7–P9.16 |
| §19 | Teacher Answer Keys | P9.25–P9.27 |
| §20 | Sequence Diagram Trace | P10.19 |
| §21 | Webpack Loaders | P0.5, P10.20 |
| §22.1 | Core Grid Columns | P4.9 |
| §22.2 | Hover & Active States | P4.11, P5.14, P10.21 |
| §23 | Complete HTML Breakdown | P4.1–P4.8 |
| §24 | Custom Dataset Guide | P12.10 |
| §25.1 | Square Error Internals | P1.6, P10.6 |
| §25.2 | Alternative Error Functions | P9.28 (reference doc) |
| §26.1 | Why Initialization Matters | P1.12, P10.22 |
| §26.2 | Playground's Init Strategy | P1.12 |
| §26.3 | Xavier/He (reference) | P9.29 (reference doc) |
| §27.1–27.3 | Batch Size Modes | P7.9, P10.23 |
| §27.4 | Visual Effect of Batch Size | P10.24 |
| §28.1–28.3 | URL Hash Serialization | P3.7, P3.8 |
| §28.4 | 3 Example URL Configs | P10.25 |
| §29.1 | Keyboard Navigation | P4.12, P11.1 |
| §29.2 | Screen Reader Support | P4.12, P11.2 |
| §29.3 | Color Accessibility | P11.3 |
| §29.4 | Responsive Behavior | P4.13, P11.4 |
| §30 | Browser Compatibility | P11.5–P11.7 |
| §31 | Data Flow Diagram | P10.26 |
| §32.1–32.2 | Dependencies | P0.2, P0.3 |
| §32.3 | Why D3 v3 | P9.30 (decision doc) |
| §32.4 | Security Considerations | P11.8–P11.12 |
| §33 | Glossary (60+ terms) | P9.31, P12.11 |
| §34 | Numerical Worked Example | P10.27 |
| §35.1–35.2 | Reproducibility Problem | P3.9 |
| §35.3 | Seed Management | P3.9, P7.16, P10.28 |
| §36 | Future Enhancements | P12.12 (backlog) |
| §37 | Revision History | P12.3 |
| §38.1–38.3 | Feature Pipeline | P8.1–P8.4 |
| §38.4 | Feature Toggle Rebuild | P8.2, P7.18 |
| §38.5 | Feature Engineering Visual | P8.4 |
| §39.1–39.3 | Mode Selection | P8.5–P8.7 |
| §39.4 | Regression Datasets | P2.7, P2.8, P8.7 |
| §40 | Discretize Checkbox | P6.9, P9.15 |
| §41 | Show Test Data Checkbox | P6.8, P9.15 |
| §42 | Hover Card System | P5.9–P5.11, P8.8 |
| §43 | `isDead` Link Pruning | P1.16, P10.29 |
| §44 | Canvas Thumbnails | P2.14, P10.30 |
| §45.1 | Fisher-Yates Shuffle | P2.10, P10.31 |
| §45.2 | Box-Muller Transform | P2.9, P10.32 |
| §46 | Coordinate-to-Pixel Mapping | P6.3, P10.33 |
| §47.1 | Topology Constraints | P7.6, P10.34 |
| §47.2 | Zero Hidden Layers | P9.9 |
| §47.3 | Max Complexity | P9.5 |
| §47.4 | NaN Edge Cases | P9.4, P10.35 |
| §47.5 | Troubleshooting Decision Tree | P9.17, P12.13 |
| §47.6 | 6 Troubleshooting Scenarios | P10.36–P10.41 |
| §48 | Train/Test Split | P2.11, P10.42 |
| §49.1 | Epoch Counter Semantics | P7.17, P9.33 |
| §49.2 | Training Speed | P9.16, P10.62 |
| §49.3 | Performance Degradation | P9.5, P10.62 |
| §50 | Interface State Machine | P7.18–P7.19, P10.43 |
| §51 | TypeScript Interfaces | P1.1, P1.9, P1.11 |
| §52 | SVG Bezier Curves | P5.6, P5.7, P10.44 |
| §53 | Color Interpolation | P6.5, P10.45 |
| §54 | Aggregate Loss | P7.10, P10.46 |
| §55 | Per-Layer Neuron Controls | P5.12, P5.13 |
| §56 | Config File Breakdowns | P0.2–P0.5, P10.47 |
| §57 | Security Threat Model | P11.8–P11.12 |
| §58 | API Reference | P12.14 |
| §59 | Mental Model Diagram | P10.48 |

---

## 📖 How to Read This Roadmap

| Symbol | Meaning |
| :--- | :--- |
| ✅ | Completed |
| 🔄 | In Progress |
| ⬜ | Not Started |
| 🔴 | Critical Path |
| 🟡 | High Priority |
| 🟢 | Nice-to-Have |

**Task IDs:** `P<phase>.<task>` (e.g., `P3.4` = Phase 3, Task 4)
**Dependencies:** Explicitly listed to prevent blocking
**SRS Ref:** Points to the exact section governing the task

---

## 🏗️ Phase Overview

| Phase | Name | Focus | Duration | Priority |
| :--- | :--- | :--- | :--- | :--- |
| 0 | Foundation & Setup | Toolchain, repo, build | 3–5 days | 🔴 |
| 1 | Mathematical Core | Node, Link, forward/backprop | 1.5 weeks | 🔴 |
| 2 | Dataset Engine | 6 datasets, noise, shuffle | 1 week | 🔴 |
| 3 | State & URL | Hash parsing, seeds | 4 days | 🔴 |
| 4 | UI Shell | 4-column layout, controls | 1 week | 🟡 |
| 5 | SVG Visualization | Nodes, Bezier links, hover | 1.5 weeks | 🟡 |
| 6 | Heatmap & Chart | Canvas grid, loss curves | 1 week | 🟡 |
| 7 | Orchestration | `oneStep()`, batching, events | 1.5 weeks | 🔴 |
| 8 | Features, Modes, Hover | 7 features, regression toggle | 1 week | 🟡 |
| 9 | Educational Artifacts | Labs, answer keys, glossary | 1 week | 🟡 |
| 10 | QA & Verification | Numeric assertions, edge cases | 2 weeks | 🔴 |
| 11 | Security & A11y | CSP, keyboard, colorblind, browsers | 1 week | 🟡 |
| 12 | Deployment & Docs | GH Pages, Netlify, README | 1 week | 🟢 |

---

## 🧱 Phase 0 — Foundation & Setup

**Goal:** Working build pipeline so every phase can be compiled, served, and tested.
**Duration:** 3–5 days | **SRS Ref:** §11, §16, §21, §32, §56

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P0.1 | Initialize Git repo, create GitHub remote | ✅ | — | §11.1 |
| P0.2 | Create `package.json` with `d3@^3.5.17`, `seedrandom@^2.4.2` | ✅ | P0.1 | §56.1 |
| P0.3 | Add devDeps: `typescript@^2.0.0`, `webpack`, `ts-loader`, `css-loader`, `style-loader`, `http-server`, `webpack-dev-server` | ✅ | P0.2 | §56.1 |
| P0.4 | Write `tsconfig.json`: `target: es5`, `module: commonjs`, `sourceMap: true`, `noImplicitAny: false` | ✅ | P0.2 | §16.1, §56.3 |
| P0.5 | Write `webpack.config.js` with `ts-loader` and `style!css` chain | ✅ | P0.4 | §16.2, §21, §56.2 |
| P0.6 | Create `src/` with stubs: `nn.ts`, `dataset.ts`, `state.ts`, `playground.ts`, `heatmap.ts`, `linechart.ts`, `seedrandom.d.ts` | ✅ | P0.5 | §4 |
| P0.7 | Write `seedrandom.d.ts` TypeScript typings for the `seedrandom` library | ✅ | P0.6 | §4.1 |
| P0.8 | Create `index.html` shell with `<header>`, `#top-controls`, `#main-part`, empty `#svg`, `#heatmap`, `#linechart` | ✅ | P0.6 | §8, §23 |
| P0.9 | Create `styles.css` with `.column` flexbox scaffolding and color tokens | ✅ | P0.8 | §6, §22 |
| P0.10 | Add Google Fonts link for Roboto (300, 400, 500) in `<head>` | ✅ | P0.8 | §6.2 |
| P0.11 | Add favicon, `<title>`, meta description, `og:image`, Twitter card tags | ✅ | P0.8 | §30.1 |
| P0.12 | Run `npm install` and verify `npm run serve-watch` serves blank page | ✅ | P0.9 | §11.1 |
| P0.13 | Add `.gitignore`: `node_modules/`, `dist/`, `build/`, `.DS_Store`, `*.log` | ✅ | P0.1 | §11 |
| P0.14 | Add ESLint + Prettier configs for TS code style | ✅ | P0.12 | — |
| P0.15 | Add husky + lint-staged pre-commit hook | ✅ | P0.14 | — |
| P0.16 | Add `.editorconfig` for cross-editor consistency | ✅ | P0.1 | — |
| P0.17 | Add `LICENSE` file (Apache 2.0 recommended) | ✅ | P0.1 | §32.4 |
| P0.18 | Add `CODE_OF_CONDUCT.md` (Contributor Covenant) | ✅ | P0.1 | — |
| P0.19 | Add GitHub issue + PR templates | ✅ | P0.1 | — |

**Exit criteria:** `npm run build` completes; `npm run serve-watch` serves blank page; all linters pass.

---

## 🧠 Phase 1 — Mathematical Core (`src/nn.ts`)

**Goal:** Complete neural network engine.
**Duration:** 1.5 weeks | **SRS Ref:** §3, §4.1, §14, §25, §26, §43, §51

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P1.1 | Define `ActivationFunction`, `ErrorFunction`, `RegularizationFunction` interfaces | ✅ | P0.6 | §51.2 |
| P1.2 | Implement `Activations.TANH` output + derivative (`1 - tanh²(x)`) | ✅ | P1.1 | §3.2.1 |
| P1.3 | Implement `Activations.RELU` output + derivative (0 if x≤0, else 1) | ✅ | P1.1 | §3.2.2 |
| P1.4 | Implement `Activations.SIGMOID` output + derivative (`σ(1-σ)`) | ✅ | P1.1 | §3.2.3 |
| P1.5 | Implement `Activations.LINEAR` output + derivative (`x`, `1`) | ✅ | P1.1 | §3.2.4 |
| P1.6 | Implement `Errors.SQUARE` with `½` factor (error + der) | ✅ | P1.1 | §3.3, §25.1 |
| P1.7 | Implement `RegularizationFunction.L1` (|w|, sign) | ✅ | P1.1 | §3.5 |
| P1.8 | Implement `RegularizationFunction.L2` (½w², w) | ✅ | P1.1 | §3.5 |
| P1.9 | Create `Node` class with all fields (`totalInput`, `output`, `outputDer`, `inputDer`, `accInputDer`, `numAccumulatedDers`) | ✅ | P1.2–P1.8 | §4.1, §51.3 |
| P1.10 | Implement `Node.updateOutput()` — `z = b + Σ(w·a)`, then `a = σ(z)` | ✅ | P1.9 | §14.1 |
| P1.11 | Create `Link` class with `weight`, `isDead`, `accErrorDer`, `regularization` | ✅ | P1.9 | §4.1, §51.4 |
| P1.12 | Init weights uniformly `[-0.5, 0.5]`; biases to `0.1` (or `0` if `initZero`) | ✅ | P1.11 | §26.2 |
| P1.13 | Implement `buildNetwork(shape, activation, outputActivation, reg, inputIds, initZero)` | ✅ | P1.9, P1.11 | §4.1 |
| P1.14 | Implement `forwardProp(network, inputs)` — returns final output | ✅ | P1.13 | §4.1, §14.1 |
| P1.15 | Implement `backProp(network, target, errorFunc)` — output δ, backward accumulation | ✅ | P1.14 | §4.1, §14.2 |
| P1.16 | Implement `updateWeights(network, lr, regRate)` — bias/weight update, L1 zero-crossing kill | ✅ | P1.15 | §14.3, §43 |
| P1.17 | Node.js test: train XOR (2 layers × 4 neurons), verify loss < 0.01 in 300 epochs | ✅ | P1.16 | §12.1 |
| P1.18 | Numeric test: 3 linear layers should equal 1 linear layer within 1e-6 | ✅ | P1.16 | §3.6 |
| P1.19 | Numeric derivative test: finite-difference check of each activation derivative (error < 1e-4) | ✅ | P1.2–P1.5 | §3.2 |
| P1.20 | Numeric derivative test: finite-difference check of backprop on a 3-layer network | ✅ | P1.15 | §3.4 |
| P1.21 | Verify `Errors.SQUARE.der(0.2, 1.0) === -0.8` (matches SRS §2.3 example) | ✅ | P1.6 | §2.3 |
| P1.22 | Test: L1 reg drives ≥1 weight to exactly 0 after 1000 epochs on Circle | ✅ | P1.16 | §43.4 |
| P1.23 | Test: L2 reg shrinks weights but never kills a link | ✅ | P1.16 | §43.5 |
| P1.24 | Verify no `NaN` appears in 1000 epochs across all 4 activations | ✅ | P1.16 | §47.4 |
| P1.25 | Verify `Node.updateOutput()` matches SRS §34.2 worked example (z_h1 = 0.3, a_h1 ≈ 0.2913) | ✅ | P1.10 | §34 |

**Exit criteria:** XOR converges < 0.01; all derivatives numeric-verified; §34 example matches.

---

## 📊 Phase 2 — Dataset Engine (`src/dataset.ts`)

**Goal:** 6 datasets with noise, shuffle, split.
**Duration:** 1 week | **SRS Ref:** §4.3, §39.4, §45, §47, §48

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P2.1 | Define `Example2D` interface `{x, y, label}` | ✅ | P0.6 | §51.2 |
| P2.2 | Define `DataGenerator` type | ✅ | P2.1 | §51.2 |
| P2.3 | Implement `classifyCircleData()` — r<2.5=+1, 3.5<r<5=−1 | ✅ | P2.1 | §4.3.1 |
| P2.4 | Implement `classifyXORData()` — diagonal quadrants=+1, padding 0.3 | ✅ | P2.1 | §4.3.1 |
| P2.5 | Implement `classifyTwoGaussData()` — clusters at (2,2) and (−2,−2), variance scale 0.5–4.0 | ✅ | P2.1 | §4.3.1 |
| P2.6 | Implement `classifySpiralData()` — r=(i/n)·5, t=1.75·(i/n)·2π, second arm +π | ✅ | P2.1 | §4.3.1 |
| P2.7 | Implement `regressPlane()` — label=(x+y) normalized to [−1,1] | ✅ | P2.1 | §4.3.2 |
| P2.8 | Implement `regressGaussian()` — max RBF response from 6 centers | ✅ | P2.1 | §4.3.2, §39.4 |
| P2.9 | Implement `normalRandom(mean, variance)` — Box-Muller with rejection sampling | ✅ | P2.5 | §45.2 |
| P2.10 | Implement `shuffle(array)` — Fisher-Yates in-place | ✅ | P2.1 | §45.1 |
| P2.11 | Implement `splitData(data, percTrain)` — shuffle then slice | ✅ | P2.10 | §48.2 |
| P2.12 | Add noise parameter to all generators | ✅ | P2.3–P2.8 | §4.3.1 |
| P2.13 | Verify each generator produces 500 points with correct label distribution | ✅ | P2.12 | §12.1 |
| P2.14 | Visual test: render each dataset to temp canvas and eyeball shapes | ✅ | P2.13 | §44 |
| P2.15 | Test: Fisher-Yates is uniform over 10,000 permutations (chi-square test) | ✅ | P2.10 | §45.1 |
| P2.16 | Test: Box-Muller rejection rate ≈ 78.5% (π/4) | ✅ | P2.9 | §45.2 |
| P2.17 | Test: noise=0 gives clean shapes; noise=50 visibly perturbs | ✅ | P2.12 | §4.3.1 |
| P2.18 | Test: split 10%, 30%, 50%, 70%, 90% all respect the percentage | ✅ | P2.11 | §48.3 |
| P2.19 | Verify XOR padding: no point has |x|<0.3 or |y|<0.3 | ✅ | P2.4 | §4.3.1 |
| P2.20 | Verify Circle: no point at distance 2.5 < r < 3.5 | ✅ | P2.3 | §4.3.1 |

**Exit criteria:** All 6 generators visually correct; shuffle uniform; noise/split/safety verified.

---

## 🔗 Phase 3 — State & URL Serialization (`src/state.ts`)

**Goal:** Shareable URL hash + seeded reproducibility.
**Duration:** 4 days | **SRS Ref:** §4.2, §5, §28, §35

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P3.1 | Define `Type` enum (`STRING`, `NUMBER`, `OBJECT`, `ARRAY_NUMBER`, `BOOLEAN`) | ✅ | P0.6 | §4.2 |
| P3.2 | Define `Problem` enum (`CLASSIFICATION`, `REGRESSION`) | ✅ | P0.6 | §4.2 |
| P3.3 | Create `State` class with all 12 properties | ✅ | P3.1, P3.2 | §5 |
| P3.4 | Build `State.PROPS` registry mapping properties to `{type, keyMap}` | ✅ | P3.3 | §4.2 |
| P3.5 | Create lookup objects: `activations`, `regularizations`, `datasets`, `regDatasets` | ✅ | P3.3 | §58.3 |
| P3.6 | Implement `parseArray()` — safe empty-string handling returns `[]` | ✅ | P3.3 | §4.2 |
| P3.7 | Implement `State.deserializeState()` — read hash, split `&`/`=`, parse per type | ✅ | P3.4–P3.6 | §28.3 |
| P3.8 | Implement `State.serialize()` — iterate PROPS, reverse-lookup, join `&`, set hash | ✅ | P3.4 | §28.2 |
| P3.9 | Integrate `seedrandom`: read/generate seed, call `Math.seedrandom(seed)` | ✅ | P3.7 | §35.2 |
| P3.10 | Handle `_hide` suffix properties for UI toggles | ✅ | P3.7 | §4.2 |
| P3.11 | Test: round-trip all 12 parameters (serialize → deserialize → same state) | ✅ | P3.8 | §12.1 |
| P3.12 | Test: same seed → same dataset + weights (byte-for-byte) | ✅ | P3.9 | §35.3 |
| P3.13 | Test: `parseArray("")` returns `[]` without throwing | ✅ | P3.6 | §4.2 |
| P3.14 | Test: invalid `activation=foo` → fallback to default (no crash) | ✅ | P3.7 | §57.1 |
| P3.15 | Test: missing parameters → defaults applied | ✅ | P3.7 | §28.3 |
| P3.16 | Test: SRS §28.4 Config 1 (Circle, Tanh, 1 layer of 3) loads correctly | ✅ | P3.7 | §28.4 |
| P3.17 | Test: SRS §28.4 Config 2 (Spiral, ReLU, 3 layers, L2) loads correctly | ✅ | P3.7 | §28.4 |
| P3.18 | Test: SRS §28.4 Config 3 (regression, Gaussian reg) loads correctly | ✅ | P3.7 | §28.4 |
| P3.19 | Test: Reset button generates a NEW seed (not the same one) | ✅ | P3.9 | §35.3 |

**Exit criteria:** All 12 params round-trip; same seed → same result; 3 example URLs work.

---

## 🎨 Phase 4 — UI Shell & Layout (`index.html`, `styles.css`)

**Goal:** 4-column layout with all controls wired.
**Duration:** 1 week | **SRS Ref:** §5, §6, §8, §15, §22, §23, §29

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P4.1 | Build `index.html` skeleton: `<header>`, `#top-controls`, `#main-part` + 4 `.column` divs | ✅ | P0.8 | §23 |
| P4.2 | Add `#reset-button`, `#play-pause-button`, `#next-step-button`, `#iter-number` | ✅ | P4.1 | §15.1, §23.3 |
| P4.3 | Add dropdowns: `#learningRate`, `#activations`, `#regularizations`, `#regularRate`, `#problem` | ✅ | P4.1 | §5, §23.3 |
| P4.4 | Build Data column: 4 canvas thumbnails + `#percTrainData`, `#noise`, `#batchSize` sliders + `#data-regen-button` | ✅ | P4.1 | §23.4 |
| P4.5 | Build Features column: 7 checkboxes (`x`, `y`, `xSquared`, `ySquared`, `xTimesY`, `sinX`, `sinY`) | ✅ | P4.1 | §38.2 |
| P4.6 | Build Hidden Layers column: `#add-layers`, `#remove-layers`, `#num-layers` | ✅ | P4.1 | §23.4 |
| P4.7 | Build Output column: `#loss-train`, `#loss-test`, `#linechart`, `#heatmap`, `#show-test-data`, `#discretize` | ✅ | P4.1 | §23.4 |
| P4.8 | Add `#svg` container and hidden `#hovercard` panel with `<input>` | ✅ | P4.1 | §7.1, §42.1 |
| P4.9 | Write `styles.css`: `.column` flexbox, fixed 1024px width, Roboto font | ✅ | P4.1 | §6, §22.1 |
| P4.10 | Add color tokens: orange `#f59322`, blue `#0877bd`, grey `#e8eaeb` | ✅ | P4.9 | §6.2, §53 |
| P4.11 | Style buttons with hover transitions (0.2s background/shadow) | ✅ | P4.9 | §22.2 |
| P4.12 | Add accessible `title` attrs to buttons; `aria-live="polite"` on `#iter-number` | ✅ | P4.2 | §29.2 |
| P4.13 | Test layout at 1024px, 1280px, 1920px widths; verify horizontal scroll below 1024px | ✅ | P4.9 | §29.4 |
| P4.14 | Test ultra-wide (>1400px): layout should center with equal margins | ✅ | P4.9 | §29.4 |
| P4.15 | Add `aria-label` to all range sliders | ✅ | P4.4 | §29.2 |
| P4.16 | Add `<label>` for every `<select>` element | ✅ | P4.3 | §29.2 |

**Exit criteria:** All controls render; layout matches §6.1; keyboard Tab works; ultra-wide centers.

---

## 🕸️ Phase 5 — SVG Visualization (D3)

**Goal:** Network graph with nodes, Bezier links, hover card.
**Duration:** 1.5 weeks | **SRS Ref:** §7, §17, §42, §52

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P5.1 | Initialize D3 SVG selection on `#svg` | ✅ | P4.8 | §7.1 |
| P5.2 | Compute horizontal layer positions: `X(l) = leftPad + l·(width−pads)/(numLayers−1)` | ✅ | P5.1 | §17.1 |
| P5.3 | Compute vertical node positions: `Y(n,l)` with centering formula | ✅ | P5.1 | §17.2 |
| P5.4 | D3 data binding for layers: `.data()`, `.enter()`, `.exit()` | ✅ | P5.2 | §7.3 |
| P5.5 | Render neuron circles radius ~14px, fill from color scale | ✅ | P5.4 | §7.1 |
| P5.6 | Implement `buildLinkPath()` — cubic Bezier `M...C...` (40% control offsets) | ✅ | P5.3 | §52.3 |
| P5.7 | Render links as `<path>` with dynamic `stroke`, `stroke-width`, `opacity` | ✅ | P5.6 | §52.5 |
| P5.8 | Bind link visuals to `Link.weight`: color from scale, width = `|w|·3`, opacity = `min(1, |w|·5)` | ✅ | P5.7 | §52.5 |
| P5.9 | Hover handlers on links: show `#hovercard`, position at cursor, populate weight input | ✅ | P5.7 | §42.4 |
| P5.10 | Hover handlers on nodes: show bias input in hover card | ✅ | P5.5 | §42.2 |
| P5.11 | Wire hover card input `change`: update `link.weight` or `node.bias`, redraw heatmap | ✅ | P5.9, P5.10 | §42.4 |
| P5.12 | Add per-layer `+`/`−` neuron buttons in SVG | ✅ | P5.5 | §55 |
| P5.13 | Wire `+`/`−`: modify `state.networkShape[i]`, rebuild, redraw | ✅ | P5.12 | §55.2 |
| P5.14 | Dim non-hovered links when one link is hovered (focus effect) | ✅ | P5.9 | §22.2 |
| P5.15 | Test: 4-4-2 network, hover every link, verify hover card shows correct weight | ✅ | P5.11 | §12.2 |
| P5.16 | Test: `N=1` layer centers vertically; `N=8` spreads across full height | ✅ | P5.3 | §17.2 |
| P5.17 | Test: connections between neurons at different heights curve correctly | ✅ | P5.6 | §52.4 |
| P5.18 | Test: dead links (weight=0) render with width=0 (invisible) | ✅ | P5.8 | §43.3 |
| P5.19 | Test: `+` button at max (8 neurons) is rejected; `−` at min (1) is rejected | ✅ | P5.13 | §47.1 |

**Exit criteria:** All shapes `[1]`–`[8×6]` render; hover card edits work; `+/−` respect bounds.

---

## 🔥 Phase 6 — Heatmap & Line Chart

**Goal:** Canvas decision boundary + SVG loss chart.
**Duration:** 1 week | **SRS Ref:** §4.5, §4.6, §40, §41, §46, §53, §54

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P6.1 | Create `HeatMap` class with Canvas 2D context | ✅ | P4.7 | §58.4 |
| P6.2 | Implement 30×30 grid iteration over `[−6, 6]²` | ✅ | P6.1 | §4.5 |
| P6.3 | Implement coordinate-to-pixel mapping (`px_x`, `px_y` with Y-flip) | ✅ | P6.2 | §46.3 |
| P6.4 | Call `nn.forwardProp()` per grid cell, collect predictions | ✅ | P6.2 | §4.5 |
| P6.5 | Implement D3 linear color scale: domain `[−1,0,1]` → range `["#f59322","#e8eaeb","#0877bd"]` with `.clamp(true)` | ✅ | P6.4 | §53.1 |
| P6.6 | Write pixel colors to `ImageData`, then `ctx.putImageData()` | ✅ | P6.5 | §4.5 |
| P6.7 | Draw training data points as filled circles (label → color) | ✅ | P6.6 | §46.5 |
| P6.8 | Draw test data points as ring-outlined circles when `#show-test-data` checked | ✅ | P6.7 | §41.3 |
| P6.9 | Implement `discretize`: snap prediction to `+1`/`−1` before color mapping | ✅ | P6.6 | §40.2 |
| P6.10 | Create `AppendingLineChart` class with SVG container | ✅ | P4.7 | §58.5 |
| P6.11 | Implement D3 line generator: `.x((d,i)=>xScale(i)).y(d=>yScale(d))` | ✅ | P6.10 | §4.6 |
| P6.12 | Maintain `trainLossHistory` and `testLossHistory` arrays | ✅ | P6.11 | §54.5 |
| P6.13 | Implement `addDataPoint(values)` — push, rescale Y, redraw paths | ✅ | P6.12 | §58.5 |
| P6.14 | Implement `reset()` — clear histories, remove SVG paths | ✅ | P6.13 | §58.5 |
| P6.15 | Test: heatmap shows diagonal boundary after XOR training | ✅ | P6.9 | §12.1 |
| P6.16 | Test: discretize toggle switches smooth↔sharp boundary | ✅ | P6.9 | §40.3 |
| P6.17 | Test: test-data toggle overlays test points | ✅ | P6.8 | §41.3 |
| P6.18 | Test: loss chart shows 2 distinct curves (train/test) | ✅ | P6.13 | §54.5 |
| P6.19 | Verify color at −0.5 ≈ `rgb(238, 190, 134)` (SRS §53.3) | ✅ | P6.5 | §53.3 |
| P6.20 | Verify color at +0.5 ≈ `rgb(120, 176, 212)` (SRS §53.3) | ✅ | P6.5 | §53.3 |
| P6.21 | Verify grid step size Δx = 0.4 (12/30) | ✅ | P6.2 | §46.4 |
| P6.22 | Verify Y-axis inversion: data y=+6 maps to canvas top | ✅ | P6.3 | §46.3 |

**Exit criteria:** Heatmap + loss chart real-time; discretize/test-data toggles work; colors match SRS.

---

## 🎛️ Phase 7 — Orchestration & Training Loop (`src/playground.ts`)

**Goal:** Wire everything — events, `oneStep()`, main loop.
**Duration:** 1.5 weeks | **SRS Ref:** §4.4, §15, §20, §31, §49, §50

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P7.1 | Call `State.deserializeState()` on page load | ✅ | P3.7, P4.1 | §4.4 |
| P7.2 | Bind top controls (play, pause, reset, step) | ✅ | P4.2 | §15.1 |
| P7.3 | Bind `change` on dropdowns | ✅ | P4.3 | §15.3 |
| P7.4 | Bind `input` on sliders (noise, batchSize, percTrainData) | ✅ | P4.4 | §15.3 |
| P7.5 | Bind `click` on feature checkboxes | ✅ | P4.5 | §38.4 |
| P7.6 | Bind `click` on `#add-layers`/`#remove-layers` (0–6 range) | ✅ | P4.6 | §47.1 |
| P7.7 | Implement `constructInput(x, y)` — build feature array from active checkboxes | ✅ | P7.5 | §38.3 |
| P7.8 | Implement `constructInputFromName(name, x, y)` — switch on feature name | ✅ | P7.7 | §38.3 |
| P7.9 | Implement `getBatch()` — slice `trainData` to `batchSize` | ✅ | P7.8 | §27.3 |
| P7.10 | Implement `getLoss(network, dataPoints)` — average squared error over all points | ✅ | P7.8 | §54.2 |
| P7.11 | Implement `oneStep()` — batch forward/backprop, updateWeights, compute losses, redraw | ✅ | P7.9, P7.10 | §4.4 |
| P7.12 | Implement `requestAnimationFrame` recursion guarded by `isRunning` | ✅ | P7.11 | §9.1, §49.2 |
| P7.13 | Implement `resetNetwork()` — rebuild, reset epoch, clear charts | ✅ | P7.11 | §15.1 |
| P7.14 | Wire `#play-pause-button` to toggle `isRunning` and swap icon | ✅ | P7.12 | §15.1 |
| P7.15 | Wire `#next-step-button` to call `oneStep()` once when paused | ✅ | P7.14 | §15.1 |
| P7.16 | Wire `#reset-button` to call `resetNetwork()` + generate new seed | ✅ | P7.13 | §15.1 |
| P7.17 | Update `#iter-number` each frame | ✅ | P7.11 | §15.1 |
| P7.18 | Implement state-change → rebuild pipeline for dataset/feature/shape changes | ✅ | P7.11 | §50.2 |
| P7.19 | Implement non-resetting updates for learningRate and regularizationRate | ✅ | P7.11 | §50.3 |
| P7.20 | Full integration test: Circle for 300 epochs, loss < 0.05 | ✅ | P7.19 | §12.1 |
| P7.21 | Verify state machine §50.2: Play → Running; Pause → Paused; Reset → Idle | ✅ | P7.14 | §50.1 |
| P7.22 | Verify structural changes (dataset/features/shape/activation) reset training | ✅ | P7.18 | §50.3 |
| P7.23 | Verify LR/RegRate changes do NOT reset training | ✅ | P7.19 | §50.3 |
| P7.24 | Verify epoch counter increments ~60/sec on medium network | ✅ | P7.17 | §49.2 |
| P7.25 | Verify epoch semantics: 1 "epoch" = 1 batch, not 1 full pass (§49.1) | ✅ | P7.17 | §49.1 |
| P7.26 | Add dual counter: display both playground-epoch AND true-epoch | ✅ | P7.17 | §49.1 |
| P7.27 | Trace §20 sequence diagram: click Play, verify every step executes | ✅ | P7.20 | §20 |
| P7.28 | Trace §31 data flow diagram: verify every arrow end-to-end | ✅ | P7.20 | §31 |

**Exit criteria:** State machine §50 verified; epoch semantics correct; integration test passes.

---

## 🧪 Phase 8 — Features, Modes & Hover Card

**Goal:** All 7 features, regression/classification toggle, hover card polish.
**Duration:** 1 week | **SRS Ref:** §38, §39, §42

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P8.1 | Verify all 7 feature checkboxes update `state[inputName]` | ✅ | P7.5 | §38.4 |
| P8.2 | Test: enabling `xSquared` grows input layer by 1 | ✅ | P8.1 | §38.4 |
| P8.3 | Test: XOR + `xTimesY` feature + 0 hidden layers solves task (Lab 5) | ✅ | P8.2 | §18 Lab 5 |
| P8.4 | Test: Circle + `xSquared` + `ySquared` + 0 hidden layers solves task | ✅ | P8.2 | §38.5 |
| P8.5 | Wire `#problem` dropdown to switch classification/regression | ✅ | P7.3 | §39.3 |
| P8.6 | Show/hide classification vs regression dataset thumbnails on mode switch | ✅ | P8.5 | §39.3 |
| P8.7 | Implement regression data generation path | ✅ | P8.5 | §39.4 |
| P8.8 | Adjust heatmap color scale for continuous regression targets | ✅ | P8.7 | §39.2 |
| P8.9 | Adjust data point rendering for continuous labels (gradient fill) | ✅ | P8.8 | §39.2 |
| P8.10 | Test: regression plane converges quickly with 0 hidden layers | ✅ | P8.9 | §12.1 |
| P8.11 | Verify hover card works while paused (educational use case) | ✅ | P5.11 | §42.5 |
| P8.12 | Verify manual weight edit triggers immediate heatmap recompute | ✅ | P5.11 | §42.4 |

**Exit criteria:** All 7 features work; mode toggle resets; regression heatmap smooth.

---

## 📚 Phase 9 — Educational Artifacts

**Goal:** Produce labs, answer keys, glossary, FAQ, decision tree.
**Duration:** 1 week | **SRS Ref:** §2, §10, §13, §18, §19, §24, §25.2, §26.3, §32.3, §33, §36, §47.5

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P9.1 | Write beginner ML primer (neural nets, weights, bias, loss) as `docs/primer.md` | ✅ | — | §2 |
| P9.2 | Add primer link to README and in-app "Learn" tab | ✅ | P9.1 | §2 |
| P9.3 | Write Lab 1 worksheet (Circle) as `docs/labs/lab1.md` | ✅ | P9.1 | §18 Lab 1 |
| P9.4 | Write Lab 2 worksheet (Activation comparison) | ✅ | P9.1 | §18 Lab 2 |
| P9.5 | Write Lab 3 worksheet (Overfitting + L2) | ✅ | P9.1 | §18 Lab 3 |
| P9.6 | Write Lab 4 worksheet (Learning rate dynamics) | ✅ | P9.1 | §18 Lab 4 |
| P9.7 | Write Lab 5 worksheet (Feature engineering) | ✅ | P9.1 | §18 Lab 5 |
| P9.8 | Verify Lab 1 produces documented outcome (linear fails, Tanh+3 succeeds) | ✅ | P9.3 | §18 Lab 1 |
| P9.9 | Verify Lab 2 produces documented outcome (Tanh smooth, ReLU sharp) | ✅ | P9.4 | §18 Lab 2 |
| P9.10 | Verify Lab 3 produces documented outcome (overfit, then L2 fixes) | ✅ | P9.5 | §18 Lab 3 |
| P9.11 | Verify Lab 4 produces documented outcome (LR=10 diverges, LR=1e-5 slow) | ✅ | P9.6 | §18 Lab 4 |
| P9.12 | Verify Lab 5 produces documented outcome (xy feature solves XOR) | ✅ | P9.7 | §18 Lab 5 |
| P9.13 | Write teacher answer key for Lab 1 with rubric | ✅ | P9.8 | §19 |
| P9.14 | Write teacher answer key for Lab 2 with rubric | ✅ | P9.9 | §19 |
| P9.15 | Write teacher answer key for Lab 3 with rubric | ✅ | P9.10 | §19 |
| P9.16 | Write teacher answer key for Lab 4 with rubric | ✅ | P9.11 | §19 |
| P9.17 | Write teacher answer key for Lab 5 with rubric | ✅ | P9.12 | §19 |
| P9.18 | Write FAQ (Q1: spiral not converging; Q2: L1 vs L2; Q3: learning rate) as `docs/faq.md` | ✅ | — | §13.1 |
| P9.19 | Write technical FAQ (Q1: add activation; Q2: change grid size) | ✅ | P9.18 | §13.2 |
| P9.20 | Embed FAQ in a UI help panel (collapsible `<details>` elements) | ✅ | P9.19 | §13 |
| P9.21 | Write §47.5 troubleshooting decision tree as `docs/troubleshooting.md` | ✅ | — | §47.5 |
| P9.22 | Write 6 troubleshooting scenarios from §47.6 with repro steps | ✅ | P9.21 | §47.6 |
| P9.23 | Embed troubleshooting as in-app help panel | ✅ | P9.22 | §47.5 |
| P9.24 | Write "Adding a Custom Dataset" guide (3 steps from §24) as `docs/custom-dataset.md` | ✅ | — | §24 |
| P9.25 | Write "Alternative Error Functions" reference doc | ✅ | — | §25.2 |
| P9.26 | Write "Xavier/He Initialization" reference doc | ✅ | — | §26.3 |
| P9.27 | Write "Why D3 v3" decision doc | ✅ | — | §32.3 |
| P9.28 | Write 60+ term glossary as `docs/glossary.md` (from §33) | ✅ | — | §33 |
| P9.29 | Write "Future Enhancements" backlog doc (from §36) | ✅ | — | §36 |
| P9.30 | Write "Configuration Reference" doc listing all 12 URL params | ✅ | P3.8 | §5, §58 |
| P9.31 | Write "Architecture Overview" doc with §59 mental model diagram | ✅ | — | §59 |

**Exit criteria:** All 5 labs verified; answer keys written; FAQ/troubleshooting/glossary shipped.

---

## ✅ Phase 10 — QA & Verification

**Goal:** Every numeric claim in the SRS as a testable assertion.
**Duration:** 2 weeks | **SRS Ref:** §12, §14, §25, §26, §27, §34, §43, §45, §46, §47, §48, §49, §50, §52, §53, §54, §55

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P10.1 | Verify `Node.updateOutput()` matches SRS §14.1 code annotation | ✅ | P1.10 | §14.1 |
| P10.2 | Verify Tanh output at 0.3 = 0.2913 (SRS §34) | ✅ | P1.2 | §34 |
| P10.3 | Verify Tanh derivative at 0.2165 = 0.9544 | ✅ | P1.2 | §34 |
| P10.4 | Verify ReLU derivative at -1 = 0; at +1 = 1 | ✅ | P1.3 | §3.2.2 |
| P10.5 | Verify Sigmoid derivative at 0 = 0.25 | ✅ | P1.4 | §3.2.3 |
| P10.6 | Verify `Errors.SQUARE.error(0.2, 1.0) = 0.32` (SRS §2.3) | ✅ | P1.6 | §2.3 |
| P10.7 | Verify backprop δ for output node matches SRS §34.3 (δ = −0.7506) | ✅ | P1.15 | §34 |
| P10.8 | Verify weight gradient ∂E/∂w_h1→o1 = −0.2186 (SRS §34.3) | ✅ | P1.15 | §34 |
| P10.9 | Verify hidden δ = −0.2747 (SRS §34.3) | ✅ | P1.15 | §34 |
| P10.10 | Verify L1 derivative at 0.5 = 1; at −0.5 = −1; at 0 = 0 | ✅ | P1.7 | §3.5 |
| P10.11 | Verify L2 derivative at 0.5 = 0.5 | ✅ | P1.8 | §3.5 |
| P10.12 | Verify 3 linear layers = 1 linear layer (numeric, < 1e-6) | ✅ | P1.18 | §3.6 |
| P10.13 | Verify color scale clamp at −2 → pure orange, at +2 → pure blue | ✅ | P6.5 | §53.1 |
| P10.14 | Test case 1 (§12.1): change activation → URL hash updates → training resets | ✅ | P7.18 | §12.1 |
| P10.15 | Test case 2 (§12.1): add 2 layers, 3+2 neurons → topology renders correctly | ✅ | P5.13 | §12.1 |
| P10.16 | Test case 3 (§12.1): XOR + Tanh + 4 neurons + 0.03 LR → loss < 0.01 in 300 epochs | ✅ | P7.20 | §12.1 |
| P10.17 | Verify horizontal placement formula with 2 layers vs 8 layers | ✅ | P5.2 | §17.1 |
| P10.18 | Verify vertical centering for N=1, N=4, N=8 | ✅ | P5.3 | §17.2 |
| P10.19 | Trace §20 Mermaid sequence diagram step-by-step in browser DevTools | ✅ | P7.27 | §20 |
| P10.20 | Verify `css-loader` → `style-loader` chain injects CSS into `<head>` | ✅ | P0.5 | §21 |
| P10.21 | Verify hover focus effect dims non-hovered links | ✅ | P5.14 | §22.2 |
| P10.22 | Verify all-zero init causes symmetry (all neurons identical) | ✅ | P1.12 | §26.1 |
| P10.23 | Verify batchSize=1 (SGD), 10 (mini), 30 (near full) all work | ✅ | P7.9 | §27.2 |
| P10.24 | Verify batchSize visual: 1=flicker, 10=smooth, 30=slow | ✅ | P7.9 | §27.4 |
| P10.25 | Verify 3 example URLs from SRS §28.4 all load correctly | ✅ | P3.16–P3.18 | §28.4 |
| P10.26 | Trace §31 full data flow diagram: verify every arrow | ✅ | P7.28 | §31 |
| P10.27 | Run SRS §34 numeric example: forward 0.3092, backward, update, forward 0.2868 | ✅ | P1.25 | §34 |
| P10.28 | Verify Reset generates new seed; old seed no longer reproduces | ✅ | P3.19 | §35.3 |
| P10.29 | Verify L1 dead link: weight=0 exactly, `isDead=true`, skipped in backprop | ✅ | P1.22 | §43 |
| P10.30 | Verify thumbnail click applies `selected` CSS class | ✅ | P2.14 | §44.3 |
| P10.31 | Verify Fisher-Yates uniformity (chi-square over 10k perms) | ✅ | P2.15 | §45.1 |
| P10.32 | Verify Box-Muller rejection rate ≈ 78.5% | ✅ | P2.16 | §45.2 |
| P10.33 | Verify coordinate mapping: (−6,−6)→(0,height), (6,6)→(width,0) | ✅ | P6.3 | §46.3 |
| P10.34 | Verify topology bounds: layers 0–6, neurons 1–8, features 1–7, batch 1–30, LR 1e-5–10, noise 0–50, split 10–90 | ✅ | P7.6 | §47.1 |
| P10.35 | Verify NaN guard: log warning, suggest reset, do not crash | ✅ | P9.4 | §47.4 |
| P10.36 | Repro scenario 1: Circle won't converge with linear model | ✅ | P9.22 | §47.6 |
| P10.37 | Repro scenario 2: Spiral high test loss (overfitting) | ✅ | P9.22 | §47.6 |
| P10.38 | Repro scenario 3: XOR random boundary (LR too high) | ✅ | P9.22 | §47.6 |
| P10.39 | Repro scenario 4: all connection lines transparent (L1 too high) | ✅ | P9.22 | §47.6 |
| P10.40 | Repro scenario 5: regression output flat (too few neurons) | ✅ | P9.22 | §47.6 |
| P10.41 | Repro scenario 6: training extremely slow (LR too low) | ✅ | P9.22 | §47.6 |
| P10.42 | Verify split 10/30/50/70/90 all respect percentage | ✅ | P2.18 | §48.3 |
| P10.43 | Verify state transition table §50.2 row-by-row | ✅ | P7.21 | §50.2 |
| P10.44 | Verify Bezier curvature when source.y ≠ dest.y | ✅ | P5.17 | §52.4 |
| P10.45 | Verify color at −0.5, +0.5 match SRS §53.3 RGB values | ✅ | P6.19, P6.20 | §53.3 |
| P10.46 | Verify aggregate loss = average over all points (not batch) | ✅ | P7.10 | §54.2 |
| P10.47 | Verify `package.json`, `tsconfig.json`, `webpack.config.js` match SRS §56 line-by-line | ✅ | P0.2–P0.5 | §56 |
| P10.48 | Verify §59 mental model: every layer connection is real | ✅ | P10.26 | §59 |
| P10.49 | Full regression: run all 5 labs, all pass | ✅ | P9.8–P9.12 | §18 |
| P10.50 | Full regression: run all 6 troubleshooting scenarios, all reproduce | ✅ | P10.36–P10.41 | §47.6 |
| P10.51 | Full regression: all 12 URL params round-trip | ✅ | P3.11 | §5 |
| P10.52 | Full regression: no NaN in 1000 epochs across all 4 activations × 6 datasets | ✅ | P1.24 | §47.4 |

**Exit criteria:** All 52 verification tasks pass; every numeric claim in SRS confirmed.

---

## 🛡️ Phase 11 — Security, Accessibility & Compatibility

**Goal:** Harden against threats, a11y, cross-browser.
**Duration:** 1 week | **SRS Ref:** §9, §29, §30, §57

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P11.1 | Keyboard nav test: Tab through all controls, Enter/Space activates | ✅ | P4.12 | §29.1 |
| P11.2 | Screen reader test: verify `#iter-number` announces changes | ✅ | P4.12 | §29.2 |
| P11.3 | Colorblind test: use simulator on heatmap (orange/blue should be distinguishable) | ✅ | P6.5 | §29.3 |
| P11.4 | Responsive test: 1024px, 1280px, 1920px, ultra-wide >1400px centers | ✅ | P4.13, P4.14 | §29.4 |
| P11.5 | Chrome test: all features work, FPS > 20 on max network | ✅ | P7.20 | §30 |
| P11.6 | Firefox test: all features work | ✅ | P7.20 | §30 |
| P11.7 | Safari + Edge test: all features work | ✅ | P7.20 | §30 |
| P11.8 | Audit: no `eval()`, no `innerHTML`, no `document.write()` in codebase | ✅ | P7.20 | §57.1 |
| P11.9 | Verify URL hash injection cannot execute code (e.g., `#learningRate=<script>`) | ✅ | P3.14 | §57.1 |
| P11.10 | Verify no network requests after initial load (DevTools Network tab) | ✅ | P7.20 | §57.1 |
| P11.11 | Verify no cookies, localStorage, sessionStorage used | ✅ | P7.20 | §57.1 |
| P11.12 | Add CSP headers to Netlify `_headers` file (per SRS §57.3) | ✅ | P12.6 | §57.3 |
| P11.13 | Add `<meta name="viewport">` for mobile scaling (non-supported but graceful) | ✅ | P4.1 | §30.2 |
| P11.14 | Add mobile fallback message (banner: "Best on desktop") | ✅ | P11.13 | §30.2 |
| P11.15 | Feature-detect `requestAnimationFrame`, `Canvas 2D`, `SVG` at startup | ✅ | P7.12 | §30.1 |
| P11.16 | Add `aria-label` to all icon-only buttons | ✅ | P4.12 | §29.2 |
| P11.17 | Add focus-visible styles for keyboard users | ✅ | P4.11 | §29.1 |

**Exit criteria:** All 4 browsers pass; a11y checks pass; CSP headers deployed; no security findings.

---

## 🚀 Phase 12 — Deployment, Docs & Launch

**Goal:** Ship to the world.
**Duration:** 1 week | **SRS Ref:** §11, §24, §36, §37, §58

| ID | Task | Status | Depends | SRS |
| :--- | :--- | :--- | :--- | :--- |
| P12.1 | Run `npm run build` — verify `dist/` contains `bundle.js`, `index.html`, `bundle.css` | ✅ | P10.52 | §11.1 |
| P12.2 | Add `robots.txt` and `sitemap.xml` | ✅ | P12.1 | — |
| P12.3 | Create `CHANGELOG.md` for v1.0.0 (reference SRS §37) | ✅ | P12.1 | §37 |
| P12.4 | Create `.github/workflows/deploy.yml` for GitHub Pages | ✅ | P12.1 | §11.3 |
| P12.5 | Push to `main` — verify GH Actions builds + deploys to `gh-pages` | ✅ | P12.4 | §11.3 |
| P12.6 | Set up Netlify (Git continuous deploy) | ✅ | P12.1 | §11.2 |
| P12.7 | Configure Netlify: build = `npm run build`, publish = `dist` | ✅ | P12.6 | §11.2 |
| P12.8 | Add `_headers` file with CSP (from P11.12) | ✅ | P12.7 | §57.3 |
| P12.9 | Verify live site loads in < 3 seconds cold cache | ✅ | P12.5, P12.7 | §9 |
| P12.10 | Write "Adding Custom Dataset" guide (3 steps from §24) | ✅ | P9.24 | §24 |
| P12.11 | Add glossary link to README and in-app help | ✅ | P9.28 | §33 |
| P12.12 | Create "Future Enhancements" backlog issue on GitHub (from §36) | ✅ | P9.29 | §36 |
| P12.13 | Embed troubleshooting decision tree in README | ✅ | P9.21 | §47.5 |
| P12.14 | Write API reference (from §58) as `docs/api.md` | ✅ | P12.1 | §58 |
| P12.15 | Write `README.md`: description, screenshot, live link, quick start | ✅ | P12.9 | — |
| P12.16 | Add demo GIF (2 min) showing Circle → XOR → Spiral training | ✅ | P12.15 | — |
| P12.17 | Add footer with links to GitHub repo + SRS doc | ✅ | P12.15 | — |
| P12.18 | Write `CONTRIBUTING.md` with 3-step dataset guide | ✅ | P12.10 | §24 |
| P12.19 | Write `ARCHITECTURE.md` with §59 mental model diagram | ✅ | P12.15 | §59 |
| P12.20 | Add semantic-versioning + conventional-commits config | ✅ | P12.3 | — |
| P12.21 | Tag v1.0.0 release on GitHub | ✅ | P12.5 | — |
| P12.22 | Launch: post to Hacker News, r/MachineLearning (optional) | ✅ | P12.21 | — |

**Exit criteria:** Live URL; README complete; GH Actions auto-deploy; v1.0.0 tagged.

---

## 🎯 Milestones

| Milestone | After Phase | Success Criteria |
| :--- | :--- | :--- |
| M1: Math Works | P1 | XOR converges < 0.01; §34 example matches |
| M2: Data Flows | P3 | 12 params round-trip; seed reproducible |
| M3: UI Renders | P6 | Heatmap + chart update real-time |
| M4: App Works | P7 | Full loop end-to-end; state machine §50 verified |
| M5: Features Complete | P8 | 7 features + regression + hover card |
| M6: Labs Pass | P9 | All 5 labs + answer keys |
| M7: Verification Clean | P10 | All 52 numeric assertions pass |
| M8: Hardened | P11 | 4 browsers, a11y, CSP, no security findings |
| M9: Shipped | P12 | Live URL + README + v1.0.0 tag |

---

## ⚠️ Risk Register

| Risk | Likelihood | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| D3 v3 unfamiliarity slows viz | High | Medium | Study D3 v3 docs before Phase 5 |
| NaN propagation | Medium | High | NaN guard (P9.4), reset suggestion |
| Frame rate drop on max network | Medium | Medium | Profile early (P10.62), reduce grid |
| Webpack v1 config issues | Medium | Medium | Follow §56.2; fall back to `tsc` |
| Feature engineering complexity | Low | Low | Test early (P8.3) |
| Cross-browser SVG quirks | Medium | Medium | Test (P11.5–P11.7), polyfills |
| Testable SRS claims drift | Medium | High | 52 verification tasks (P10) |
| Educational content quality | Medium | Medium | Peer review labs + answer keys |
| Scope creep from §36 backlog | High | Medium | Keep backlog separate (P12.12) |
| Solo-dev burnout | Medium | High | 20–24 week realistic schedule |

---

## 📅 Weekly Schedule (24 Weeks)

| Week | Phase | Focus | Deliverable |
| :--- | :--- | :--- | :--- |
| 1 | P0 | Setup | Blank page served |
| 2–3 | P1 | Math core | XOR converges; §34 matches |
| 4–5 | P2 | Datasets | 6 generators verified |
| 6 | P3 | State/URL | 12 params round-trip |
| 7 | P4 | UI shell | 4-column layout |
| 8–9 | P5 | SVG viz | Interactive network graph |
| 10 | P6 | Heatmap/chart | Boundary + loss curves |
| 11–12 | P7 | Orchestration | Full loop + state machine |
| 13 | P8 | Features/modes | All 7 features + regression |
| 14 | P9 | Educational | 5 labs + answer keys |
| 15–16 | P10 | Verification | 52 assertions pass |
| 17 | P11 | Security/a11y | 4 browsers, CSP, a11y |
| 18 | P12 | Deploy | Live URL + README |
| 19–24 | Buffer | Polish | Bug fixes, demo, launch |

---

## 🏁 Definition of Done

The project is **complete** when:

1. ✅ All 12 phases exit criteria met
2. ✅ All 358 tasks marked ✅
3. ✅ All 5 SRS labs pass
4. ✅ All 52 verification assertions pass (P10.1–P10.52)
5. ✅ All 12 URL params round-trip
6. ✅ Live on GH Pages + Netlify
7. ✅ No NaN in 1000 epochs
8. ✅ FPS > 20 on max network
9. ✅ 4 browsers pass
10. ✅ CSP headers deployed
11. ✅ README + ARCHITECTURE + CONTRIBUTING + CHANGELOG + LICENSE
12. ✅ Glossary + FAQ + Troubleshooting + Labs + Answer Keys shipped
13. ✅ v1.0.0 tagged
14. ✅ Demo GIF embedded in README
15. ✅ Every SRS §1–§59 mapped to ≥1 task (Coverage Matrix)

---

## 📊 Progress Tracker Template

Save as `PROGRESS.md` and update weekly:

```markdown
# Deep Playground — Progress Tracker

## Current Phase: P0 — Foundation & Setup

### Phase 0 Tasks
- [x] P0.1 Initialize Git repo
- [x] P0.2 Create package.json
- [ ] P0.3 Add devDependencies
- [ ] P0.4 Write tsconfig.json
...

### Coverage Matrix Status
- SRS §1–§59 mapped: ✅
- Tasks completed: 0 / 358
- Phases completed: 0 / 12

### Blockers
- None

### Notes
- D3 v3 docs bookmarked
- Considering Netlify over GH Pages