import { IRouter, Router } from "express";
import authController from "../controllers/auth.controller";
import passport from "passport";

const authRouter: IRouter = Router();

authRouter.post("/", authController.loginWithEmail);

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.loginWithGoogle,
);

export default authRouter;
