import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';

const File = sequelize.define('File', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	filename: { type: DataTypes.STRING, allowNull: false },
	mimetype: { type: DataTypes.STRING, allowNull: false },
	size: { type: DataTypes.INTEGER, allowNull: false },
	data: { type: DataTypes.BLOB('medium') }
}, {
	timestamps: true,
	tableName: 'File'
});

module.exports = File;