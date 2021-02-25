
// const calculate = (n1, operator, n2) => {  //Set basic operator
// const firstNum = parseFloat(n1)
// const secondNum = parseFloat(n2)
// if (operator === 'add') return firstNum + secondNum
// if (operator === 'subtract') return firstNum - secondNum
// if (operator === 'multiply') return firstNum * secondNum
// if (operator === 'divide') return firstNum / secondNum
// }

// const getKeyType = key => {  //Set the type of keys
// const { action } = key.dataset
// if (!action) return 'number'
// if (
// action === 'add' ||
// action === 'subtract' ||
// action === 'multiply' ||
// action === 'divide'
// ) return 'operator'
// // For everything else, return the action
// return action
// }

// //set Result for each case
// const createResult = (key, displayedNum, state) => {
// const keyContent = key.innerHTML;
// const keyType = getKeyType(key)
// const {
// firstValue,
// operator,
// modValue,
// previousKeyType
// } = state

// if (keyType === 'number') { //normal operator
// return displayedNum === '0' ||
// previousKeyType === 'operator' ||
// previousKeyType === 'calculate'
// ? keyContent
// : displayedNum + keyContent
// }

// if (keyType === 'decimal') {  //when user press . button
// if (!displayedNum.includes('.')) return displayedNum + '.'
// if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
// return displayedNum
// }

// if (keyType === 'operator') {
// return firstValue &&
// operator &&
// previousKeyType !== 'operator' && previousKeyType !== 'calculate'
// ? calculate(firstValue, operator, displayedNum) : displayedNum
// }

// if (keyType === 'clear') return 0 //user press AC button

// if (keyType === 'calculate') {  //perform consecutive operator
// return firstValue
// ? previousKeyType === 'calculate'
// ? calculate(displayedNum, operator, modValue)
// : calculate(firstValue, operator, displayedNum) : displayedNum
// }
// }

// const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
// const keyType = getKeyType(key)
// const {
// firstValue,
// operator,
// modValue,
// previousKeyType
// } = calculator.dataset

// calculator.dataset.previousKeyType = keyType

// if (keyType === 'operator') {
// calculator.dataset.operator = key.dataset.action
// calculator.dataset.firstValue = firstValue &&
// operator &&
// previousKeyType !== 'operator' &&
// previousKeyType !== 'calculate'
// ? calculatedValue : displayedNum
// }

// if (keyType === 'calculate') {
// calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
// ? modValue : displayedNum
// }

// // clear when user press AC / CE
// if (keyType === 'clear' && key.textContent === 'AC') {
// calculator.dataset.firstValue = ''
// calculator.dataset.modValue = ''
// calculator.dataset.operator = ''
// calculator.dataset.previousKeyType = ''
// }
// }

// const updateDisplay = (key, calculator) => {
// const keyType = getKeyType(key)
// Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

// if (keyType === 'operator') key.classList.add('is-depressed')
// if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
// if (keyType !== 'clear') {
// const clearButton = calculator.querySelector('[data-action=clear]')
// clearButton.textContent = 'CE'
// }
// }

// keys.addEventListener('click', e => {  //add event to button
// if (!e.target.matches('button')) return
// const key = e.target;
// const displayedNum = display.textContent
// const resultString = createResult(key, displayedNum, calculator.dataset)

// display.textContent = resultString
// updateCalculatorState(key, calculator, resultString, displayedNum)
// updateDisplay(key, calculator);
// console.log(displayedNum);
// })
const calculatorContainer = document.querySelector('.calculator')
const display = document.querySelector('.operator-display');
const result = calculatorContainer.querySelector('.result');
const keys = calculatorContainer.querySelector('.calculator-keys');
const calculator_buttons = [   //Create list of buttons
    {
        name: 'add',
        symbol: '+',
        formula: '+',
        type: 'operator',
        class: 'key-operator',
    },
    {
        name: 'subtract',
        symbol: '-',
        formula: '-',
        type: 'operator',
        class: 'key-operator',
    },
    {
        name: 'multiple',
        symbol: 'x',
        formula: "*",
        type: 'operator',
        class: 'key-operator',
    },
    {
        name: 'divide',
        symbol: '/',
        formula: '/' ,
        type: 'operator' ,
        class: 'key-operator',
    },
    {
        name: '7',
        symbol: 7,
        formula: 7,
        type: 'number',
    },
    {
        name: '8',
        symbol: 8,
        formula: 8,
        type: 'number',
    },
    {
        name: '9',
        symbol: 9,
        formula: 9,
        type: 'number',
    },
    {
        name: '4',
        symbol: 4,
        formula: 4,
        type: 'number',
    },
    {
        name: '5',
        symbol: 5,
        formula: 5,
        type: 'number',
    },
    {
        name: '6',
        symbol: 6,
        formula: 6,
        type: 'number',
    },
    {
        name: '1',
        symbol: 1,
        formula: 1,
        type: 'number',
    },
    {
        name: '2',
        symbol: 2,
        formula: 2,
        type: 'number',
    },
    {
        name: '3',
        symbol: 3,
        formula: 3,
        type: 'number',
    },
    {
        name: '0',
        symbol: 0,
        formula: 0,
        type: 'number',
    },
    {
        name: 'comma',
        symbol: '.',
        formula: '.',
        type: 'decimal',
    },
    {
        name : 'delete',
        symbol: 'CE',
        formula: false,
        type: 'key'
    },
    {
        name: 'percentage',
        symbol: '%',
        formula: '/100',
        type: 'number',
    },
    {
        name: 'clear',
        symbol: 'AC',
        formula: false,
        type: 'key',
        class: 'clear-button'
    },
    {
        name: 'calculate',
        symbol: '=',
        formula: '=',
        type: 'calculate',
        class: 'key-equal'
    }
];

    var data = {
        operation: [],
        result: [],
    }

    const createCalculatorButtons = () => { //add button from list to page
        var added_btns = 0;
        calculator_buttons.forEach((button, index) => {
            keys.innerHTML += `<button id="${button.name}" class="${button.class}">
            ${button.symbol}</button>`;
            added_btns++;
        });
    }
    createCalculatorButtons();

    keys.addEventListener("click" , e => { //add event
        const key = e.target;

        calculator_buttons.forEach(
            button => {
                if(button.name == key.id) {
                    return calculator(button);
                }
            }
        )
    });

    var calculator = button => {            // Define operators , calculate result and update result 
        if(button.type == 'operator') {
            data.operation.push(button.symbol);
            data.result.push(button.formula);
        } else if (button.type == 'number'){
            data.operation.push(button.symbol);
            data.result.push(button.formula);
        } else if (button.type == 'key'){
            if(button.name == 'clear') {
                data.operation = [];
                data.result = [];
                updateResult(0);
            }
            else if (button.name == 'delete') {
                data.result.pop();
                data.operation.pop();
            }
        } else if (button.type == 'calculate'){
            let resultString = data.result.join('');

            data.operation = []; //Clear all arrays;
            data.result = [];

            let result_final;
            try {
                result_final = eval(resultString);   //Calculate result and handle errors
            } catch (error) {
                if(error instanceof SyntaxError) { 
                    result_final = 'Syntax Error!'
                    updateResult(result_final);
                    return;
                }
            }

            result_final = formatResult(result_final);  //Formate result

            data.operation.push(result_final); //save result for later if user perform consecutively
            data.result.push(result_final);

            updateResult(result_final); //update output
            return;
        }
        updateOutputOperation(data.operation.join(''));
    }
    const updateOutputOperation = operation => {
        display.innerHTML = operation;
    }
    const updateResult = finalresult => {
        result.innerHTML = finalresult;
    }
    const digitCounter = number => {
        return number.toString().length;
    }
    const isFloat = number => {
        return number % 1 != 0;
    }
    const max_output_number_length = 10;
    const output_precision = 5;

    const formatResult = result => {
        if(digitCounter(result) > max_output_number_length) {
            if(isFloat(result)) {
                const result_float = parseFloat(result);
                const result_float_length = digitCounter(result_float);

                if(result_float_length > max_output_number_length){
                    return result.toPrecision(output_precision);
                } else {
                    const num_digit_after_point = max_output_number_length - result_float_length;
                    return result.toFixed(num_digit_after_point);
                }
            } else {
                return result.toPrecision(output_precision)
            }
        } else return result;
    }