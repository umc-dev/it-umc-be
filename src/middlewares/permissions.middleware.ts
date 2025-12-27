import { Request, Response, NextFunction } from "express";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import { ROLE_PERMISSIONS } from "../auth/role-permissions";
import { Permission } from "../auth/permissions";

export const requirePermission =
  (permission: Permission) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(
        new UnauthorizedException("Access denied, user not authenticated"),
      );
    }

    const permissions = ROLE_PERMISSIONS[user.role] || [];

    if (!permissions.includes(permission)) {
      return next(
        new UnauthorizedException("Access denied, insufficient permission"),
      );
    }

    next();
  };
