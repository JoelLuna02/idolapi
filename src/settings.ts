import { yellowBright, bold, cyan, whiteBright } from 'colorette';
import http from 'http';

function myCustomFormat(tokens:any, req:any, res:any): any {
	const status = tokens.status(req, res);
	const statusdesc = http.STATUS_CODES[status] || 'Unknown';
	const colorizedStatus = status >= 500 ? `\x1b[31m${status} ${statusdesc}\x1b[0m` :
		status >= 400 ? `\x1b[33m${status} ${statusdesc}\x1b[0m` :
			status >= 300 ? `\x1b[36m${status} ${statusdesc}\x1b[0m` :
				`\x1b[32m${status} ${statusdesc}\x1b[0m`;
	return [
		`[${cyan('INFO')}]\t`,
		whiteBright(`"${tokens.method(req, res)} ${tokens.url(req, res)}"`), 
		'-', bold(colorizedStatus),
		tokens.res(req, res, 'content-length'), '-',
		`${yellowBright(tokens['response-time'](req, res))}`, 'ms',
	].join(' ');
};

export default myCustomFormat;