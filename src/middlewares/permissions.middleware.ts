import { Request, Response, NextFunction } from "express";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import { ROLE_PERMISSIONS } from "../auth/role-permissions";
import { PERMISSIONS, Permission } from "../auth/permissions";
import ForbiddenException from "../exceptions/ForbiddenException";
import { db } from "../utils/prisma";

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
        new ForbiddenException("Access denied, insufficient permission"),
      );
    }

    next();
  };

export const requireOwnPermission =
  (permission: Permission) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(
        new UnauthorizedException('Access denied, user not authenticated'),
      );
    }

    const permissions = ROLE_PERMISSIONS[user.role] || [];

    if (!permissions.includes(permission) && user.role != 'SUPER_ADMIN') {
      return next(
        new ForbiddenException('Access denied, insufficient permission'),
      );
    }

    if (user.role === 'SUPER_ADMIN') {
      return next();
    }

    try {
      if (permission === PERMISSIONS.DOSEN_UPDATE) {
        const { id } = req.params;
        if (id) {
          const dosen = await db.dosen.findUnique({
            where: { id },
            select: { email: true },
          });

          if (!dosen || dosen.email !== user.email) {
            return next(
              new ForbiddenException('Access denied, you can only update your own profile'),
            );
          }
        }
      }

      if (permission === PERMISSIONS.DOSEN_TRIDARMA_MANAGE && user.role === 'DOSEN') {
        const { id } = req.params;
        if (id) {
          const tridharmaId = Number(id);
          if (!Number.isNaN(tridharmaId)) {
            const tridharma = await db.dosenTridharma.findUnique({
              where: { id: tridharmaId },
              include: {
                dosen: {
                  select: { email: true },
                },
              },
            });

            if (!tridharma || tridharma.dosen.email !== user.email) {
              return next(
                new ForbiddenException('Access denied, you can only manage your own tridharma'),
              );
            }
          }
        } else {
          const { dosenId } = req.body;
          if (dosenId) {
            const dosen = await db.dosen.findUnique({
              where: { id: dosenId },
              select: { email: true },
            });

            if (!dosen || dosen.email !== user.email) {
              return next(
                new ForbiddenException('Access denied, you can only create tridharma for your own profile'),
              );
            }
          }
        }
      }
    } catch (error) {
      return next(error);
    }

    next();
  };

