const form = document.querySelector('form');
const input = document.querySelector('input');
const h1 = document.querySelector('h1');

form.addEventListener('submit', (e) => {
	const { value } = input;
	if (value.includes('@')) {
		h1.innerHTML = 'Email is valid.';
	} else {
		h1.innerHTML = 'Email is invalid.';
	}
	e.preventDefault();
});
