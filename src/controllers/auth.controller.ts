import { NextFunction, Request, Response } from "express";
import { LoginSchema } from "../validator/auth.validator";
import { AuthResponse } from "../types/auth.type";
import authService from "../services/auth.service";
import { ResponseHTTP } from "../utils/response";
import { env } from "../config/env";
import adminService from "../services/admin.service";

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
        sameSite: "none",
        secure: env.NODE_ENV === "production",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24,
        domain: env.COOKIE_DOMAIN,
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
        sameSite: "none",
        secure: env.NODE_ENV === "production",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24,
        domain: env.COOKIE_DOMAIN,
      });

      return res.redirect(`${env.CLIENT_URL}/dashboard`);
    } catch (err) {
      next(err);
    }
  },

  async me(req: Request, res: Response) {
    const admin = await adminService.getById(req.user.id);

    res.status(200).json(ResponseHTTP.ok(admin, "User verified"));
  },

  logout(req: Request, res: Response) {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "none",
      secure: env.NODE_ENV === "production",
      path: "/",
      domain: env.COOKIE_DOMAIN,
    });

    res.status(200).json(ResponseHTTP.success("Logout successfully"));
  },
};

export default authController;
