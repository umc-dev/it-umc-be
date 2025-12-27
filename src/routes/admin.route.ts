import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateAdminSchema,
  UpdateAdminSchema,
} from "../validator/admin.validator";
import adminController from "../controllers/admin.controller";
import upload from "../middlewares/upload.middleware";
import { requirePermission } from "../middlewares/permissions.middleware";
import { PERMISSIONS } from "../auth/permissions";

const adminRouter: IRouter = Router();

/* =====================
   PROTECTED
===================== */

// Wajib punya role admin manage dan sudah login
adminRouter.use(authMiddleware, requirePermission(PERMISSIONS.ADMIN_MANAGE));

// GET ADMIN
adminRouter.get("/", adminController.getAll);
adminRouter.get("/:id", adminController.getById);

// CREATE ADMIN
adminRouter.post(
  "/",
  upload.single("avatar"),
  validate(CreateAdminSchema),
  adminController.create,
);

// UPDATE ADMIN
adminRouter.put(
  "/:id",
  upload.single("avatar"),
  validate(UpdateAdminSchema),
  adminController.update,
);

// DELETE ADMIN
adminRouter.delete("/:id", adminController.delete);

export default adminRouter;
