const sequelize = require('../database/sequelize');
const { DataTypes } = require('sequelize');

const Hashtag = sequelize.define('Hashtag', {
	id:       { type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true },
	general:  { type: DataTypes.STRING,   unique: true },
	stream:   { type: DataTypes.STRING,   unique: true },
	fanart:   { type: DataTypes.STRING },
	memes:    { type: DataTypes.STRING },
}, {
	timestamps: false,
	tableName: 'Hashtag'
});

module.exports = Hashtag;