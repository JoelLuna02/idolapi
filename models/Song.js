const sequelize = require('../database/sequelize');
const { DataTypes } = require('sequelize');

const Song = sequelize.define('Song', {
	id:           { type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true },
	name:         { type: DataTypes.STRING,   unique: true },
	album:        { type: DataTypes.STRING },
	releasedate:  { type: DataTypes.STRING },
	compositor:   { type: DataTypes.STRING },
	mixing:       { type: DataTypes.STRING },
	lyrics:       { type: DataTypes.STRING },
}, {
	timestamps: false,
	modelName: 'Song'
});

module.exports = Song;