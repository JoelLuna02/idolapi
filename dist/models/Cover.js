"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../database/sequelize"));
const sequelize_2 = require("sequelize");
const OriginalSong_1 = __importDefault(require("./OriginalSong"));
const Cover = sequelize_1.default.define('Cover', {
    id: { type: sequelize_2.DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_2.DataTypes.STRING },
    musicVideo: { type: sequelize_2.DataTypes.STRING },
    illustration: { type: sequelize_2.DataTypes.STRING },
    mix: { type: sequelize_2.DataTypes.STRING }
}, {
    timestamps: true,
    modelName: 'Cover'
});
Cover.hasOne(OriginalSong_1.default, { foreignKey: 'cover_id', sourceKey: 'id' });
OriginalSong_1.default.belongsTo(Cover, { foreignKey: 'cover_id', targetKey: 'id' });
exports.default = Cover;
