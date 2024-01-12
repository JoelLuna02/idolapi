"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assets = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const jwt_routes_1 = __importDefault(require("./jwt.routes"));
const File_1 = __importDefault(require("../models/File"));
exports.assets = (0, express_1.Router)();
const store = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: store });
exports.assets.post('/upload', upload.single('file'), jwt_routes_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ message: 'Error: you must specify the file to upload' });
    }
    const newfile = req.file;
    const bytes = newfile.buffer;
    yield File_1.default.create({
        filename: newfile.originalname,
        mimetype: newfile.mimetype,
        size: newfile.size,
        data: bytes
    });
    return res.status(200).json({ message: 'Successfully file stored' });
}));
exports.assets.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield File_1.default.findAll({
        attributes: ['id', 'filename', 'mimetype', 'size', 'createdAt']
    });
    return res.status(200).json(files);
}));
exports.assets.get('/:file', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.params.file;
    try {
        const file = yield File_1.default.findOne({ where: { filename } });
        if (!file) {
            return res.status(404).json({ message: 'Error: file not found' });
        }
        res.set({
            'Content-Length': file.size,
            'Content-Type': file.mimetype
        });
        return res.end(file.data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error while finding file, see the console for more details' });
    }
}));
exports.assets.delete('/:file', jwt_routes_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.params.file;
    try {
        const file = yield File_1.default.findOne({ where: { filename } });
        if (!file) {
            return res.status(404).json({ message: 'Error: file not found' });
        }
        file.destroy();
        return res.status(204).json();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error while finding file, see the console for more details' });
    }
}));
exports.default = exports.assets;
