# 🧠 Machine Learning Primer: Neural Networks from First Principles

> **Project:** DeepRoxx  
> **Source of Truth:** `SRS.md` §2, §3  
> **Roadmap Reference:** Phase 9 (P9.1, P9.2)

---

## 1. What is a Neural Network?

A neural network is an interconnected collection of mathematical processing units called **neurons**, organized into layers. The network receives numerical inputs, transforms them through one or more intermediate ("hidden") layers, and calculates a final prediction output.

### The House Price Analogy
Imagine predicting the market price of a house:
- **Inputs (Features)**: Size in square feet ($x_1$) and number of bedrooms ($x_2$).
- **Weights ($w$)**: The relative importance of each feature. Size is typically critical ($w_1 = 300$), while bedroom count has lower relative influence ($w_2 = 50$).
- **Bias ($b$)**: The baseline value of any home regardless of size or bedrooms ($b = 80$).
- **Neuron Formula**:
  $$\text{Price} = (300 \cdot x_1) + (50 \cdot x_2) + 80$$

This represents a **linear neuron**. While linear neurons work well for flat trends, real-world data (such as concentric circles or spirals) requires non-linear decision boundaries. To learn these non-linear structures, each neuron wraps its weighted sum in an **activation function**.

---

## 2. The Feedforward Pass

In feedforward neural networks, information flows strictly from left to right:

1. **Input Layer**: Ingests raw coordinates $(x_1, x_2)$ or transformed features ($x_1^2, x_1 x_2, \sin(x_1)$, etc.).
2. **Hidden Layers**: Each neuron calculates the weighted sum of inputs from the preceding layer, adds its learnable bias, and evaluates an activation function:
   $$z_i^{(L)} = b_i^{(L)} + \sum_{j} w_{ji}^{(L)} a_j^{(L-1)}$$
   $$a_i^{(L)} = \sigma(z_i^{(L)})$$
3. **Output Layer**: Computes the final prediction value ($+1$ vs $-1$ for classification, continuous scalar for regression).

---

## 3. Activation Functions: Why Non-Linearity Matters

Without non-linear activation functions, stacking multiple linear layers mathematically collapses into a single matrix multiplication ($W_{\text{final}} = W_2 W_1$), making it impossible to separate non-linear distributions (SRS §3.6).

| Function | Formula $\sigma(x)$ | Derivative $\sigma'(x)$ | Visual Character | Best Used For |
| :--- | :--- | :--- | :--- | :--- |
| **Tanh** | $\frac{e^x - e^{-x}}{e^x + e^{-x}}$ | $1 - \sigma(x)^2$ | Smooth, curved transitions in $(-1, 1)$ | General hidden layers, concentric boundaries |
| **ReLU** | $\max(0, x)$ | $0 \text{ if } x \le 0 \text{ else } 1$ | Sharp, piecewise linear facets | Fast training, sparse representations |
| **Sigmoid**| $\frac{1}{1 + e^{-x}}$ | $\sigma(x)(1 - \sigma(x))$ | S-curve squashed to $(0, 1)$ | Probabilities, historical architectures |
| **Linear** | $x$ | $1$ | Flat hyperplanes | Regression outputs, baseline comparison |

---

## 4. Measuring Error: The Loss Function

During training, we compare the network's prediction against ground-truth labels using the **Squared Error** loss function:

$$E = \frac{1}{2} (a^{(L_{\text{out}})} - y)^2$$

Where:
- $a^{(L_{\text{out}})}$ is the network's prediction.
- $y$ is the true target label (e.g. $+1.0$ or $-1.0$).
- $\frac{1}{2}$ cancels out when differentiating: $\frac{\partial E}{\partial a} = a - y$.

---

## 5. Backpropagation & Gradient Descent

Training is an iterative optimization process:

1. **Compute Error Gradients**: The chain rule propagates error backward from the output layer to compute local gradients:
   $$\delta_i^{(L)} = \frac{\partial E}{\partial z_i^{(L)}}$$
   $$\frac{\partial E}{\partial w_{ji}^{(L)}} = \delta_i^{(L)} \cdot a_j^{(L-1)}$$
   $$\frac{\partial E}{\partial b_i^{(L)}} = \delta_i^{(L)}$$
2. **Update Parameters (Stochastic Gradient Descent)**:
   We subtract a fraction of the gradient scaled by the **learning rate** ($\alpha$):
   $$w_{\text{new}} = w_{\text{old}} - \alpha \cdot \frac{\partial E}{\partial w}$$
   $$b_{\text{new}} = b_{\text{old}} - \alpha \cdot \frac{\partial E}{\partial b}$$
3. **Regularization (L1 & L2)**:
   - **L1 (Lasso)**: Adds $\lambda \cdot \text{sign}(w)$ penalty. Drives weights to exactly zero, pruning unnecessary connections.
   - **L2 (Ridge)**: Adds $\lambda \cdot w$ penalty. Keeps weights small and smooth without pruning connections, reducing overfitting on noisy datasets.
