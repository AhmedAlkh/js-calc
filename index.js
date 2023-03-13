const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const resetButton = document.querySelector("[data-delete]");
const display = document.querySelector(".result-bar p");

let firstOperand = null;
let currentOperation = null;

// Add event listeners to number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    display.textContent += button.textContent;
  });
});

// Add event listeners to operation buttons
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // If there's already a pending operation, evaluate it before moving on to the next one
    if (currentOperation) {
      const secondOperand = Number(display.textContent);
      const result = operate(firstOperand, secondOperand, currentOperation);
      display.textContent = result;
      firstOperand = result;
      currentOperation = button.textContent;
    } else {
      // If there's no pending operation, set the current operation and store the first operand
      firstOperand = Number(display.textContent);
      currentOperation = button.textContent;
      display.textContent = "";
    }
  });
});

// Add event listener to equal button
equalButton.addEventListener("click", () => {
  // Evaluate the pending operation, if any
  if (currentOperation) {
    const secondOperand = Number(display.textContent);
    const result = operate(firstOperand, secondOperand, currentOperation);
    display.textContent = result;
    firstOperand = null;
    currentOperation = null;
  }
});

// Add event listener to reset button
resetButton.addEventListener("click", () => {
  display.textContent = "";
  firstOperand = null;
  currentOperation = null;
});

// Function to perform arithmetic operations
function operate(num1, num2, operation) {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return null;
  }
}
