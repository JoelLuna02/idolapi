"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../database/sequelize"));
const File = sequelize_2.default.define('File', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    filename: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    mimetype: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    size: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    data: { type: sequelize_1.DataTypes.BLOB('medium') }
}, {
    timestamps: true,
    tableName: 'File'
});
exports.default = File;
