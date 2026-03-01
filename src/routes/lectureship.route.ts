import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { lectureshipController } from "../controllers/lectureship.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateLectureshipSchema,
  UpdateLectureshipSchema,
} from "../validator/lectureship.validator";
import { PERMISSIONS } from "../auth/permissions";
import { requirePermission } from "../middlewares/permissions.middleware";

const lectureshipRouter: IRouter = Router();

/* =====================
    PUBLIC
===================== */

// GET LECTURESHIP
lectureshipRouter.get("/", lectureshipController.getAll);
lectureshipRouter.get("/:id", lectureshipController.getById);

/* =====================
    PROTECTED
===================== */

lectureshipRouter.use(
  authMiddleware,
  requirePermission(PERMISSIONS.VISION_MISSION_MANAGE),
);

// CREATE VISION MISSION
lectureshipRouter.post(
  "/",
  validate(CreateLectureshipSchema),
  lectureshipController.create,
);

// UPDATE VISION MISSION
lectureshipRouter.put(
  "/:id",
  validate(UpdateLectureshipSchema),
  lectureshipController.update,
);

// DELETE VISION MISSION
lectureshipRouter.delete("/:id", lectureshipController.delete);

export default lectureshipRouter;
