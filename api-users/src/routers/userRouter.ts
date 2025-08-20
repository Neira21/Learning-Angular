import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js";

const userRouter: Router = Router();

// Rutas protegidas - requieren autenticación
userRouter.get("/users", authMiddleware, roleMiddleware(['admin']), UserController.getUsers);
userRouter.get("/users/:id", authMiddleware, roleMiddleware(['admin']), UserController.getUserById);

// Rutas de administrador - requieren autenticación y rol específico
userRouter.post("/users", authMiddleware, roleMiddleware(['admin']), UserController.createUser);
userRouter.put("/users/:id", authMiddleware, roleMiddleware(['admin']), UserController.updateUser);
userRouter.delete("/users/:id", authMiddleware, roleMiddleware(['admin']), UserController.deleteUser);

export default userRouter;