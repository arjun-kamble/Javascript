// ── DOM refs ──
const expressionEl = document.getElementById("expression");
const resultPreview = document.getElementById("result-preview");

// ── State ──
let expression = "";       // raw expression string e.g. "12+3*4"
let justEvaled = false;   // true after = pressed, so next digit starts fresh

// ── Safe evaluate (replaces dangerous eval) ──
// Only allows digits, operators, dot, parentheses, % converted to /100
function safeEval(expr) {
  // Replace % with /100 for percentage calculation
  const sanitized = expr.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

  // Validate: only allow numbers, operators, dots, parentheses, spaces
  if (!/^[\d+\-*/.() ]+$/.test(sanitized)) throw new Error("Invalid");

  // Use Function constructor instead of eval (safer scope)
  return Function('"use strict"; return (' + sanitized + ')')();
}

// ── Format result — trim floating point noise ──
function formatResult(val) {
  if (!isFinite(val)) return "Error";
  // Round to 10 significant digits to avoid 0.1+0.2 float noise
  return parseFloat(val.toPrecision(10)).toString();
}

// ── Live preview while typing ──
function updatePreview() {
  if (!expression || expression.length < 2) {
    resultPreview.textContent = "";
    return;
  }
  try {
    const val = safeEval(expression);
    const formatted = formatResult(val);
    // Only show preview if it differs from current expression
    resultPreview.textContent = (formatted !== expression) ? "= " + formatted : "";
  } catch {
    resultPreview.textContent = "";
  }
}

// ── Update display ──
function updateDisplay(value, isError = false) {
  expressionEl.textContent = value || "0";
  expressionEl.classList.toggle("error", isError);
  // Shrink font if expression is long
  expressionEl.style.fontSize = value.length > 14 ? "1.5rem"
    : value.length > 10 ? "1.9rem"
      : "2.4rem";
}

// ── Prevent double operators ──
const OPERATORS = ["+", "-", "*", "/"];
function endsWithOperator(str) {
  return OPERATORS.includes(str.slice(-1));
}

// ── Prevent double dots in same number segment ──
function currentSegmentHasDot(str) {
  const parts = str.split(/[+\-*/]/);
  return parts[parts.length - 1].includes(".");
}

// ── Handle button click ──
function handleInput(btn) {
  const action = btn.dataset.action;
  const value = btn.dataset.value;

  // ── AC ──
  if (action === "clear") {
    expression = "";
    justEvaled = false;
    updateDisplay("0");
    resultPreview.textContent = "";
    return;
  }

  // ── DEL ──
  if (action === "del") {
    if (justEvaled) {
      expression = "";
      justEvaled = false;
      updateDisplay("0");
      resultPreview.textContent = "";
      return;
    }
    expression = expression.slice(0, -1);
    updateDisplay(expression || "0");
    updatePreview();
    return;
  }

  // ── % ──
  if (action === "percent") {
    if (!expression) return;
    try {
      const val = safeEval(expression + "%");
      expression = formatResult(val);
      justEvaled = true;
      updateDisplay(expression);
      resultPreview.textContent = "";
    } catch {
      updateDisplay("Error", true);
      expression = "";
    }
    return;
  }

  // ── = ──
  if (action === "equals") {
    if (!expression) return;
    try {
      const val = safeEval(expression);
      expression = formatResult(val);
      justEvaled = true;
      updateDisplay(expression);
      resultPreview.textContent = "";
    } catch {
      updateDisplay("Error", true);
      expression = "";
      justEvaled = false;
    }
    return;
  }

  // ── Digit / operator / dot ──
  if (value !== undefined) {
    const isOperator = OPERATORS.includes(value);

    // After eval: operator continues, digit starts fresh
    if (justEvaled) {
      if (isOperator) {
        justEvaled = false;
        expression += value;
        updateDisplay(expression);
        updatePreview();
        return;
      } else {
        expression = "";
        justEvaled = false;
      }
    }

    // Prevent leading operators (except minus for negation — allow one)
    if (isOperator && expression === "") {
      if (value !== "-") return;
    }

    // Prevent two consecutive operators; replace last operator instead
    if (isOperator && endsWithOperator(expression)) {
      expression = expression.slice(0, -1) + value;
      updateDisplay(expression);
      return;
    }

    // Prevent double dot in same number
    if (value === "." && currentSegmentHasDot(expression)) return;

    // Prevent "00" at start or after operator
    if (value === "00" && (expression === "" || endsWithOperator(expression))) {
      expression += "0";
    } else {
      expression += value;
    }

    updateDisplay(expression);
    updatePreview();
  }
}

// ── Attach listeners ──
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn));
});

// ── Keyboard support ──
document.addEventListener("keydown", (e) => {
  const map = {
    "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
    "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
    "+": "+", "-": "-", "*": "*", "/": "/", ".": ".",
    "Enter": "=", "=": "=",
    "Backspace": "DEL", "Escape": "AC", "%": "%"
  };

  const key = map[e.key];
  if (!key) return;
  e.preventDefault();

  // Find matching button and simulate click
  const btn = [...document.querySelectorAll(".btn")].find(b => {
    if (key === "AC") return b.dataset.action === "clear";
    if (key === "DEL") return b.dataset.action === "del";
    if (key === "=") return b.dataset.action === "equals";
    if (key === "%") return b.dataset.action === "percent";
    return b.dataset.value === key;
  });

  if (btn) {
    btn.classList.add("active-key");
    setTimeout(() => btn.classList.remove("active-key"), 100);
    handleInput(btn);
  }
});