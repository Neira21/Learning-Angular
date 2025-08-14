import { Router } from "express";
import { RolesController } from "../controllers/RolesController.js";

const rolesRouter: Router = Router();

rolesRouter.get("/roles", RolesController.getRoles);
rolesRouter.get("/roles/:id", RolesController.getRoleById);
rolesRouter.post("/roles", RolesController.createRol);

export default rolesRouter;