"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../../config/token"));
const register = async (req, res) => {
    try {
        const { name, email, password, } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(password, "10");
        const user = await prisma_1.default.user.create({
            data: {
                name,
                email,
                password,
            },
        });
        const userId = String(user.id);
        const token = (0, token_1.default)(userId, user.email);
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                userName: user.name,
            },
        });
    }
    catch (error) {
        res.status(501).json({
            success: false,
            error: `Error in register: ${error}`,
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Такой пользаватель не сушествует!!!",
            });
        }
        const comparePassword = await bcryptjs_1.default.compare(password, user.password);
        if (!comparePassword) {
            res.status(401).json({
                success: false,
                message: "Не верный пароль!!!",
            });
        }
        const token = (0, token_1.default)(user.id, user.name);
    }
    catch (error) {
        res.status(501).json({
            success: false,
            error: `Error in register: ${error}`,
        });
    }
};
const logout = async (req, res) => {
    try {
        res.status(201).json({
            success: true,
            message: "Вы успешно вышли!!!",
        });
    }
    catch (error) { }
};
exports.default = {
    register,
    login,
    logout,
};
