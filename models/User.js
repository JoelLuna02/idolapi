const sequelize = require('../database/sequelize');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstname: { type: DataTypes.STRING },
	lastname: { type: DataTypes.STRING },
	phone: { type: DataTypes.BIGINT },
	email: { type: DataTypes.STRING, unique: true },
	username: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
	timestamps: true,
	tableName: 'User',
});

module.exports = User;