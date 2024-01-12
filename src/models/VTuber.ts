import sequelize from '../database/sequelize';
import { DataTypes } from 'sequelize';

import Hashtag from './Hashtag';
import Social from './Social';
import Song from './Song';
import Cover from './Cover';

const VTuber = sequelize.define('VTuber', {
	id:        { type: DataTypes.INTEGER,                  primaryKey: true, autoIncrement: true },
	fullname:  { type: DataTypes.STRING,                   unique: true, allowNull: false },
	fanname:   { type: DataTypes.STRING,                   unique: true, allowNull: false },
	phrase:    { type: DataTypes.STRING },
	aliases:   { type: DataTypes.ARRAY(DataTypes.STRING)},
	debut:     { type: DataTypes.DATE,                     defaultValue: DataTypes.NOW, allowNull: false },
	branch:    { type: DataTypes.STRING,                   defaultValue: 'HE'},
	unit:      { type: DataTypes.STRING },
	emoji:     { type: DataTypes.STRING },
	youtube:   { type: DataTypes.STRING,                   unique: true, allowNull: false },
	avatarurl: { type: DataTypes.STRING },
	graduated: { type: DataTypes.BOOLEAN,                  defaultValue: false, allowNull: false },
	gender:    { type: DataTypes.STRING,                   defaultValue: 'Female' },
	likes:     { type: DataTypes.ARRAY(DataTypes.STRING) },
	dislikes:  { type: DataTypes.ARRAY(DataTypes.STRING) },
	age:       { type: DataTypes.INTEGER },
	birthday:  { type: DataTypes.STRING },
	zodiac:    { type: DataTypes.STRING },
	height:    { type: DataTypes.DOUBLE,                   defaultValue: 1.66 }
}, {
	timestamps: false,
	tableName: 'VTuber'
});

VTuber.hasMany(Cover, { foreignKey: 'vtid', sourceKey: 'id' });
Cover.belongsTo(VTuber, { foreignKey: 'vtid', targetKey: 'id'});

VTuber.hasOne(Hashtag, { foreignKey: 'vtid', sourceKey: 'id' });
Hashtag.belongsTo(VTuber, { foreignKey: 'vtid', targetKey: 'id' });

VTuber.hasMany(Song, { foreignKey: 'vtid', sourceKey: 'id' });
Song.belongsTo(VTuber, { foreignKey: 'vtid', targetKey: 'id' });

VTuber.hasMany(Social, { foreignKey: 'vtid', sourceKey: 'id' });
Social.belongsTo(VTuber, { foreignKey: 'vtid', targetKey: 'id' });

export default VTuber;