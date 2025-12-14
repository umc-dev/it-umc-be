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

      const data: AuthResponse = await authService.loginWithEmail(
        email,
        password,
      );

      return res.status(200).json(ResponseHTTP.ok(data, "Login success"));
    } catch (err) {
      next(err);
    }
  },

  async loginWithGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await authService.loginWithGoogle(req.user as any);

      return res.status(200).json(ResponseHTTP.ok(data, "Login successfully"));
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
    });

    res.status(200).json(ResponseHTTP.success("Logout successfully"));
  },
};

export default authController;
