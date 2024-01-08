const sequelize = require('../database/sequelize');
const { DataTypes } = require('sequelize');

const File = sequelize.define('File', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	filename: { type: DataTypes.STRING, allowNull: false },
	mimetype: { type: DataTypes.STRING, allowNull: false },
	size: { type: DataTypes.INTEGER, allowNull: false },
	data: { type: DataTypes.BLOB('medium') }
}, {
	timestamps: true,
	modelName: 'File'
});

module.exports = File;