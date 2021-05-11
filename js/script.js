window.addEventListener('load', function OnWindowLoaded() {
 
    const numberButtons = document.querySelectorAll('[data-number]');
    const operandButtons = document.querySelectorAll('[data-operation]');
    const deleteOneSymb = document.querySelector('[data-delete]');
    const clearAllButtons = document.querySelector('[data-all-clear]');
    const equalButton = document.querySelector('[data-equals]');
    const outputSecondOperand = document.querySelector('.outputSecondOperand');
    const outputFirstOperand = document.querySelector('.outputFirstOperand');

    let result = {
        a: [],
        b: [],
        c: []
    };

    function showNum() {
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (result.b.length !== 0) {
                    result.c.push(button.innerHTML);
                }
                
                if (button.innerHTML != '.') {
                    cleanZero();
                }
                outputFirstOperand.innerHTML += button.innerHTML;
                toMuchNum();
            });

            console.log(result);
        });
    }

    function cleanZero() {
        if (outputFirstOperand.innerHTML == '0') {
            outputFirstOperand.innerHTML = '';
        }
    }

    function toMuchNum() {
        if (outputFirstOperand.innerHTML.length > 7) {
            outputFirstOperand.classList.add('smaller');
        }

        if (outputFirstOperand.innerHTML.length > 11) {
            outputFirstOperand.classList.add('theSmallest');
        }

        if (outputSecondOperand.innerHTML.length > 13) {
            outputSecondOperand.classList.add('secondSmaller');
        }

        if (outputFirstOperand.innerHTML.length < 2) {
            outputFirstOperand.classList.remove('smaller');
            outputFirstOperand.classList.remove('theSmallest');
            outputSecondOperand.classList.remove('secondSmaller');
        } 
    }

    function cleanAll() {
        clearAllButtons.addEventListener('click', () => {
            outputFirstOperand.innerHTML = '0';
            outputSecondOperand.innerHTML = '';
            result.a = [];
            result.b = [];
            result.c = [];
        });
    }

    function delLastNum() {
        deleteOneSymb.addEventListener('click', () => {
            outputFirstOperand.innerHTML = outputFirstOperand.innerHTML.slice(0, -1);
        });
    }

    function getOperand() {
        operandButtons.forEach(operand => {
            operand.addEventListener('click', () => {
                outputSecondOperand.innerHTML = outputFirstOperand.innerHTML;
                result.a.push(outputFirstOperand.innerHTML);
                result.b.push(operand.innerHTML);
                outputFirstOperand.innerHTML = '';
                toMuchNum();
            });
        });
    }

    function getSum() {
        equalButton.addEventListener('click', () => {
            let sum;
            const firstNum = Number(result.a.join(''));
            const secondNum = Number(result.c.join(''));
            if (result.b.indexOf('+') !== -1) {
                sum = firstNum + secondNum;
            }
            if (result.b.indexOf('-') !== -1) {
                sum = firstNum - secondNum;
            }
            if (result.b.indexOf('÷') !== -1) {
                sum = firstNum / secondNum;
            }
            if (result.b.indexOf('*') !== -1) {
                sum = firstNum * secondNum;
            }
            
            if (!Number.isInteger(sum)) {
                outputFirstOperand.innerHTML = sum.toFixed(3);
            } else {
                outputFirstOperand.innerHTML = sum;
            }

            outputSecondOperand.innerHTML = '';
            result.a = [];
            result.b = [];
            result.c = [];
            toMuchNum();
        });      
    }

    getSum();
    delLastNum();
    cleanAll();
    showNum();
    getOperand();
});