const sequelize = require('../database/sequelize');
const { DataTypes } = require('sequelize');

const Social = sequelize.define('Social', {
	id:           { type: DataTypes.INTEGER,   primaryKey: true, autoIncrement: true },
	application:  { type: DataTypes.STRING },
	socialurl:    { type: DataTypes.STRING,    unique: true },
}, {
	timestamps: false,
	tableName: 'Social',
});

module.exports = Social;