import { id } from "./../../../node_modules/effect/src/Fiber";
import express, { Request, Response } from "express";
import prisma from "../../config/prisma";
import bcrypt from "bcryptjs";
import generateToken from "../../config/token";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password,  } = req.body;

    const hashedPassword = await bcrypt.hash(password, "10");

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    const userId = String(user.id);
    const token = generateToken(userId, user.email);
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        userName: user.name,
      },
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      error: `Error in register: ${error}`,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: any = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Такой пользаватель не сушествует!!!",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      res.status(401).json({
        success: false,
        message: "Не верный пароль!!!",
      });
    }

    const token = generateToken(user.id, user.name);
  } catch (error) {
    res.status(501).json({
      success: false,
      error: `Error in register: ${error}`,
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.status(201).json({
      success: true,
      message: "Вы успешно вышли!!!",
    });
  } catch (error) {}
};








export default {
  register,
  login,
  logout,
};
