/* eslint-disable camelcase */
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const authdata = require('../api/authdata.json');
const User = require('../models/User');
const authrouter = express.Router();
require('dotenv').config();

const secret = process.env.TOKEN_SECRET;

function verify_Token (req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, secret, (err, decoded) => {
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
	} catch (error) {
		return res.status(401).json({ message: 'Unauthorized: Token not provided' });
	}
}

authrouter.use(bodyParser.json());

authrouter.get('/', (req, res) => {
	return res.status(200).json(authdata);
});

authrouter.post('/signup', async (req, res) => {
	const form = req.body;
	const hashpass = await bcrypt.hash(form.password, 12);
	try {
		const user = await User.create({
			firstname: form.firstname,
			lastname: form.lastname,
			phone: parseInt(form.phone, 10),
			email: form.email,
			username: form.username,
			password: hashpass,
			isAdmin: form.isAdmin || false
		});
		return res.status(201).json({ new_user: user, message: 'Successfully created user!' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			message: 'Error: failed to create user. Please see the console for more details'
		});
	}
});

authrouter.post('/login', async (req, res) => {
	const form = req.body;
	try {
		const user = await User.findOne({where: { username: form.username } });
		if (!user) { return res.status(401).json({ message: 'Access denied: The username does not exists'}); }
		const passwd = await bcrypt.compare(form.password, user.password);
		if (!user || !passwd) {
			return res.status(401).json({message: 'Access denied: incorrect password. please try again'});
		}
		const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, secret,
			{ expiresIn: '1h' }
		);
		return res.status(200).json({ logged_as: user, access_token: token });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Error: failed to create user. Please see the console for more details'
		});
	}
});

module.exports = { authrouter, verify_Token };
