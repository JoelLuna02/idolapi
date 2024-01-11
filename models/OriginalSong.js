const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const OriginalSong = sequelize.define('OriginalSong', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	artist: { type: DataTypes.STRING },
	album: { type: DataTypes.STRING },
	release: { type: DataTypes.STRING },
	genre: { type: DataTypes.ARRAY(DataTypes.STRING) }
}, {
	timestamps: true,
	modelName: 'OriginalSong'
});

module.exports = OriginalSong;