import { bold, magentaBright, greenBright, cyanBright, yellowBright, whiteBright } from 'colorette';
const ver_express = require('express/package').version;
const ver_project = require('../package').version;
import os from 'os';

const platform = os.platform();

async function versions() {
	console.log(
		`\n${magentaBright('[START]')}:` +
			`\n${magentaBright('[START]')}:\t Express.js Version: ${bold(
				greenBright(ver_express)
			)}` +
			`\n${magentaBright('[START]')}:\t IdolAPI Version: ${bold(
				greenBright(ver_project)
			)}`
	);
	switch (platform) {
	case 'win32':
		console.log(
			`${magentaBright('[START]')}:\t Running on ${bold(
				cyanBright('Windows')
			)}`
		);
		break;
	case 'linux':
		console.log(
			`${magentaBright('[START]')}:\t Running on ${bold(
				yellowBright('Linux')
			)}`
		);
		break;
	case 'darwin':
		console.log(
			`${magentaBright('[START]')}:\t Running on ${bold(
				whiteBright('MacOS')
			)}`
		);
		break;
	case 'android':
		console.log(
			`${magentaBright('[START]')}:\t Running on ${bold(
				greenBright('Android')
			)}`
		);
		break;
	}
	console.log(`${magentaBright('[START]')}:`);
};

export default versions;
