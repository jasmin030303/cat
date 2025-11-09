import { NextFunction, Request, Response } from "express";
import { veryfyToken } from "../config/token";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(400).json({
        message: "Токен не предоставлен",
      });
    }

    const token = authHeader?.split("")[1]

    const decoded = veryfyToken(token as string)
  } catch (error) {}
};

export default authMiddleware;
