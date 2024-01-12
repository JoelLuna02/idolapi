"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const OriginalSong = sequelize_2.default.define('OriginalSong', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    artist: { type: sequelize_1.DataTypes.STRING },
    album: { type: sequelize_1.DataTypes.STRING },
    release: { type: sequelize_1.DataTypes.STRING },
    genre: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING) }
}, {
    timestamps: true,
    modelName: 'OriginalSong'
});
exports.default = OriginalSong;
