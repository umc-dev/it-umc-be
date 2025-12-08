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
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Access denied, No token provided.");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Access denied, Token is malformed");
    }

    const payload = verifyToken(token);

    const user = await adminService.getById(payload.id);

    if (!user) {
      throw new UnauthorizedException("Access denied, user not found");
    }

    req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
