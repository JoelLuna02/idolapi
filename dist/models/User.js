"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("../database/sequelize"));
const sequelize_2 = require("sequelize");
const User = sequelize_1.default.define('User', {
    id: { type: sequelize_2.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstname: { type: sequelize_2.DataTypes.STRING },
    lastname: { type: sequelize_2.DataTypes.STRING },
    phone: { type: sequelize_2.DataTypes.BIGINT },
    email: { type: sequelize_2.DataTypes.STRING, unique: true },
    username: { type: sequelize_2.DataTypes.STRING, unique: true },
    password: { type: sequelize_2.DataTypes.STRING },
    isAdmin: { type: sequelize_2.DataTypes.BOOLEAN, defaultValue: false }
}, {
    timestamps: false,
    tableName: 'User',
});
exports.default = User;
