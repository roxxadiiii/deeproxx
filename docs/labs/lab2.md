# 🧪 Lab 2: Activation Function Comparison (Tanh vs. ReLU)

> **Course Unit:** Activation Dynamics & Representation Geometry  
> **Source of Truth:** `SRS.md` §18 (Lab 2) & §19 (Answer Key 2)  
> **Roadmap Reference:** Phase 9 (P9.4, P9.9, P9.14)

---

## 📋 Objective
Observe how mathematical differences between activation functions — specifically the smooth, continuously differentiable S-curve of Tanh versus the piecewise linear hinge of ReLU — shape the geometry of the learned decision boundaries.

---

## 🔬 Student Worksheet

### Part A: Training with Tanh
1. Select the **XOR** dataset.
2. Set **Activation** to `Tanh`.
3. Configure **2 hidden layers** with **4 neurons** in the first layer and **4 neurons** in the second layer (`4,4`).
4. Set **Learning Rate** to `0.03`.
5. Click **Play** and train until epoch 300.
6. Pause the simulation.
7. Inspect the heatmap decision boundary. Are the contours curved or faceted?
   - **Contour Style (Curved / Angular)**: ____________
   - **Final Training Loss**: ____________
   - **Final Test Loss**: ________________

---

### Part B: Training with ReLU
1. Click **Reset**.
2. Change **Activation** to `ReLU`.
3. Keep the network shape at `4,4` and learning rate at `0.03`.
4. Click **Play** and train until epoch 300.
5. Pause the simulation.
6. Inspect the heatmap decision boundary.
   - **Contour Style (Curved / Angular)**: ____________
   - **Final Training Loss**: ____________
   - **Final Test Loss**: ________________

#### Question 1
Compare the visual boundary patterns produced by Tanh and ReLU. Why does Tanh produce smooth curves while ReLU produces sharp, straight lines?

> **Answer Space:**  
>  
>  

---

## 👩‍🏫 Teacher Answer Key & Grading Rubric

### Answer Key: Question 1
- **Expected Answer**: Tanh ($\sigma(x) = \tanh(x)$) is a smooth, continuously differentiable transcendental function. Its derivatives are smooth everywhere, resulting in continuous, curved decision boundaries in the input space. In contrast, ReLU ($\sigma(x) = \max(0, x)$) is a piecewise linear function with a sharp hinge at $x = 0$. Stacking linear combinations of piecewise linear units results in a continuous piecewise linear decision boundary composed of straight line segments and sharp corners.
- **Grading Rubric**:
  - **Full Credit (2 pts)**: Identifies Tanh as a smooth, continuously differentiable S-curve and ReLU as a piecewise linear / hinge function, connecting this mathematical distinction directly to the visual boundaries.
  - **Partial Credit (1 pt)**: Notes the visual difference (smooth vs sharp/boxy) but fails to explain the underlying mathematical nature of the functions.
  - **No Credit (0 pts)**: Incorrect or blank.

