const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".calculator_keys");
const display = document.querySelector(".calculator_display");

keys.addEventListener("click", (event) => {
  // closest doesn't listen to clicks made on grid gaps
  if (!event.target.closest("button")) {
    return;
  }
  const key = event.target;
  const keyValue = key.textContent;
  const displayValue = display.textContent;
  const type = key.dataset.type;
  const { previousKeyType } = calculator.dataset;

  //   Is this a number key?
  if (type === "number") {
    if (displayValue === "0" || previousKeyType === "operator") {
      display.textContent = keyValue;
    } else if (keyValue === "C") {
      display.textContent = "0";
    } else {
      display.textContent = displayValue + keyValue;
    }
  }

  // Is this a  operator key?

  if (type === "operator") {
    const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
    operatorKeys.forEach((element) => {
      element.dataset.state = "";
    });

    key.dataset.state = "selected";

    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === "equal") {
    // perform calculation  and show the result
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;

    display.textContent = calculate(firstNumber, operator, secondNumber);
  }

  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  let result = "";
  if (operator === "plus") {
    result = Number(firstNumber) + Number(secondNumber);
  }
  if (operator === "minus") {
    result = Number(firstNumber) - Number(secondNumber);
  }
  if (operator === "times") {
    result = Number(firstNumber) * Number(secondNumber);
  }
  if (operator === "divide") {
    result = Number(firstNumber) / Number(secondNumber);
  }

  return result;
}
