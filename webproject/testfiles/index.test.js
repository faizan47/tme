const assert = require('assert');

it('Check if input exists', async () => {
	const dom = await render('index.html');
	const input = dom.window.document.querySelector('input');
	assert(input);
});

// async function validateForm(email) {
// 	const dom = await render('index.html');
// 	const input = dom.window.document.querySelector('input');
// 	const h1 = dom.window.document.querySelector('h1');
// 	input.value = email;
// 	dom.window.document.dispatchEvent(new dom.window.Event('submit'));
// 	return h1;
// }

it('Shows correct message when email is valid.', async () => {
	const dom = await render('index.html');
	const input = dom.window.document.querySelector('input');
	input.value = 'mail@mail.com';
	const h1 = dom.window.document.querySelector('h1');
	dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));
	assert.strictEqual(h1.innerHTML, 'Email is valid.');
});

it('Shows correct message when email is invalid.', async () => {
	const dom = await render('index.html');
	const input = dom.window.document.querySelector('input');
	input.value = 'invalidcom';
	const h1 = dom.window.document.querySelector('h1');
	dom.window.document.querySelector('form').dispatchEvent(new dom.window.Event('submit'));
	assert.strictEqual(h1.innerHTML, 'Email is invalid.');
});
