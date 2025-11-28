import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { newsController } from "../controllers/news.controller";
import {
  CreateNewsSchema,
  UpdateNewsSchema,
} from "../validator/news.validator";
import { validate } from "../middlewares/validation.middleware";

const newsRouter: IRouter = Router();

newsRouter.get("/", newsController.getAll);
newsRouter.get("/:slug", newsController.getBySlug);
newsRouter.post(
  "/",
  authMiddleware,
  validate(CreateNewsSchema),
  newsController.create,
);
newsRouter.put(
  "/:slug",
  authMiddleware,
  validate(UpdateNewsSchema),
  newsController.update,
);
newsRouter.delete("/:slug", authMiddleware, newsController.delete);

export default newsRouter;
