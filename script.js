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
        if (operator === $(element).text()) {
            $(element).addClass("operatorButton--active");
        }
        if (previousOpperand !== "") {
            calculate();
            updateDisplay();
        }
        const operations = {
            "÷": "/",
            x: "*",
            "+": "+",
            "-": "-",
        };
        operation = operations[operator];
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
        $(".ts-operator").removeClass("operatorButton--active");
    };
    const updateDisplay = () => {
        const display = $(".ts-display");
        const formattedNumber = Number(currentOperand).toLocaleString("pl-PL");
        if (isNaN(Number(currentOperand))) {
            currentOperand = "0";
            return;
        }
        $(display).text(formattedNumber);
    };
    const bindButtons = () => {
        const digitButtons = $(".ts-digit");
        digitButtons.on("click", function () {
            addDigits($(this).text());
            updateDisplay();
        });
        const operatorButtons = $(".ts-operator");
        operatorButtons.on("click", function () {
            setOperator($(this).text(), $(this));
        });
        const clearButton = $(".ts-clear");
        clearButton.on("click", function () {
            clear();
            updateDisplay();
        });
        const undoButton = $(".ts-undo");
        undoButton.on("click", function () {
            undo();
            updateDisplay();
        });
        const equalsButton = $(".ts-equals");
        equalsButton.on("click", function () {
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
