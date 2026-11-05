# 🧪 Lab 4: Learning Rate Dynamics & Gradient Descent Stability

> **Course Unit:** Optimization Algorithms & Hyperparameter Tuning  
> **Source of Truth:** `SRS.md` §18 (Lab 4) & §19 (Answer Key 4)  
> **Roadmap Reference:** Phase 9 (P9.6, P9.11, P9.16)

---

## 📋 Objective
Investigate how the learning rate parameter ($\alpha$) governs the stability, convergence rate, and numerical behavior of gradient descent optimization.

---

## 🔬 Student Worksheet

### Part A: High Learning Rate (Overshooting & Instability)
1. Select the **Gaussian** dataset.
2. Add **1 hidden layer** containing **4 neurons**.
3. Set **Activation** to `Tanh`.
4. Set **Learning Rate** to `10`.
5. Click **Play** and observe the loss curve and heatmap for 100 epochs.
6. Describe how the loss values and decision boundary behave:
   - **Loss Curve Behavior (Smooth / Oscillating / Diverging)**: ____________
   - **Heatmap Stability**: ____________

---

### Part B: Low Learning Rate (Stalling & Underfitting)
1. Click **Reset**.
2. Keep the architecture identical (1 layer, 4 neurons, Tanh, Gaussian dataset).
3. Change **Learning Rate** to `0.00001`.
4. Click **Play** and run training for 200 epochs.
5. Record your observations:
   - **Initial Training Loss**: ____________
   - **Final Training Loss**: ____________
   - **Net Loss Reduction**: ____________

#### Question 1
Compare the behavior of the network under high and low learning rates. What problems did you encounter with each configuration?

> **Answer Space:**  
>  
>  

---

## 👩‍🏫 Teacher Answer Key & Grading Rubric

### Answer Key: Question 1
- **Expected Answer**:
  - With a high learning rate ($\alpha = 10$), the step size taken along the gradient vector is excessively large. Instead of descending into the loss valley, parameter updates overshoot the local minimum, oscillating violently back and forth across the loss surface or even diverging entirely.
  - With a very low learning rate ($\alpha = 0.00001$), parameter updates are minuscule. The model makes imperceptible progress and effectively stalls, remaining in an underfit state even after hundreds of epochs.
  - An optimal learning rate (such as $\alpha = 0.03$) balances stability with convergence speed.
- **Grading Rubric**:
  - **Full Credit (2 pts)**: Accurately explains both phenomena (overshooting/divergence for high rates, and stalling/slow convergence for low rates).
  - **Partial Credit (1 pt)**: Discusses only one of the two regimes or provides vague qualitative descriptions.
  - **No Credit (0 pts)**: Incorrect or blank.

