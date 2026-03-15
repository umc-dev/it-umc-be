import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { facilityController } from "../controllers/facility.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateFacilitySchema,
  UpdateFacilitySchema,
} from "../validator/facility.validator";
import { PERMISSIONS } from "../auth/permissions";
import { requirePermission } from "../middlewares/permissions.middleware";
import upload from "../middlewares/upload.middleware";

const facilityRouter: IRouter = Router();

/* =====================
    PUBLIC
===================== */

// GET facility
facilityRouter.get("/", facilityController.getAll);
facilityRouter.get("/:id", facilityController.getById);

/* =====================
    PROTECTED
===================== */

facilityRouter.use(
  authMiddleware,
  requirePermission(PERMISSIONS.VISION_MISSION_MANAGE),
);

// CREATE VISION MISSION
facilityRouter.post(
  '/',
  upload.single('photo'),
  validate(CreateFacilitySchema),
  facilityController.create,
);

// UPDATE VISION MISSION
facilityRouter.put(
  '/:id',
  upload.single('photo'),
  validate(UpdateFacilitySchema),
  facilityController.update,
);

// DELETE VISION MISSION
facilityRouter.delete("/:id", facilityController.delete);

export default facilityRouter;
