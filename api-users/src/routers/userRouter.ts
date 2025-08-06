import router, { Router } from "express";
import { UserController } from "../controllers/UserController.js";


const userRouter: Router = router();

userRouter.get("/users", UserController.getUsers);
userRouter.get("/users/:id", UserController.getUserById);
userRouter.post("/users", UserController.createUser);


export default userRouter;