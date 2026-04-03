import { IRouter, Router } from "express";
import { PERMISSIONS } from "../auth/permissions";
import achievementController from "../controllers/achievement.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requirePermission } from "../middlewares/permissions.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateAchievementSchema,
  UpdateAchievementSchema,
} from "../validator/achievement.validator";

const achievementRouter: IRouter = Router();

/* =====================
   PUBLIC
===================== */

achievementRouter.get("/", achievementController.getAll);
achievementRouter.get("/:id", achievementController.getById);

/* =====================
   PROTECTED
===================== */
achievementRouter.use(
  authMiddleware,
  requirePermission(PERMISSIONS.ACHIEVEMENT_MANAGE),
);

achievementRouter.post(
  "/",
  validate(CreateAchievementSchema),
  achievementController.create,
);

achievementRouter.put(
  "/:id",
  validate(UpdateAchievementSchema),
  achievementController.update,
);

achievementRouter.delete("/:id", achievementController.delete);

export default achievementRouter;
