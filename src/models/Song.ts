import sequelize from '../database/sequelize';
import { DataTypes } from 'sequelize';

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
	tableName: 'Song'
});

export default Song;