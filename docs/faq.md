# ❓ Frequently Asked Questions (FAQ)

> **Project:** DeepRoxx  
> **Source of Truth:** `SRS.md` §13  
> **Roadmap Reference:** Phase 9 (P9.18, P9.19, P9.20)

---

## 1. General Machine Learning FAQs

### Q1: Why is my network not converging on the Spiral dataset?
The Spiral dataset is highly non-linear and features intertwined continuous arms. A small network (e.g., 1 hidden layer with 2 neurons) lacks the representational capacity to partition this space.
**Solutions to try:**
1. **Increase Network Depth and Width**: Use 3 or 4 hidden layers with 8, 8, and 4 neurons.
2. **Enable Non-Linear Features**: Turn on $\sin(X_1)$ and $\sin(X_2)$. Periodic features naturally mirror spiral oscillations and speed up convergence dramatically.
3. **Tune Learning Rate**: Ensure learning rate is set to `0.03` or `0.01` with batch size `10`.

---

### Q2: What is the difference between L1 and L2 Regularization?
Both techniques penalize large weights to prevent overfitting, but their mathematical properties produce distinct topologies:
- **L1 Regularization (Lasso)**: Uses penalty $R(w) = |w|$ with derivative $R'(w) = \text{sign}(w)$. Because the gradient push is constant regardless of weight magnitude, small weights are driven to **exactly zero**, pruning dead links (`isDead = true`) and creating sparse networks.
- **L2 Regularization (Ridge)**: Uses penalty $R(w) = \frac{1}{2}w^2$ with derivative $R'(w) = w$. The gradient push is proportional to weight magnitude. Large weights shrink rapidly, but as weights approach zero the penalty vanishes, so weights almost never reach absolute zero. Connections remain intact, but smooth and small.

---

### Q3: How do I choose the right Learning Rate?
The learning rate ($\alpha$) controls the magnitude of parameter updates during gradient descent:
- **Too High ($\alpha = 10$)**: Parameter updates overshoot loss minima, causing oscillations, boundary chaos, or numerical overflow (`NaN`).
- **Too Low ($\alpha = 0.00001$)**: Progress is imperceptible, taking thousands of epochs to move even slightly.
- **Recommended Range**: `0.01` to `0.03` provides stable, rapid convergence for most 2D classification problems.

---

## 2. Technical & Coding FAQs

### Q1: How do I add a new activation function to DeepRoxx?
Adding an activation function requires just two steps:
1. Open [`src/nn.ts`](file:///home/roxxy/dev/deeproxx/src/nn.ts) and add your definition to `Activations`:
   ```typescript
   public static LEAKY_RELU: ActivationFunction = {
     output: (x: number) => x > 0 ? x : 0.01 * x,
     der: (x: number) => x > 0 ? 1 : 0.01
   };
   ```
2. Open [`src/state.ts`](file:///home/roxxy/dev/deeproxx/src/state.ts) and register it in the `activations` lookup:
   ```typescript
   export const activations = {
     // ...
     leaky_relu: nn.Activations.LEAKY_RELU
   };
   ```
3. Add a matching `<option value="leaky_relu">Leaky ReLU</option>` inside `#activations` in [`index.html`](file:///home/roxxy/dev/deeproxx/index.html).

---

### Q2: How do I change the Decision Boundary Grid Resolution?
By default, [`src/heatmap.ts`](file:///home/roxxy/dev/deeproxx/src/heatmap.ts) renders a $30 \times 30$ grid (900 forward passes per frame) over $[-6, 6]^2$.
To change this resolution:
In `src/playground.ts`:
```typescript
heatMap = new HeatMap(heatmapContainer, 50); // renders a 50x50 grid
```
*Note:* Higher resolutions (e.g. 100×100 = 10,000 forward passes) will decrease the frame rate on larger networks.

---

### Q3: How do URL hash configurations work?
DeepRoxx stores state in `window.location.hash` using URI parameters (e.g. `#learningRate=0.03&activation=tanh&networkShape=4,2`). You can bookmark or share any URL; upon loading, `State.deserializeState()` parses parameters and configures the exact simulation.

