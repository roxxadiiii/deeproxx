# 🧪 Lab 1: Classification on the Circle Dataset & Linear Limits

> **Course Unit:** Neural Network Foundations  
> **Source of Truth:** `SRS.md` §18 (Lab 1) & §19 (Answer Key 1)  
> **Roadmap Reference:** Phase 9 (P9.3, P9.8, P9.13)

---

## 📋 Objective
Understand the fundamental difference between linearly separable and non-linearly separable datasets, and observe why hidden layers with non-linear activation functions are required to solve circular decision boundaries.

---

## 🔬 Student Worksheet

### Part A: Baseline with a Linear Model
1. Open **DeepRoxx**.
2. Select the **Circle** dataset from the Data column.
3. Set **Activation** to `Linear`.
4. Remove all hidden layers using the `−` button until you have **0 hidden layers**.
5. Set **Learning Rate** to `0.03`.
6. Click **Play** and observe training for 200 epochs.
7. Record your observations:
   - **Final Epoch Count**: ______________
   - **Final Training Loss**: ____________
   - **Final Test Loss**: ________________

#### Question 1
Did the model successfully classify the dataset? Why or why not? Explain using the term *linear separability*.

> **Answer Space:**  
>  
>  

---

### Part B: Introducing Hidden Layers & Non-Linearity
1. Pause the simulation and click **Reset**.
2. Change **Activation** to `Tanh`.
3. Add **1 hidden layer** and set its neuron count to **3 neurons** using the `+` button in the SVG graph.
4. Click **Play** and let training run for 200 epochs.
5. Record your observations:
   - **Final Epoch Count**: ______________
   - **Final Training Loss**: ____________
   - **Final Test Loss**: ________________

#### Question 2
Explain how adding a hidden layer and changing the activation function to Tanh allowed the network to solve this classification task.

> **Answer Space:**  
>  
>  

---

## 👩‍🏫 Teacher Answer Key & Grading Rubric

### Answer Key: Question 1
- **Expected Answer**: No. A single linear neuron computes a straight line boundary (a hyperplane in 2D space: $w_1 x_1 + w_2 x_2 + b = 0$). The Circle dataset requires a circular, closed boundary to isolate the inner positive points from the outer negative points. Because concentric circles cannot be separated by any straight line, the dataset is not *linearly separable*, and a 0-hidden-layer linear network cannot achieve low loss.
- **Grading Rubric**:
  - **Full Credit (2 pts)**: States "No", explains that a straight line cannot separate concentric rings, and explicitly uses the concept of "linear separability".
  - **Partial Credit (1 pt)**: Notes that it fails, but does not explain the mathematical limitation or linear separability.
  - **No Credit (0 pts)**: Incorrect or blank.

### Answer Key: Question 2
- **Expected Answer**: Adding a hidden layer with 3 neurons produces three distinct linear intermediate boundaries. Applying the non-linear `Tanh` squashing function allows the output neuron to combine these three boundaries into a smooth, curved perimeter that encloses the inner positive circle.
- **Grading Rubric**:
  - **Full Credit (2 pts)**: Explains both the role of multiple hidden neurons and the necessity of non-linear activation (Tanh) in creating a curved decision boundary.
  - **Partial Credit (1 pt)**: Mentions adding neurons, but omits the role of non-linear activation.
  - **No Credit (0 pts)**: Incorrect or blank.

