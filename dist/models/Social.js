"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../database/sequelize"));
const sequelize_2 = require("sequelize");
const Social = sequelize_1.default.define('Social', {
    id: { type: sequelize_2.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    application: { type: sequelize_2.DataTypes.STRING },
    socialurl: { type: sequelize_2.DataTypes.STRING, unique: true },
}, {
    timestamps: false,
    tableName: 'Social',
});
exports.default = Social;
