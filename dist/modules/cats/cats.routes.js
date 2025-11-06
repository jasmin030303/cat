"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cats_controles_1 = __importDefault(require("./cats.controles"));
const routes = (0, express_1.Router)();
routes.get("/get", cats_controles_1.default.getAllData);
routes.post("/post", cats_controles_1.default.postAllData);
routes.delete("/delete", cats_controles_1.default.deleteCat);
routes.patch("/patch/:catsId", cats_controles_1.default.patchData);
routes.put("/put/:catsId", cats_controles_1.default.upDateData);
exports.default = routes;
