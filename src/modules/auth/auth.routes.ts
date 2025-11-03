import { Router } from "express";
import authControllers from "./auth.controlers";

const router = Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/logout", authControllers.logout);

export default router;
