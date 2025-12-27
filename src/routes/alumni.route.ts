import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { alumniController } from "../controllers/alumni.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateAlumniSchema,
  UpdateAlumniSchema,
} from "../validator/alumni.validator";
import { requirePermission } from "../middlewares/permissions.middleware";
import { PERMISSIONS } from "../auth/permissions";

const alumniRouter: IRouter = Router();

/* =====================
   PUBLIC
===================== */

// GET ALUMNI
alumniRouter.get("/", alumniController.getAll);
alumniRouter.get("/:id", alumniController.getById);

/* =====================
   PROTECTED
===================== */

alumniRouter.use(authMiddleware, requirePermission(PERMISSIONS.ALUMNI_MANAGE));

// CREATE ALUMNI
alumniRouter.post("/", validate(CreateAlumniSchema), alumniController.create);

// UPDATE ALUMNI
alumniRouter.put("/:id", validate(UpdateAlumniSchema), alumniController.update);

// DELETE ALUMNI
alumniRouter.delete("/:id", alumniController.delete);

export default alumniRouter;
