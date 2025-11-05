"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const getFavorite = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Не передан userId",
            });
        }
        const favorites = await prisma_1.default.favorite.findMany({
            where: { userId },
            include: { cats: true },
        });
        res.status(200).json({
            success: true,
            favorites
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Ошибка при получения избранного ${error}`,
        });
    }
};
const postFavorite = async (req, res) => {
    try {
        const { userId, catsId } = req.body;
        const findCat = await prisma_1.default.favorite.findFirst({
            where: { userId, catsId },
        });
        if (findCat) {
            return res.status(400).json({
                success: false,
                message: "Заполните поля!",
            });
        }
        const favorite = await prisma_1.default.favorite.create({
            data: { userId, catsId },
        });
        res.status(201).json({
            success: true,
            data: favorite,
            message: "Кот добавлен в избранное",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Ошибка при добавлении в избранное: ${error}`,
        });
    }
};
const deleteFavorite = async (req, res) => {
    try {
        const { userId, catsId } = req.body;
        await prisma_1.default.favorite.deleteMany({
            where: { userId, catsId },
        });
        res.status(200).json({
            success: true,
            message: "Кот успешно удалён из избранного",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `Ошибка при удалении из избранного: ${error}`,
        });
    }
};
exports.default = {
    getFavorite,
    postFavorite,
    deleteFavorite,
};
