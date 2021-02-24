const calculator = document.querySelector('.calculator')
const display = calculator.querySelector('.result')
const keys = calculator.querySelector('.calculator-keys')
const calculate = (n1, operator, n2) => {  //Set basic operator
const firstNum = parseFloat(n1)
const secondNum = parseFloat(n2)
if (operator === 'add') return firstNum + secondNum
if (operator === 'subtract') return firstNum - secondNum
if (operator === 'multiply') return firstNum * secondNum
if (operator === 'divide') return firstNum / secondNum
}

const getKeyType = key => {  //Set the type of keys
const { action } = key.dataset
if (!action) return 'number'
if (
action === 'add' ||
action === 'subtract' ||
action === 'multiply' ||
action === 'divide'
) return 'operator'
// For everything else, return the action
return action
}

//set Result for each case
const createResult = (key, displayedNum, state) => {
const keyContent = key.textContent
const keyType = getKeyType(key)
const {
firstValue,
operator,
modValue,
previousKeyType
} = state

if (keyType === 'number') { //normal operator
return displayedNum === '0' ||
previousKeyType === 'operator' ||
previousKeyType === 'calculate'
? keyContent
: displayedNum + keyContent
}

if (keyType === 'decimal') {  //when user press . button
if (!displayedNum.includes('.')) return displayedNum + '.'
if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
return displayedNum
}

if (keyType === 'operator') {
return firstValue &&
operator &&
previousKeyType !== 'operator' && previousKeyType !== 'calculate'
? calculate(firstValue, operator, displayedNum) : displayedNum
}

if (keyType === 'clear') return 0 //user press AC button

if (keyType === 'calculate') {  //perform consecutive operator
return firstValue
? previousKeyType === 'calculate'
? calculate(displayedNum, operator, modValue)
: calculate(firstValue, operator, displayedNum) : displayedNum
}
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
const keyType = getKeyType(key)
const {
firstValue,
operator,
modValue,
previousKeyType
} = calculator.dataset

calculator.dataset.previousKeyType = keyType

if (keyType === 'operator') {
calculator.dataset.operator = key.dataset.action
calculator.dataset.firstValue = firstValue &&
operator &&
previousKeyType !== 'operator' &&
previousKeyType !== 'calculate'
? calculatedValue : displayedNum
}

if (keyType === 'calculate') {
calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
? modValue : displayedNum
}

// clear when user press AC / CE
if (keyType === 'clear' && key.textContent === 'AC') {
calculator.dataset.firstValue = ''
calculator.dataset.modValue = ''
calculator.dataset.operator = ''
calculator.dataset.previousKeyType = ''
}
}

const updateDisplay = (key, calculator) => {
const keyType = getKeyType(key)
Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))

if (keyType === 'operator') key.classList.add('is-depressed')
if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
if (keyType !== 'clear') {
const clearButton = calculator.querySelector('[data-action=clear]')
clearButton.textContent = 'CE'
}
}

keys.addEventListener('click', e => {  //add event to button
if (!e.target.matches('button')) return
const key = e.target
const displayedNum = display.textContent
const resultString = createResult(key, displayedNum, calculator.dataset)

display.textContent = resultString
updateCalculatorState(key, calculator, resultString, displayedNum)
updateDisplay(key, calculator)
})