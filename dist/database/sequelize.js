"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    protocol: 'postgres',
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    dialectOptions: {
        ssl: { require: true }
    },
    dialectModule: pg_1.default,
    logging: false,
});
exports.default = exports.sequelize;
