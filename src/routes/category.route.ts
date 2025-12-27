import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { categoryController } from "./../controllers/category.controller";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../validator/category.validator";
import { validate } from "../middlewares/validation.middleware";
import { requirePermission } from "../middlewares/permissions.middleware";
import { PERMISSIONS } from "../auth/permissions";

const categoryRouter: IRouter = Router();

/* =====================
   PUBLIC
===================== */

// GET CATEGORY
categoryRouter.get("/", categoryController.getAll);
categoryRouter.get("/:slug", categoryController.getBySlug);

/* =====================
   PROTECTED
===================== */

categoryRouter.use(
  authMiddleware,
  requirePermission(PERMISSIONS.CATEGORY_MANAGE),
);

// CREATE CATEGORY
categoryRouter.post(
  "/",
  validate(CreateCategorySchema),
  categoryController.create,
);

// UPDATE CATEGORY
categoryRouter.put(
  "/:slug",
  validate(UpdateCategorySchema),
  categoryController.update,
);

// DELETE CATEGORY
categoryRouter.delete("/:slug", categoryController.delete);

export default categoryRouter;
