import { NextFunction, Request, Response } from "express";
import { LoginSchema } from "../validator/auth.validator";
import { AuthResponse } from "../types/auth.type";
import authService from "../services/auth.service";
import { ResponseHTTP } from "../utils/response";

const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = LoginSchema.parse(req.body);
      const data: AuthResponse = await authService.login(email, password);

      return res.status(200).json(ResponseHTTP.created(data, "Login success"));
    } catch (err) {
      next(err);
    }
  },
};

export default authController;
