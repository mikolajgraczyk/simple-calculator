{
    let currentOperand = "0";
    let previousOpperand = "";
    let operation = undefined;
    let isResult = false;
    const addDigits = (digit) => {
        removeOperatorButtonColor();
        if (currentOperand.includes(".") && digit === ".")
            return;
        if (currentOperand.length >= 16)
            return;
        if ((currentOperand === "0" || isResult) && digit !== ".") {
            currentOperand = digit;
            isResult = false;
            return;
        }
        currentOperand += digit;
    };
    const setOperator = (operator, element) => {
        removeOperatorButtonColor();
        if (operator === element.textContent) {
            element.classList.add("operatorButton--active");
        }
        if (previousOpperand !== "") {
            calculate();
            updateDisplay();
        }
        switch (operator) {
            case "÷":
                operation = "/";
                break;
            case "x":
                operation = "*";
                break;
            default:
                operation = operator;
        }
        previousOpperand = currentOperand;
        currentOperand = "";
    };
    const calculate = () => {
        let calculatedValue;
        let previousValue = Number(previousOpperand);
        let currentValue = Number(currentOperand);
        switch (operation) {
            case "+":
                calculatedValue = previousValue + currentValue;
                break;
            case "-":
                calculatedValue = previousValue - currentValue;
                break;
            case "*":
                calculatedValue = previousValue * currentValue;
                break;
            case "/":
                calculatedValue = previousValue / currentValue;
                break;
            default:
                return;
        }
        currentOperand = calculatedValue.toString();
        operation = undefined;
        isResult = true;
    };
    const clear = () => {
        currentOperand = "0";
        previousOpperand = "";
        operation = undefined;
        isResult = false;
        removeOperatorButtonColor();
    };
    const undo = () => {
        currentOperand = currentOperand.slice(0, -1);
    };
    const removeOperatorButtonColor = () => {
        const operatorButtons = document.querySelectorAll(".ts-operator");
        operatorButtons.forEach((button) => {
            button.classList.remove("operatorButton--active");
        });
    };
    const updateDisplay = () => {
        const display = document.querySelector(".ts-display");
        const formattedNumber = Number(currentOperand).toLocaleString("pl-PL");
        if (isNaN(Number(currentOperand))) {
            currentOperand = "0";
            return;
        }
        display.textContent = formattedNumber;
    };
    const bindButtons = () => {
        const digitButtons = document.querySelectorAll(".ts-digit");
        digitButtons.forEach((digitButton) => {
            digitButton.addEventListener("click", () => {
                addDigits(digitButton.textContent);
                updateDisplay();
            });
        });
        const operatorButtons = document.querySelectorAll(".ts-operator");
        operatorButtons.forEach((operatorButton) => {
            operatorButton.addEventListener("click", () => {
                setOperator(operatorButton.textContent, operatorButton);
            });
        });
        const clearButton = document.querySelector(".ts-clear");
        clearButton.addEventListener("click", () => {
            clear();
            updateDisplay();
        });
        const undoButton = document.querySelector(".ts-undo");
        undoButton.addEventListener("click", () => {
            undo();
            updateDisplay();
        });
        const equalsButton = document.querySelector(".ts-equals");
        equalsButton.addEventListener("click", () => {
            calculate();
            updateDisplay();
            removeOperatorButtonColor();
        });
    };
    const init = () => {
        bindButtons();
        updateDisplay();
    };
    init();
}
