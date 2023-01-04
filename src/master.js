const calculations = [];
const first = document.getElementById("first");
const second = document.getElementById("second");
const operator = document.getElementById("operator");
const clear = document.getElementById("clear");
const calculate = document.getElementById("calculate");
const showResult = document.querySelector("p");

function restoreFromLocalStorage() {
	const calculation = JSON.parse(localStorage.getItem('calc'));
	if(calculation) {
		calculations.push(...calculation);
	}
}

var convert = (num, value) => {
	if (value) {
		return value(num);
		} else {
		return num;
	}
};

var zero = (value) => convert(0,value); 
var one = (value) => convert(1,value); 
var two = (value) =>  convert(2,value); 
var three = (value) =>  convert(3,value); 
var four = (value) =>  convert(4,value); 
var five = (value) =>  convert(5,value); 
var six = (value) =>  convert(6,value); 
var seven = (value) =>  convert(7,value); 
var eight = (value) =>  convert(8,value); 
var nine = (value) =>  convert(9,value); 

var plus = (num2) => (num1) => num1 + num2;
var minus = (num2) => (num1) => num1 - num2;
var times = (num2) => (num1) => num1 * num2;
var divided_by = (num2) => (num1) => Math.floor(num1 / num2);

clear.onclick = function() {
	first.value = '';
	operator.value = '';
	second.value = '';
}

calculate.onclick = (e) => {
	if(first.value) {
		if(operator.value) {
			if(second.value) {
				e.preventDefault();
				let question = `${first.value}(${operator.value}(${second.value}()))`;
				//let result = eval(`${first}(${operator}(${second}()))`);
				let result = window[first.value](window[operator.value](window[second.value]()));
				let calculation = {
					question: question,
					result: result,
				};
				calculations.push(calculation);
				localStorage.setItem('calc', JSON.stringify(calculations));
				showResult.innerHTML = `<center><h3>Result</h3></center>
				<b>Question:</b> ${question}<br>
				<b>Answer:</b> ${result}`;
				} else {
				second.setCustomValidity('Please select num2');
			}
			} else {
			operator.setCustomValidity('Please select operator');
		}
		} else {
		first.setCustomValidity('Please select num1');
	}
};

restoreFromLocalStorage();