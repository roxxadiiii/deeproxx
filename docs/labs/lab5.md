# 🧪 Lab 5: Feature Engineering & Linear Separability

> **Course Unit:** Feature Representation & Non-Linear Transformations  
> **Source of Truth:** `SRS.md` §18 (Lab 5) & §19 (Answer Key 5)  
> **Roadmap Reference:** Phase 9 (P9.7, P9.12, P9.17)

---

## 📋 Objective
Demonstrate how manually projecting raw coordinates into higher-dimensional feature spaces (e.g., $X_1 X_2$) can transform a non-linearly separable problem like XOR into a linearly separable problem, allowing a zero-hidden-layer network to achieve perfect accuracy.

---

## 🔬 Student Worksheet

### Part A: The Raw XOR Challenge
1. Select the **XOR** dataset.
2. Configure the network to have **0 hidden layers**.
3. Under the **Features** column, make sure only **X₁** and **X₂** are checked.
4. Set **Activation** to `Linear` and **Learning Rate** to `0.03`.
5. Run the training for 300 epochs.
6. Record your final test loss: ______________

#### Question 1
Can the linear classifier solve the XOR dataset? Why or why not?

> **Answer Space:**  
>  
>  

---

### Part B: Feature Transformation with $X_1 X_2$
1. Click **Reset**.
2. Keep the network shape at **0 hidden layers**.
3. Under **Features**, uncheck all options except **X₁X₂** ($x_1 \cdot x_2$).
4. Click **Play** and train for 100 epochs.
5. Record your final test loss: ______________

#### Question 2
How did selecting the feature $X_1 X_2$ allow a model with 0 hidden layers to solve the XOR problem? Explain the concept of *feature engineering*.

> **Answer Space:**  
>  
>  

---

## 👩‍🏫 Teacher Answer Key & Grading Rubric

### Answer Key: Question 1
- **Expected Answer**: No. The XOR dataset is intrinsically non-linearly separable in raw $(x_1, x_2)$ coordinate space. Positive labels lie in quadrants I and III ($x_1 x_2 > 0$), while negative labels lie in quadrants II and IV ($x_1 x_2 < 0$). No single straight line can partition these two diagonal pairs.
- **Grading Rubric**:
  - **Full Credit (2 pts)**: Correctly answers "No" and notes that no single linear boundary can separate diagonal quadrants.
  - **Partial Credit (1 pt)**: Answers "No" without discussing geometric separability.
  - **No Credit (0 pts)**: Incorrect or blank.

### Answer Key: Question 2
- **Expected Answer**: The cross-product transformation $z = x_1 \cdot x_2$ projects 2D coordinates into a 1D scalar space where positive examples have $z > 0$ and negative examples have $z < 0$. In this transformed feature space, the classes are perfectly linearly separable at the single threshold $z = 0$. This demonstrates *feature engineering*: transforming raw inputs into informative representations so that simple linear models can solve complex problems without deep multi-layer architectures.
- **Grading Rubric**:
  - **Full Credit (2 pts)**: Explains how the product maps quadrant coordinates into positive/negative signs, enabling linear classification at zero, and defines feature engineering.
  - **Partial Credit (1 pt)**: Notes that $x_1 x_2$ works, but fails to explain the sign/projection mechanism.
  - **No Credit (0 pts)**: Incorrect or blank.

