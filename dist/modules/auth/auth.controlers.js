"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../../config/token"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
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
const sendResetCode = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email)
            return res.status(400).json({
                success: false,
                message: "Заполните email",
            });
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            return res.status(404).json({
                success: false,
                message: "Пользователь не найден",
            });
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await prisma_1.default.resetPassword.create({
            data: { email, code, expiresAt },
        });
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        await transporter.sendMail({
            from: `"Support" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Код сброса пароля",
            text: `Ваш код для сброса пароля: ${code}`,
        });
        res.status(200).json({
            success: true,
            message: "Код отправлен на почту",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `${error}`,
        });
    }
};
const resetPassword = async (req, res) => {
    try {
        const { email, code, password } = req.body;
        if (!email || !code || !password) {
            return res.status(400).json({
                success: false,
                message: "Введите email, код и новый пароль",
            });
        }
        const record = await prisma_1.default.resetPassword.findFirst({
            where: { email, code },
        });
        if (!record) {
            return res.status(400).json({
                success: false,
                message: "Неверный код или email",
            });
        }
        if (record.expiresAt < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Код истёк, запросите новый",
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Пароль должен быть минимум 6 символов",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await prisma_1.default.user.update({
            where: { email },
            data: { password: hashedPassword },
        });
        await prisma_1.default.resetPassword.deleteMany({
            where: { email },
        });
        res.status(200).json({
            success: true,
            message: "Пароль успешно обновлён",
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message: `Ошибка: ${message}`,
        });
    }
};
const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Токен не найден",
            });
        }
        await prisma_1.default.blacklistedToken.create({ data: { token } });
        res.status(201).json({
            success: true,
            message: "Вы успешно вышли!!!",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in logout: ${error}`,
        });
    }
};
exports.default = {
    register,
    login,
    logout,
    resetPassword,
    sendResetCode,
};
