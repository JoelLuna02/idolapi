const { bold, magentaBright, greenBright, cyanBright, yellowBright, whiteBright } = require('colorette');
const ver_express = require('express/package').version;
const ver_project = require('./package').version;
const os = require('os');

const platform = os.platform();

const versions = async () => {
	console.log(
		`\n${magentaBright('[START]')}:` + 
        `\n${magentaBright('[START]')}:\t Express.js Version: ${bold(greenBright(ver_express))}` +
		`\n${magentaBright('[START]')}:\t IdolAPI Version: ${bold(greenBright(ver_project))}`
	);
	switch (platform){
	case 'win32': console.log(`${magentaBright('[START]')}:\t Running on ${bold(cyanBright('Windows'))}`); break;
	case 'linux': console.log(`${magentaBright('[START]')}:\t Running on ${bold(yellowBright('Linux'))}`); break;
	case 'darwin': console.log(`${magentaBright('[START]')}:\t Running on ${bold(whiteBright('MacOS'))}`); break;
	case 'android': console.log(`${magentaBright('[START]')}:\t Running on ${bold(greenBright('Android'))}`); break;
	}
	console.log(`${magentaBright('[START]')}:`);
};

module.exports = versions;