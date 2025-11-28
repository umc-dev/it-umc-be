import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { newsController } from "../controllers/news.controller";
import {
  CreateNewsSchema,
  UpdateNewsSchema,
} from "../validator/news.validator";
import { validate } from "../middlewares/validation.middleware";
import upload from "../middlewares/upload.middleware";

const newsRouter: IRouter = Router();

// Get All
newsRouter.get("/", newsController.getAll);

// Get By Slug
newsRouter.get("/:slug", newsController.getBySlug);

// Create News
newsRouter.post(
  "/",
  authMiddleware,
  upload.single("thumbnail"),
  validate(CreateNewsSchema),
  newsController.create,
);

// Update News
newsRouter.put(
  "/:slug",
  authMiddleware,
  upload.single("thumbnail"),
  validate(UpdateNewsSchema),
  newsController.update,
);

// Delete News
newsRouter.delete("/:slug", authMiddleware, newsController.delete);

export default newsRouter;
