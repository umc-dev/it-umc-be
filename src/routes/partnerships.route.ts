import { IRouter, Router } from "express";
import partnershipsController from "../controllers/partnerships.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  CreatePartnershipSchema,
  UpdatePartnershipSchema,
} from "../validator/partnerships.validator";
import { requirePermission } from "../middlewares/permissions.middleware";
import { PERMISSIONS } from "../auth/permissions";

const partnershipsRouter: IRouter = Router();

/* =====================
   PUBLIC
===================== */

// GET PARTNERSHIP
partnershipsRouter.get("/", partnershipsController.getAll);
partnershipsRouter.get("/:id", partnershipsController.getById);

/* =====================
   PROTECTED
===================== */
partnershipsRouter.use(
  authMiddleware,
  requirePermission(PERMISSIONS.PARTNERSHIP_MANAGE),
);

// CREATE PARTNERSHIP
partnershipsRouter.post(
  "/",
  upload.single("photo"),
  validate(CreatePartnershipSchema),
  partnershipsController.create,
);

// UPDATE PARTNERSHIP
partnershipsRouter.put(
  "/:id",
  upload.single("photo"),
  validate(UpdatePartnershipSchema),
  partnershipsController.update,
);

// DELETE PARTNERSHIP
partnershipsRouter.delete("/:id", partnershipsController.delete);

export default partnershipsRouter;
