import router, { Router } from "express";
import { getUsers } from "../controllers/UserController.js";


const userRouter: Router = router();

userRouter.get("/users", getUsers);


export default userRouter;