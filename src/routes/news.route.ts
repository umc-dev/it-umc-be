import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { newsController } from "../controllers/news.controller";
import {
  CreateNewsSchema,
  UpdateNewsSchema,
} from "../validator/news.validator";
import { validate } from "../middlewares/validation.middleware";
import upload from "../middlewares/upload.middleware";
import { requirePermission } from "../middlewares/permissions.middleware";
import { PERMISSIONS } from "../auth/permissions";

const newsRouter: IRouter = Router();

/* =====================
   PUBLIC
===================== */

// GET NEWS
newsRouter.get("/", newsController.getAll);

// Get By Slug
newsRouter.get("/:slug", newsController.getBySlug);

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

// DELETE NEWS
newsRouter.delete(
  "/:slug",
  requirePermission(PERMISSIONS.NEWS_DELETE),
  newsController.delete,
);

export default newsRouter;
