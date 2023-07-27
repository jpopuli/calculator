const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const clear = document.querySelector('[data-clear]');
const backspace = document.querySelector('[data-delete]');
const decimal = document.querySelector('[data-decimal]');
const percentage = document.querySelector('[data-percentage]');
const equal = document.querySelector('[data-equal]');

const expression = document.querySelector('[data-expression]');
const calculated = document.querySelector('[data-calculated]');

numbers.forEach(function (btn) {
	btn.addEventListener('click', function () {
		expression.textContent += this.textContent;
		computeExpression();
		scrollRight(expression);
	});
});

operators.forEach(function (btn) {
	btn.addEventListener('click', function () {
		let operator = this.textContent;
		chooseOperator(operator);
		computeExpression();
		scrollRight(expression);
	});
});

clear.addEventListener('click', function () {
	clearAll();
});

backspace.addEventListener('click', function () {
	deleteLastDigit();
	scrollRight(expression);
});

decimal.addEventListener('click', function () {
	appendDecimal();
	scrollRight(expression);
});

equal.addEventListener('click', function () {
	expression.textContent = calculated.textContent;
	calculated.textContent = '';
});

percentage.addEventListener('click', function () {
	calcPercentage(expression.textContent);
	scrollRight(expression);
});

// Function to scroll the content to the right
function scrollRight(element) {
	element.scrollLeft = element.scrollWidth - element.clientWidth;
}

// FUNCTIONS
function clearAll() {
	expression.textContent = '';
	calculated.textContent = '';
}

function deleteLastDigit() {
	let currentExpression = expression.textContent;
	if (currentExpression.length > 0) {
		currentExpression = currentExpression.slice(0, -1);
		updateDisplay(currentExpression);
		computeExpression();
	}
}

function updateDisplay(str) {
	expression.textContent = str;
}

function chooseOperator(operator) {
	const operatorSymbols = ['+', '−', '×', '÷'];
	const allowedFirstOperator = ['−']; // List of allowed operators as the first character

	console.log(operator);
	let currentExpression = expression.textContent;
	let lastChar = currentExpression.slice(-1); // Get the last character of the expression

	if (currentExpression.length === 0 && !allowedFirstOperator.includes(operator)) {
		// If the expression is empty, only allow the '-' operator as the first character
		return;
	}

	if (operatorSymbols.includes(lastChar)) {
		// If the last character is an operator, replace it with the new operator
		currentExpression = currentExpression.slice(0, -1) + operator;
	} else {
		// Otherwise, simply append the new operator to the expression
		currentExpression += operator;
	}
	updateDisplay(currentExpression);
	scrollRight(expression);
}

function appendDecimal() {
	let currentExpression = expression.textContent;
	let lastChar = currentExpression.slice(-1); // Get the last character of the expression

	// Check if the last character is already a decimal point or if there's an operator
	if (lastChar === '.' || isOperator(lastChar)) {
		return; // Prevent adding multiple decimal points consecutively or after an operator
	}

	if (currentExpression.length === 0) {
		// If the expression is empty, add a leading zero before the decimal point
		currentExpression = '0.';
	} else {
		// Find the last operator in the expression
		const lastOperatorIndex = findLastOperatorIndex(currentExpression);
		const lastNum = currentExpression.slice(lastOperatorIndex + 1);
		if (!lastNum.includes('.')) {
			// If the last number does not contain a decimal point, append the new decimal point
			currentExpression += '.';
		}
	}

	updateDisplay(currentExpression);
}

function isOperator(char) {
	const operatorSymbols = ['+', '-', '*', '/'];
	return operatorSymbols.includes(char);
}

function findLastOperatorIndex(str) {
	const operatorSymbols = ['+', '-', '*', '/'];

	for (let i = str.length - 1; i >= 0; i--) {
		if (operatorSymbols.includes(str[i])) {
			return i;
		}
	}
	return -1;
}

function computeExpression() {
	let currentExpression = expression.textContent;

	// Replace operator symbols before evaluation
	currentExpression = replaceOperatorSymbols(currentExpression);

	try {
		// Use eval to calculate the result (use with caution!)
		const result = eval(currentExpression);

		// Display the result
		calculated.textContent = result;
	} catch (error) {
		// Handle any errors in the expression
		calculated.textContent = '';
	}
}

function replaceOperatorSymbols(expression) {
	const operatorReplacements = {
		'÷': '/',
		'×': '*',
		'−': '-',
	};

	// Use regular expression to replace operator symbols with corresponding characters
	return expression.replace(/÷|×|−/g, (match) => operatorReplacements[match]);
}

function calcPercentage(num) {
	// Convert the percentage value to a decimal
	const percentageValue = parseFloat(num) / 100;

	let currentExpression = expression.textContent;

	// Check if the percentage calculation is valid
	if (isNaN(percentageValue) || currentExpression.includes('%')) {
		calculated.textContent = 'Error';
		return;
	}

	// Remove the last character if it's the percent sign
	const lastChar = currentExpression.slice(-1);
	if (lastChar === '%') {
		currentExpression = currentExpression.slice(0, -1);
	}

	try {
		// Use eval to calculate the result (use with caution!)
		const result = eval(currentExpression) * percentageValue;

		// Display the result
		calculated.textContent = result;
	} catch (error) {
		// Handle any errors in the expression
		calculated.textContent = 'Error';
	}
}
