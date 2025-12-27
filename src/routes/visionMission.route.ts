import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { visionMissionController } from "../controllers/visionMission.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateVisionMissionSchema,
  UpdateVisionMissionSchema,
} from "../validator/visionMission.validator";
import { PERMISSIONS } from "../auth/permissions";
import { requirePermission } from "../middlewares/permissions.middleware";

const visionMissionRouter: IRouter = Router();

/* =====================
    PUBLIC
===================== */

// GET VISION MISSION
visionMissionRouter.get("/", visionMissionController.getAll);
visionMissionRouter.get("/:id", visionMissionController.getById);

/* =====================
    PROTECTED
===================== */

visionMissionRouter.use(
  authMiddleware,
  requirePermission(PERMISSIONS.VISION_MISSION_MANAGE),
);

// CREATE VISION MISSION
visionMissionRouter.post(
  "/",
  validate(CreateVisionMissionSchema),
  visionMissionController.create,
);

// UPDATE VISION MISSION
visionMissionRouter.put(
  "/:id",
  validate(UpdateVisionMissionSchema),
  visionMissionController.update,
);

// DELETE VISION MISSION
visionMissionRouter.delete("/:id", visionMissionController.delete);

export default visionMissionRouter;
