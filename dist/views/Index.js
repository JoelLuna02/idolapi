"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const layout_1 = __importDefault(require("./layout"));
function Home() {
    return (react_1.default.createElement(layout_1.default, { title: "Website under construction" },
        react_1.default.createElement("h1", null, "Website under construction!")));
}
exports.default = Home;
;
