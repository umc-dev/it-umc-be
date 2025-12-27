import { NextFunction, Request, Response } from "express";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import { verifyToken } from "../utils/jwt";
import adminService from "../services/admin.service";
import { AuthPayload } from "../types/auth.type";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token: string | undefined;

    if (req.cookies?.access_token) {
      token = req.cookies.access_token;
    }

    if (!token) {
      throw new UnauthorizedException("Access denied, Token is malformed");
    }

    const payload = verifyToken(token);

    const user = await adminService.getById(payload.id);

    if (!user) {
      throw new UnauthorizedException("Access denied, user not found");
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};
