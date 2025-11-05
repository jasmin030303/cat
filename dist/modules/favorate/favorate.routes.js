"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorate_controlers_1 = __importDefault(require("./favorate.controlers"));
const routes = (0, express_1.Router)();
routes.get("/favorite/:userId", favorate_controlers_1.default.getFavorite);
routes.post("/favorite", favorate_controlers_1.default.postFavorite);
routes.delete("/favorite/:userId/:catId", favorate_controlers_1.default.deleteFavorite);
exports.default = routes;
