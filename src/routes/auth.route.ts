import { IRouter, Router } from "express";
import authController from "../controllers/auth.controller";

const authRouter: IRouter = Router();

authRouter.post("/", authController.login);

export default authRouter;
