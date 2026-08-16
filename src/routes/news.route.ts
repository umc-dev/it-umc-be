import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { newsController } from "../controllers/news.controller";
import {
  ApproveNewsSchema,
  CreateNewsSchema,
  UpdateNewsSchema,
} from "../validator/news.validator";
import { validate } from "../middlewares/validation.middleware";
import upload from "../middlewares/upload.middleware";
import { requirePermission } from "../middlewares/permissions.middleware";
import { PERMISSIONS } from "../auth/permissions";

const newsRouter: IRouter = Router();

/* =====================
   PUBLIC (with optional auth for scoping)
===================== */

// Optional auth middleware — populates req.user if valid token present, but doesn't block if missing
const optionalAuth = async (req: any, res: any, next: any) => {
  if (req.cookies?.access_token) {
    return authMiddleware(req, res, next);
  }
  next();
};

// GET NEWS (public sees only PUBLISHED; Dosen sees own news; Admin sees all)
newsRouter.get("/", optionalAuth, newsController.getAll);

// Get By Slug (public sees only PUBLISHED; Dosen sees only own)
newsRouter.get("/:slug", optionalAuth, newsController.getBySlug);

/* =====================
   PROTECTED
===================== */

newsRouter.use(authMiddleware);

// CREATE NEWS
newsRouter.post(
  "/",
  requirePermission(PERMISSIONS.NEWS_CREATE),
  upload.single("thumbnail"),
  validate(CreateNewsSchema),
  newsController.create,
);

// UPDATE NEWS
newsRouter.put(
  "/:slug",
  requirePermission(PERMISSIONS.NEWS_UPDATE),
  upload.single("thumbnail"),
  validate(UpdateNewsSchema),
  newsController.update,
);

// APPROVE / REJECT NEWS (Admin & Super Admin only)
newsRouter.patch(
  "/:slug/approve",
  requirePermission(PERMISSIONS.NEWS_APPROVE),
  validate(ApproveNewsSchema),
  newsController.approveOrReject,
);

// DELETE NEWS
newsRouter.delete(
  "/:slug",
  requirePermission(PERMISSIONS.NEWS_DELETE),
  newsController.delete,
);

export default newsRouter;
