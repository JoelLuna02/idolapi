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
exports.authrouter = void 0;
/* eslint-disable camelcase */
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const body_parser_1 = __importDefault(require("body-parser"));
const authdata_json_1 = __importDefault(require("../api/authdata.json"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = require("dotenv");
const authrouter = (0, express_1.Router)();
exports.authrouter = authrouter;
(0, dotenv_1.config)();
const secret = process.env.TOKEN_SECRET;
function verify_Token(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized', description: `${err}` });
            }
            req.user = decoded;
            const isAdmin = req.user.isAdmin || false;
            if (!isAdmin) {
                return res.status(403).json({
                    message: 'Forbidden: You need administrative privileges to access this resource'
                });
            }
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ Unauthorized: 'Token not provided' });
    }
}
authrouter.use(body_parser_1.default.json());
authrouter.get('/', (req, res) => {
    return res.status(200).json(authdata_json_1.default);
});
authrouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = req.body;
    const hashpass = yield bcryptjs_1.default.hash(form.password, 12);
    try {
        const user = yield User_1.default.create({
            firstname: form.firstname,
            lastname: form.lastname,
            phone: parseInt(form.phone, 10),
            email: form.email,
            username: form.username,
            password: hashpass,
            isAdmin: form.isAdmin || false
        });
        return res.status(201).json({ new_user: user, message: 'Successfully created user!' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error: failed to create user. Please see the console for more details'
        });
    }
}));
authrouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = req.body;
    try {
        const user = yield User_1.default.findOne({ where: { username: form.username } });
        if (!user) {
            return res.status(401).json({ message: 'Access denied: The username does not exists' });
        }
        const passwd = yield bcryptjs_1.default.compare(form.password, user.password);
        if (!user || !passwd) {
            return res.status(401).json({ message: 'Access denied: incorrect password. please try again' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, secret, { expiresIn: '1h' });
        return res.status(200).json({ logged_as: user, access_token: token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error: failed to create user. Please see the console for more details'
        });
    }
}));
exports.default = verify_Token;
