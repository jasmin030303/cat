import { Router } from "express";
import todoRoutes from "../modules/todo/todo.routes";
import authRoutes from "../modules/auth/auth.routes";
import cors from "cors";

const globalRouter = Router();

const corsConfig = {
  origin: ["http://localhost:3000"],
};

globalRouter.use(cors(corsConfig));

globalRouter.use("/todo", todoRoutes);
globalRouter.use("/auth", authRoutes);

export default globalRouter;
