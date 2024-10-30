let currentInput = '0';
let operator = null;
let previousInput = null;

const display = document.getElementById('display');

function updateDisplay() {
    display.innerText = currentInput;
}

function clearCalculator() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    updateDisplay();
}

function inputNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function inputDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function handleOperator(op) {
    if (previousInput === null) {
        previousInput = currentInput;
    } else if (currentInput !== '0' && currentInput !== '-') {
        calculate();
    }

    if (op === '-' && currentInput === '0') {
        currentInput = '-';
        updateDisplay();
        return;
    }
    
    operator = op;
    currentInput = '0';
}

function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    let computation;
    switch (operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    operator = null;
    previousInput = currentInput;
    updateDisplay();
}

document.getElementById('clear').addEventListener('click', clearCalculator);
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'equals') {
            calculate();
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(button.id)) {
            handleOperator(button.innerText);
        } else if (button.id === 'decimal') {
            inputDecimal();
        } else {
            inputNumber(button.innerText);
        }
    });
});

updateDisplay();
