import { NextFunction, Request, Response } from "express";
import { LoginSchema } from "../validator/auth.validator";
import { AuthResponse } from "../types/auth.type";
import authService from "../services/auth.service";
import { ResponseHTTP } from "../utils/response";
import { env } from "../config/env";

const authController = {
  async loginWithEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = LoginSchema.parse(req.body);

      const { token, admin } = await authService.loginWithEmail(
        email,
        password,
      );

      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: env.NODE_ENV === "production",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res.status(200).json(ResponseHTTP.success("Login success"));
    } catch (err) {
      next(err);
    }
  },

  async loginWithGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = await authService.loginWithGoogle(req.user as any);

      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: env.NODE_ENV === "production",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res.redirect(`${env.CLIENT_URL}/dashboard`);
    } catch (err) {
      next(err);
    }
  },

  me(req: Request, res: Response) {
    const data = {
      admin: req.user,
    };

    res.status(200).json(ResponseHTTP.ok(data, "User verified"));
  },

  logout(req: Request, res: Response) {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "lax",
      secure: env.NODE_ENV === "production",
      path: "/",
    });

    res.status(200).json(ResponseHTTP.success("Logout successfully"));
  },
};

export default authController;
