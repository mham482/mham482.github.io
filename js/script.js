const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
let currentInput = '';
let operator = '';
let previousInput = '';
let result = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (buttonText === 'C') {
            clearDisplay();
        } else if (buttonText === '=') {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(buttonText)) {
            setOperator(buttonText);
        } else {
            appendToDisplay(buttonText);
        }
    });
});

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.textContent = '0';
}

function appendToDisplay(value) {
    if (currentInput.length < 15) {
        currentInput += value;
        display.textContent = currentInput;
    }
}

function setOperator(op) {
    if (currentInput === '') return;

    if (previousInput !== '') {
        calculateResult();
    }
    
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    if (previousInput === '' || currentInput === '') return;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                result = 'Error';
            } else {
                result = prev / curr;
            }
            break;
    }

    display.textContent = result;
    currentInput = result.toString();
    previousInput = '';
    operator = '';
}