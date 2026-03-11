let calc = document.querySelector("#real-calc");
let inputs = document.querySelector(".grid-container");
let clearAll = document.querySelector(".ac");
let delBtn = document.querySelector(".delete");
let equalsBtn = document.querySelector("#equals");

let expression = "";

function updateDisplay() {
  calc.textContent = expression || "0";
}

inputs.addEventListener("click", function (event) {
  if (event.target.tagName !== "BUTTON") return;

  if (
    event.target.classList.contains("ac") ||
    event.target.classList.contains("delete") ||
    event.target.id === "equals"
  )
    return;

  const value = event.target.textContent.trim();

  const operatorMap = {
    x: "*",
    "÷": "/",
    "%": "%",
    "+": "+",
    "-": "-",
    ".": ".",
    "00": "00",
  };

  const mapped = operatorMap[value] ?? value;

  const lastChar = expression.slice(-1);
  const isOperator = (ch) => ["+", "-", "*", "/"].includes(ch);

  if (isOperator(mapped) && isOperator(lastChar)) {
    expression = expression.slice(0, -1) + mapped;
  } else {
    expression += mapped;
  }

  updateDisplay();
});

clearAll.addEventListener("click", function () {
  expression = "";
  updateDisplay();
});

delBtn.addEventListener("click", function () {
  expression = expression.slice(0, -1);
  updateDisplay();
});

equalsBtn.addEventListener("click", function () {
  if (!expression) return;
  try {
    let result = Function('"use strict"; return (' + expression + ")")();
    result = parseFloat(result.toFixed(10));
    expression = String(result);
    updateDisplay();
  } catch (e) {
    calc.textContent = "Error";
    expression = "";
  }
});
