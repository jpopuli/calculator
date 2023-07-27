let calcButtons = document.querySelectorAll('.buttons button');
let inputMain = document.querySelector('#main');
let inputSub = document.querySelector('#sub');

calcButtons.forEach(function (button) {
	button.addEventListener('click', function () {
		let btn = this.innerHTML;
		inputMain.innerHTML += btn;

		switch (btn) {
			case 'CE':
				clear();
				break;
			case 'DEL':
				deleteChar();
			default:
				break;
		}
	});
});

function clear() {
	inputMain.textContent = '';
	inputSub.textContent = '';
}

function deleteChar() {
	inputMain
}
