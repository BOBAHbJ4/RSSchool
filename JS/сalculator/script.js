class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.isComplete = false;
        this.isNegative = false;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
        this.isComplete = false;
        this.isNegative = false;
    }

    delete() {
        const current = this.currentOperand.slice(0, -1);
        if (isNaN(this.currentOperand)) {
            this.currentOperand = '';
        }
        if (this.currentOperand.length === 0) {
            this.currentOperand = '';
            this.isNegative = false;
        } else {
            this.currentOperand = current;
        }
        this.isComplete = false;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.toString().includes('.')) {
            return;
        }
        if (number === '.' && this.currentOperand.toString() === '') {
            this.currentOperand = `0${number}`;
            return;
        }
        if (this.isComplete) {
            this.currentOperand = number.toString();
            this.isComplete = false;
            return;
        }
        this.currentOperand += number.toString();
    }

    addNegative() {
        if (this.currentOperand.length === 0) {
            return;
        }
        if (this.isNegative) {
            this.currentOperand = this.currentOperand.toString().slice(1);
            this.isNegative = false;
            return;
        }
        this.isNegative = true;
        this.currentOperand = `-${this.currentOperand}`;
        this.isComplete = false;
    }

    addDot() {
        if (this.currentOperand.toString().includes('.')) {
            return;
        }
        if (this.currentOperand.toString() === '') {
            this.currentOperand = '0.';
            return;
        }
        this.currentOperand = `${this.currentOperand}.`;
    }

    choseOperation(operation) {
        if (Number.isNaN(this.currentOperand)) {
            return;
        }
        if (this.currentOperand === '') {
            if (this.previousOperand !== '') {
                if (operation === '√') {
                    return;
                }
                const prev = this.previousOperand.slice(0, -1);
                this.previousOperand = `${prev}${operation}`;
                this.operation = operation;
                return;
            }
            return;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        if (operation === '√') {
            this.operation = operation;
            this.compute();
            return;
        }
        this.operation = operation;
        this.previousOperand = `${this.currentOperand.toString()} ${this.operation}`;
        this.isNegative = false;
        this.currentOperand = '';
    }

    // eslint-disable-next-line class-methods-use-this
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay = '';
        if (Number.isNaN(integerDigits)) {
            integerDisplay = stringNumber;
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits !== undefined) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        return integerDisplay;
    }

    render() {
        if (this.operation !== null) {
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)}${this.operation}`;
        }
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        this.previousOperandText.innerText = this.previousOperand;
    }

    compute() {
        let computation;
        if (this.currentOperand.length === 0) {
            return;
        }
        const prev = parseFloat(this.previousOperand).toString();
        const current = parseFloat(this.currentOperand).toString();
        const prevDecimalLength = prev.includes('.') ? prev.length - prev.indexOf('.') : null;
        const currentDecimalLength = current.includes('.') ? current.length - current.indexOf('.') : null;
        const bigDecimalLength = Math.max(prevDecimalLength, currentDecimalLength);
        switch (this.operation) {
            case '+':
                computation = Number(prev) + Number(current);
                break;
            case '-':
                computation = Number(prev) - Number(current);
                break;
            case '*':
                computation = Number(prev) * Number(current);
                break;
            case '÷':
                computation = Number(prev) / Number(current);
                break;
            case '^':
                computation = Number(prev) ** Number(current);
                break;
            case '√':
                computation = Math.sqrt(current);
                break;
            case '%':
                computation = Number(prev) % Number(current);
                break;
            default:
                return;
        }
        this.isComplete = true;
        if (isNaN(computation) || !isFinite(computation)) {
            this.currentOperand = 'Error';
            this.previousOperand = '';
            this.operation = null;
            this.isNegative = false;
            return;
        }
        if (prev.includes('.') && current.includes('.')) {
            this.currentOperand = Number(computation.toFixed(bigDecimalLength).toString());
        } else {
            this.currentOperand = computation.toString();
        }
        this.isNegative = false;
        if (this.currentOperand.toString().includes('-')) {
            this.isNegative = true;
        }
        this.operation = null;
        this.previousOperand = '';
    }
}

const numberButton = document.querySelectorAll('.number');
const operationButton = document.querySelectorAll('.operation');
const numberNegative = document.querySelector('.number-negative');
const dot = document.querySelector('.dot');
const clearAll = document.querySelector('.clear');
const del = document.querySelector('.delete');
const equals = document.querySelector('.equals');
const previousOperandText = document.querySelector('.previous-operand');
const currentOperandText = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButton.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.render();
    });
});

operationButton.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.innerText === 'x') {
            calculator.choseOperation('^');
        } else if (button.innerText === 'Mod') {
            calculator.choseOperation('%');
        } else {
            calculator.choseOperation(button.innerText);
        }
        calculator.render();
    });
});
numberNegative.addEventListener('click', () => {
    calculator.addNegative();
    calculator.render();
});
dot.addEventListener('click', () => {
    calculator.addDot();
    calculator.render();
});
clearAll.addEventListener('click', () => {
    calculator.clear();
    calculator.render();
});
del.addEventListener('click', () => {
    calculator.delete();
    calculator.render();
});
equals.addEventListener('click', () => {
    calculator.compute();
    calculator.render();
});
