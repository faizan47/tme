const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = console.log;
const forbiddenDirs = [ 'node_modules' ];
const render = require('./render');

class Runner {
	constructor() {
		this.testFiles = [];
	}

	async runFiles() {
		const files = this.testFiles;
		for (let file of files) {
			log(chalk.grey('----', file.shortName));
			let beforeEachFuncs = [];
			global.render = render;
			global.beforeEach = (func) => {
				beforeEachFuncs.push(func);
			};
			global.it = async (desc, fn) => {
				beforeEachFuncs.forEach((func) => func());
				try {
					await fn();
					log(chalk.green('Test succeeded! --- ', desc));
				} catch (error) {
					log(chalk.red('-----Test failed-----', desc));
					log(chalk.red('\t', error.message));
				}
			};
			try {
				require(file.name);
			} catch (error) {
				log(error);
			}
		}
	}
	async collectFiles(targetPath) {
		const files = await fs.promises.readdir(targetPath);

		for (let file of files) {
			const filepath = path.join(targetPath, file);
			const stats = await fs.promises.lstat(filepath);

			if (stats.isFile() && file.includes('.test.js')) {
				this.testFiles.push({ name: filepath, shortName: file });
			} else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
				const childFiles = await fs.promises.readdir(filepath);
				files.push(...childFiles.map((f) => path.join(file, f)));
			}
		}
		// return files;
	}
}

module.exports = Runner;
