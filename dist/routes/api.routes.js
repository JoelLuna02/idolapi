"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable camelcase */
const express_1 = __importDefault(require("express"));
const apidata_json_1 = __importDefault(require("../api/apidata.json"));
const main_routes = express_1.default.Router();
main_routes.get('/', (req, res) => {
    return res.status(200).json(apidata_json_1.default);
});
exports.default = main_routes;
