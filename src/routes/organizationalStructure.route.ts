import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requirePermission } from "../middlewares/permissions.middleware";
import { PERMISSIONS } from "../auth/permissions";
import upload from "../middlewares/upload.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateOrganizationalStructureSchema,
  UpdateOrganizationalStructureSchema,
} from "../validator/organizationalStructure.validator";
import { organizationalStructureController } from "../controllers/organizationalStructure.controller";

const organizationalStructureRouter: IRouter = Router();

/* =====================
   PUBLIC
===================== */

organizationalStructureRouter.get(
  "/",
  organizationalStructureController.getOne,
);

/* =====================
   PROTECTED
===================== */

organizationalStructureRouter.use(
  authMiddleware,
  requirePermission(PERMISSIONS.ORGANIZATIONAL_STRUCTURE_MANAGE),
);

organizationalStructureRouter.post(
  "/",
  upload.single("image"),
  validate(CreateOrganizationalStructureSchema),
  organizationalStructureController.create,
);

organizationalStructureRouter.put(
  "/",
  upload.single("image"),
  validate(UpdateOrganizationalStructureSchema),
  organizationalStructureController.update,
);

organizationalStructureRouter.delete(
  "/",
  organizationalStructureController.delete,
);

export default organizationalStructureRouter;
