const { Router } = require('express');
const multer = require('multer');
const { verify_Token } = require('./jwt.routes.js');
const File = require('../models/File.js');

const assets = Router();
const store = multer.memoryStorage();
const upload = multer({ storage: store });

assets.post('/upload', upload.single('file'), verify_Token, async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ message: 'Error: you must specify the file to upload' });
	}
	const newfile = req.file;
	const bytes = newfile.buffer;

	await File.create({
		filename: newfile.originalname,
		mimetype: newfile.mimetype,
		size: newfile.size,
		data: bytes
	});
	return res.status(200).json({ message: 'Successfully file stored' });
});

assets.get('/', async (req, res) => {
	const files = await File.findAll({
		attributes: ['id', 'filename', 'mimetype', 'size', 'createdAt']
	});
	return res.status(200).json(files);
});

assets.get('/:file', async (req, res) => {
	const filename = req.params.file;
	try {
		const file = await File.findOne({ where: { filename } });
		if (!file) {
			return res.status(404).json({ message: 'Error: file not found' });
		}
		res.set({
			'Content-Length': file.size,
			'Content-Type': file.mimetype
		});
		return res.end(file.data);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error while finding file, see the console for more details' });
	}
});

assets.delete('/:file', verify_Token, async (req, res) => {
	const filename = req.params.file;
	try {
		const file = await File.findOne({ where: { filename } });
		if (!file) {
			return res.status(404).json({ message: 'Error: file not found' });
		}
		file.destroy();
		return res.status(204).json();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error while finding file, see the console for more details' });
	}
});

module.exports = assets;
