const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    isWaitForSecondNumber: false,
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
};

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
};

function inputNumber(number) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = number;
    } else {
        calculator.displayNumber += number;
    }
};

function inversNumber() {
    if (calculator.displayNumber === '0'){
        return;
    }   

    calculator.displayNumber = calculator.displayNumber * -1;
}

function performCalculation () {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator!');
        return;
    }

    let result = '0';
    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result,
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

function handleOperator (operator) {
    if (!calculator.isWaitForSecondNumber) {
        calculator.operator = operator;
        calculator.isWaitForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        //mengatur ulang nilai dari display number supaya btn selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan!');
    }

}

const buttons = document.querySelectorAll(".button");

for (const btn of buttons) {
    btn.addEventListener('click', function (event) {
        //mendapatkan objek elemen yang diklik
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
           inversNumber();
            updateDisplay();
            return;
        }

         if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }



        inputNumber(target.innerText);
        updateDisplay();
    });
};


