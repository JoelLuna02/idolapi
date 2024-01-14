import { magentaBright, greenBright, cyanBright } from 'colorette';
const ver_express = require('express/package').version;
const ver_project = require('../package').version;
import os from 'os';

const platform = os.platform();

async function versions() {
	console.log(
		`[${magentaBright('START')}]` +
			`\n[${magentaBright('START')}]\t Express.js Version: ${
				greenBright(ver_express)
			}` +
			`\n[${magentaBright('START')}]\t IdolAPI Version: ${
				greenBright(ver_project)
			}`
	);
	switch (platform) {
	case 'win32':
		console.log(
			`[${magentaBright('START')}]\t Running on ${
				cyanBright('Windows')}`
		);
		break;
	case 'linux':
		console.log(
			`[${magentaBright('START')}]\t Running on ${
				'Linux'
			}`
		);
		break;
	case 'darwin':
		console.log(
			`[${magentaBright('START')}]\t Running on ${
				'MacOS'
			}`
		);
		break;
	case 'android':
		console.log(
			`[${magentaBright('START')}]\t Running on ${
				greenBright('Android')
			}`
		);
		break;
	}
	console.log(`[${magentaBright('START')}]`);
};

export default versions;
