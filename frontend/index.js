import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const loading = document.getElementById('loading');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

async function calculate() {
    const expression = display.value;
    if (!expression) return;

    const [num1, operator, num2] = expression.split(/([+\-*/])/);

    if (!num1 || !operator || !num2) {
        display.value = 'Error: Invalid expression';
        return;
    }

    loading.classList.remove('d-none');

    try {
        let result;
        switch (operator) {
            case '+':
                result = await backend.add(parseFloat(num1), parseFloat(num2));
                break;
            case '-':
                result = await backend.subtract(parseFloat(num1), parseFloat(num2));
                break;
            case '*':
                result = await backend.multiply(parseFloat(num1), parseFloat(num2));
                break;
            case '/':
                if (parseFloat(num2) === 0) {
                    display.value = 'Error: Division by zero';
                    loading.classList.add('d-none');
                    return;
                }
                result = await backend.divide(parseFloat(num1), parseFloat(num2));
                break;
            default:
                display.value = 'Error: Invalid operator';
                loading.classList.add('d-none');
                return;
        }

        display.value = result.toString();
    } catch (error) {
        console.error('Calculation error:', error);
        display.value = 'Error: Calculation failed';
    } finally {
        loading.classList.add('d-none');
    }
}

window.appendToDisplay = appendToDisplay;
window.clearDisplay = clearDisplay;
window.calculate = calculate;
