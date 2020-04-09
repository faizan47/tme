const jsdom = require('jsdom');
const { JSDOM } = jsdom;
// const path = require('path');

const render = async (file) => {
	// const filePath = path.join(process.cwd(), file);
	// // const filePath = file;
	const dom = await JSDOM.fromFile(file, { runScripts: 'dangerously', resources: 'usable' });
	return new Promise(async (resolve) => {
		dom.window.document.addEventListener('DOMContentLoaded', () => {
			resolve(dom);
		});
	});
};

module.exports = render;
