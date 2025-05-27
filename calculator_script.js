let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".keys");

buttons.forEach(button => {
  button.addEventListener("click", () => handleButtonClick(button));
});

function handleButtonClick(button) {
  const number = button.dataset.number;
  const action = button.dataset.action;

  if (number !== undefined) {
    appendNumber(number);
  } else if (action) {
    switch (action) {
      case "clear":
        clear();
        break;
      case "backspace":
        backspace();
        break;
      case "add":
      case "substract":
      case "multiply":
      case "divide":
        setOperator(action);
        break;
      case "equal":
        evaluate();
        break;
    }
  }
}

function appendNumber(number) {
  if (display.textContent === "0" || shouldResetDisplay) {
    display.textContent = number;
    shouldResetDisplay = false;
  } else if (!(number === "." && display.textContent.includes("."))) {
    display.textContent += number;
  }
}

function clear() {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
}

function backspace() {
  display.textContent = display.textContent.slice(0, -1) || "0";
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondNumber = display.textContent;

  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber);
  let result;

  switch (currentOperator) {
    case "add":
      result = add(a, b);
      break;
    case "substract":
      result = substract(a, b);
      break;
    case "multiply":
      result = multiply(a, b);
      break;
    case "divide":
      if (b === 0) {
        display.textContent = "Nice try 🤡";
        currentOperator = null;
        return;
      }
      result = divide(a, b);
      break;
  }

  display.textContent = roundResult(result);
  firstNumber = result;
  currentOperator = null;
  shouldResetDisplay = true;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
