# 🧪 Lab 3: Overfitting, Generalization & L2 Regularization

> **Course Unit:** Generalization, Model Capacity & Regularization  
> **Source of Truth:** `SRS.md` §18 (Lab 3) & §19 (Answer Key 3)  
> **Roadmap Reference:** Phase 9 (P9.5, P9.10, P9.15)

---

## 📋 Objective
Investigate how high model capacity and dataset noise cause neural networks to overfit (memorizing noise rather than underlying patterns), and demonstrate how L2 weight decay regularizes the model to restore generalization.

---

## 🔬 Student Worksheet

### Part A: Overfitting a Noisy Dataset
1. Select the **Spiral** dataset.
2. Set **Noise** to `30`.
3. Set **Train/Test Ratio** to `30%` (leaving 70% as held-out test data).
4. Set **Activation** to `Tanh` and **Regularization** to `None`.
5. Configure a high-capacity network: **4 hidden layers** with **8, 8, 8, 8 neurons**.
6. Set **Learning Rate** to `0.03`.
7. Click **Play** and train until epoch 1500.
8. Pause the simulation.
9. Record your observations:
   - **Training Loss**: ____________
   - **Test Loss**: ________________
   - **Loss Gap (Test Loss − Train Loss)**: ____________

#### Question 1
Is the training loss significantly lower than the test loss? Inspect the decision boundary heatmap. Describe how the boundary lines react to random, noisy data points.

> **Answer Space:**  
>  
>  

---

### Part B: Applying L2 Regularization
1. Click **Reset**.
2. Keep all architecture parameters identical (4 layers of 8 neurons, Spiral, Noise=30, Train=30%).
3. Set **Regularization** to `L2` and **Regularization Rate** to `0.01`.
4. Click **Play** and train until epoch 1500.
5. Pause the simulation.
6. Record your observations:
   - **Training Loss**: ____________
   - **Test Loss**: ________________
   - **Loss Gap (Test Loss − Train Loss)**: ____________

#### Question 2
Did the gap between training loss and test loss shrink? How did the decision boundary shapes change after adding L2 regularization?

> **Answer Space:**  
>  
>  

---

## 👩‍🏫 Teacher Answer Key & Grading Rubric

### Answer Key: Question 1
- **Expected Answer**: Yes, training loss is significantly lower than test loss. Because the network has high representational capacity (many weights) and the training dataset is small and noisy, the network fits individual noisy points, creating erratic islands, sharp loops, and convoluted boundaries. While training loss appears low, test loss remains high because the model fails to generalize to unseen test points.
- **Grading Rubric**:
  - **Full Credit (2 pts)**: Confirms the significant train/test loss disparity and accurately describes the erratic boundary overfitting behavior.
  - **Partial Credit (1 pt)**: Notes the difference in loss without discussing the visual boundary distortion.
  - **No Credit (0 pts)**: Incorrect or blank.

### Answer Key: Question 2
- **Expected Answer**: Yes, the generalization gap shrank, and test loss improved. L2 regularization adds a quadratic weight penalty ($\frac{1}{2} \lambda w^2$) to the objective function, pulling weights toward zero during gradient updates ($w \leftarrow w - \alpha \lambda w$). This prevents weights from taking on extreme values to fit individual outlier points, producing smoother, broader decision contours that capture the macroscopic spiral arms rather than the noise.
- **Grading Rubric**:
  - **Full Credit (2 pts)**: Explains both the shrinkage of the loss gap and the smoothing of the boundary due to penalizing large weights.
  - **Partial Credit (1 pt)**: Notes the improvement but lacks the weight-decay mechanism explanation.
  - **No Credit (0 pts)**: Incorrect or blank.

