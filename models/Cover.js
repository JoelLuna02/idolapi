const sequelize = require('../database/sequelize');
const { DataTypes } = require('sequelize');
const OriginalSong = require('./OriginalSong');

const Cover = sequelize.define('Cover', {
	id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING },
	musicVideo: { type: DataTypes.STRING },
	illustration: { type: DataTypes.STRING },
	mix: { type: DataTypes.STRING }
}, {
	timestamps: true,
	modelName: 'Cover'
});

Cover.hasOne(OriginalSong, { foreignKey: 'cover_id', sourceKey: 'id' });
OriginalSong.belongsTo(Cover, { foreignKey: 'cover_id', targetKey: 'id'});

module.exports = Cover;