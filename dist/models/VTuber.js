"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../database/sequelize"));
const sequelize_2 = require("sequelize");
const Hashtag_1 = __importDefault(require("./Hashtag"));
const Social_1 = __importDefault(require("./Social"));
const Song_1 = __importDefault(require("./Song"));
const Cover_1 = __importDefault(require("./Cover"));
const VTuber = sequelize_1.default.define('VTuber', {
    id: { type: sequelize_2.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullname: { type: sequelize_2.DataTypes.STRING, unique: true, allowNull: false },
    fanname: { type: sequelize_2.DataTypes.STRING, unique: true, allowNull: false },
    phrase: { type: sequelize_2.DataTypes.STRING },
    aliases: { type: sequelize_2.DataTypes.ARRAY(sequelize_2.DataTypes.STRING) },
    debut: { type: sequelize_2.DataTypes.DATE, defaultValue: sequelize_2.DataTypes.NOW, allowNull: false },
    branch: { type: sequelize_2.DataTypes.STRING, defaultValue: 'HE' },
    unit: { type: sequelize_2.DataTypes.STRING },
    emoji: { type: sequelize_2.DataTypes.STRING },
    youtube: { type: sequelize_2.DataTypes.STRING, unique: true, allowNull: false },
    avatarurl: { type: sequelize_2.DataTypes.STRING },
    graduated: { type: sequelize_2.DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    gender: { type: sequelize_2.DataTypes.STRING, defaultValue: 'Female' },
    likes: { type: sequelize_2.DataTypes.ARRAY(sequelize_2.DataTypes.STRING) },
    dislikes: { type: sequelize_2.DataTypes.ARRAY(sequelize_2.DataTypes.STRING) },
    age: { type: sequelize_2.DataTypes.INTEGER },
    birthday: { type: sequelize_2.DataTypes.STRING },
    zodiac: { type: sequelize_2.DataTypes.STRING },
    height: { type: sequelize_2.DataTypes.DOUBLE, defaultValue: 1.66 }
}, {
    timestamps: false,
    tableName: 'VTuber'
});
VTuber.hasMany(Cover_1.default, { foreignKey: 'vtid', sourceKey: 'id' });
Cover_1.default.belongsTo(VTuber, { foreignKey: 'vtid', targetKey: 'id' });
VTuber.hasOne(Hashtag_1.default, { foreignKey: 'vtid', sourceKey: 'id' });
Hashtag_1.default.belongsTo(VTuber, { foreignKey: 'vtid', targetKey: 'id' });
VTuber.hasMany(Song_1.default, { foreignKey: 'vtid', sourceKey: 'id' });
Song_1.default.belongsTo(VTuber, { foreignKey: 'vtid', targetKey: 'id' });
VTuber.hasMany(Social_1.default, { foreignKey: 'vtid', sourceKey: 'id' });
Social_1.default.belongsTo(VTuber, { foreignKey: 'vtid', targetKey: 'id' });
exports.default = VTuber;
