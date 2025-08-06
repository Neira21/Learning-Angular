import router, { Router } from "express";

import { RolesController } from "../controllers/RolesController.js";
  

const rolesRouter: Router = router();

rolesRouter .get("/roles", RolesController.getRoles);
rolesRouter .get("/roles/:id", RolesController.getRoleById);
rolesRouter.post("/roles", RolesController.createRol);

export default rolesRouter;