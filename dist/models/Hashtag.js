"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../database/sequelize"));
const sequelize_2 = require("sequelize");
const Hashtag = sequelize_1.default.define('Hashtag', {
    id: { type: sequelize_2.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    general: { type: sequelize_2.DataTypes.STRING, unique: true },
    stream: { type: sequelize_2.DataTypes.STRING, unique: true },
    fanart: { type: sequelize_2.DataTypes.STRING },
    memes: { type: sequelize_2.DataTypes.STRING },
}, {
    timestamps: false,
    tableName: 'Hashtag'
});
exports.default = Hashtag;
