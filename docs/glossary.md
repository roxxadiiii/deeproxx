# 📖 Machine Learning & Deep Learning Glossary

> **Project:** DeepRoxx  
> **Source of Truth:** `SRS.md` §33  
> **Roadmap Reference:** Phase 9 (P9.28)

This glossary provides concise, precise definitions for core machine learning, deep learning, and simulation concepts used throughout DeepRoxx.

| Term | Definition |
| :--- | :--- |
| **Accumulator** | A numerical variable that aggregates values over iterations. In DeepRoxx, `accErrorDer` and `accInputDer` accumulate sample gradients across a mini-batch before averaging. |
| **Activation Function** | A mathematical function applied to the pre-activation sum of a neuron. Introduces non-linearity, enabling networks to learn complex non-linear patterns (e.g. Tanh, ReLU, Sigmoid, Linear). |
| **Backpropagation** | An optimization algorithm that computes the gradient of the loss function with respect to every weight and bias using the calculus chain rule, propagating errors backward from the output layer. |
| **Batch** | A subset of training examples evaluated together in a single optimization step. |
| **Batch Size** | A hyperparameter determining how many data samples are processed per parameter update (1 = SGD, 10 = mini-batch, 30 = full/near-full batch). |
| **Bias ($b$)** | An independent learnable scalar parameter in each neuron that shifts the activation threshold left or right, independent of input features. |
| **Box-Muller Transform** | An algorithm for generating normally distributed random numbers from pairs of uniform random numbers using rejection sampling. |
| **Canvas** | An HTML5 pixel buffer element used in DeepRoxx for high-speed rasterization of the 2D decision boundary heatmap and dataset preview thumbnails. |
| **Chain Rule** | A fundamental calculus theorem: $\frac{d}{dx}f(g(x)) = f'(g(x)) \cdot g'(x)$. Forms the mathematical backbone of backpropagation. |
| **Classification** | A supervised learning task where inputs are partitioned into discrete categories (e.g. $+1$ vs $-1$). |
| **Convergence** | The condition during training when loss stabilizes at a minimum and weights cease to change significantly. |
| **D3.js** | A JavaScript visualization library that binds data to the DOM. Used in DeepRoxx for the SVG network graph and loss history curves. |
| **Dataset** | A collection of labeled coordinates $(x_1, x_2, y)$ used to train and test the model. |
| **Dead Neuron** | A neuron using ReLU whose weights produce negative inputs for all data samples, yielding zero output and zero gradient, permanently halting learning. |
| **Decision Boundary** | The geometric contour in feature space where the network's prediction transitions between classes (visualized by the color transition). |
| **Derivative** | The rate of change of an objective function with respect to a parameter. Indicates the direction to adjust weights to minimize loss. |
| **Discretize** | Snapping continuous prediction outputs to discrete binary states ($\pm 1$) before rendering the decision boundary. |
| **Epoch** | One complete training pass through the dataset. In mini-batch settings, represents a discrete optimization step. |
| **Error Function** | A mathematical formulation evaluating prediction error against target labels (e.g. Squared Error: $E = \frac{1}{2}(a - y)^2$). |
| **Feature** | An individual measurable property of an input coordinate (e.g. $X_1, X_2$). |
| **Feature Engineering** | Creating non-linear transformations ($X_1^2, X_1 X_2, \sin(X_1)$) to make non-separable tasks linearly separable. |
| **Feedforward** | Propagating input values forward through successive layers to compute activated outputs at the final layer. |
| **Fisher-Yates Shuffle** | An unbiased, in-place $O(n)$ array shuffling algorithm used to randomize data before splitting and batching. |
| **Gradient** | The multi-dimensional vector of partial derivatives pointing in the direction of greatest loss increase. |
| **Gradient Descent** | An iterative optimization algorithm that updates parameters in the direction opposite to the gradient. |
| **Heatmap** | A 2D canvas visualization where pixel colors represent the model's prediction across the continuous coordinate plane $[-6, 6]^2$. |
| **Hidden Layer** | An intermediate layer of neurons situated between the input features and final output. |
| **Hyperparameter** | An external configuration set before training (learning rate, activation function, regularization rate, batch size, topology). |
| **L1 Regularization (Lasso)**| A penalty proportional to $|w|$ with derivative $\text{sign}(w)$. Drives small weights to exactly zero, creating sparse networks. |
| **L2 Regularization (Ridge)**| A penalty proportional to $\frac{1}{2}w^2$ with derivative $w$. Constrains weight magnitudes without killing connections. |
| **Label** | The ground-truth target output ($+1$ or $-1$ for classification, continuous scalar for regression). |
| **Learning Rate ($\alpha$)** | A scaling factor determining the step size taken along the negative gradient vector during each update. |
| **Linear Collapse** | The mathematical proof showing that stacking multiple linear layers collapses into an equivalent single-layer matrix product. |
| **Linear Separability** | The condition where a single straight line (or hyperplane) can cleanly partition all positive and negative samples. |
| **Link** | A weighted synapse connecting a source neuron to a destination neuron in the network graph. |
| **Mini-Batch** | A compromise between true Stochastic Gradient Descent (size 1) and full-batch gradient descent. |
| **Node** | A single artificial neuron storing bias, activation function, input connections, and gradient accumulators. |
| **Noise** | Random spatial displacement added to dataset coordinates to test model robustness and regularization. |
| **Overfitting** | When a high-capacity model memorizes dataset noise, achieving low training error but poor generalization on test data. |
| **Piecewise Linear** | A function composed of straight line segments (e.g. ReLU). Produces faceted, angular decision boundaries. |
| **Pruning** | Removing unnecessary or dead weights from a network (achieved automatically in DeepRoxx via L1 zero-crossing kill). |
| **Regression** | A supervised learning task where the target output is a continuous real-valued number rather than a discrete class. |
| **Regularization** | Mathematical penalties added to the loss function to constrain model complexity and prevent overfitting. |
| **RequestAnimationFrame** | A browser API that synchronizes the simulation loop with the display refresh rate (~60 FPS). |
| **Seed** | An initial value passed to a pseudo-random number generator (`seedrandom`) to guarantee deterministic reproducibility. |
| **Serialization** | Converting application state into an encoded URL hash string to enable instant sharing and bookmarking. |
| **Sigmoid** | An S-shaped activation function: $\sigma(x) = \frac{1}{1 + e^{-x}}$, squashing real numbers into $(0, 1)$. |
| **SPA (Single Page App)** | A web application that runs entirely on a single web page without full-page reloads. |
| **SVG** | Scalable Vector Graphics; an XML-based vector image format used by D3 to render neurons, links, and charts. |
| **Symmetry Problem** | The issue where initializing all weights to identical values causes all neurons in a layer to compute identical gradients. |
| **Tanh** | Hyperbolic tangent activation function squashing values into $(-1, 1)$ with zero-centered outputs. |
| **Test Data** | Held-out data samples never shown during backpropagation, used exclusively to evaluate true generalization. |
| **Training Data** | The subset of samples used to compute loss gradients and update model parameters. |
| **Underfitting** | When a network is too simple to capture the underlying pattern, resulting in high loss on both training and test data. |
| **URL Hash** | The URI fragment identifier after `#`, allowing client-side configuration persistence without server requests. |
| **Weight ($w$)** | A learnable numerical parameter quantifying the connection strength between two neurons. |

