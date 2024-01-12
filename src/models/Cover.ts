import sequelize from '../database/sequelize';
import { DataTypes } from 'sequelize';
import OriginalSong from './OriginalSong';

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

export default Cover;