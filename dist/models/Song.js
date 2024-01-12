"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../database/sequelize"));
const sequelize_2 = require("sequelize");
const Song = sequelize_1.default.define('Song', {
    id: { type: sequelize_2.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_2.DataTypes.STRING, unique: true },
    album: { type: sequelize_2.DataTypes.STRING },
    releasedate: { type: sequelize_2.DataTypes.STRING },
    compositor: { type: sequelize_2.DataTypes.STRING },
    mixing: { type: sequelize_2.DataTypes.STRING },
    lyrics: { type: sequelize_2.DataTypes.STRING },
}, {
    timestamps: false,
    tableName: 'Song'
});
exports.default = Song;
