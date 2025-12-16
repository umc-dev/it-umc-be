import { IRouter, Router } from "express";
import authController from "../controllers/auth.controller";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter: IRouter = Router();

// Login with email
authRouter.post("/", authController.loginWithEmail);

// Get authenticated user
authRouter.get("/me", authMiddleware, authController.me);

// Login with google
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

// Google oauth callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.loginWithGoogle,
);

// Logout
authRouter.post("/logout", authController.logout);

export default authRouter;
