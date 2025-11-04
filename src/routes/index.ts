import { Router } from "express";
import catsRoutes from "../modules/cats/cats.routes";
import authRoutes from "../modules/auth/auth.routes";
import favoriteRoutes from "../modules/favorate/favorate.routes";
import cors from "cors";

const globalRouter = Router();

const corsConfig = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
  ],
};

globalRouter.use("/cats", cors(corsConfig), catsRoutes);
globalRouter.use("/auth", cors(corsConfig), authRoutes);
globalRouter.use("/favorite", cors(corsConfig), favoriteRoutes);

export default globalRouter;
