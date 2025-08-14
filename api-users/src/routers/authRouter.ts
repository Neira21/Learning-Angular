import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter: Router = Router();

// Rutas públicas (no requieren autenticación)
authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

// Rutas protegidas (requieren autenticación)
authRouter.get("/verify", authMiddleware, AuthController.verifyToken);
authRouter.get("/profile", authMiddleware, AuthController.getProfile);

export default authRouter;
