"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Layout = ({ children, title }) => (react_1.default.createElement("html", { lang: "en" },
    react_1.default.createElement("head", null,
        react_1.default.createElement("meta", { charSet: "utf-8" }),
        react_1.default.createElement("title", null, title),
        react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
        react_1.default.createElement("link", { rel: "stylesheet", href: "/css/styles.css" })),
    react_1.default.createElement("body", null,
        react_1.default.createElement("main", null, children))));
exports.default = Layout;
