import { IRouter, Router } from "express";
import accreditationController from "../controllers/accreditation.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateAccreditationSchema,
  UpdateAccreditationSchema,
} from "../validator/accreditation.validator";
import { requirePermission } from "../middlewares/permissions.middleware";
import { PERMISSIONS } from "../auth/permissions";

const accreditationRouter: IRouter = Router();

/* =====================
   PUBLIC
===================== */

// GET ACCREDITATIONS
accreditationRouter.get("/", accreditationController.getAll);
accreditationRouter.get("/:id", accreditationController.getById);

/* =====================
   PROTECTED
===================== */
accreditationRouter.use(
  authMiddleware,
  requirePermission(PERMISSIONS.ACCREDITATION_MANAGE),
);

// CREATE ACCREDITATION
accreditationRouter.post(
  "/",
  upload.single("certificateFile"),
  validate(CreateAccreditationSchema),
  accreditationController.create,
);

// UPDATE ACCREDITATION
accreditationRouter.put(
  "/:id",
  upload.single("certificateFile"),
  validate(UpdateAccreditationSchema),
  accreditationController.update,
);

// DELETE ACCREDITATION
accreditationRouter.delete("/:id", accreditationController.delete);

export default accreditationRouter;
