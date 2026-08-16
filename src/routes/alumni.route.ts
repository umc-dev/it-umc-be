import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { alumniController } from "../controllers/alumni.controller";
import upload from "../middlewares/upload.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  ApproveAlumniSchema,
  CreateAlumniSchema,
  UpdateAlumniSchema,
} from "../validator/alumni.validator";
import { requirePermission } from "../middlewares/permissions.middleware";
import { PERMISSIONS } from "../auth/permissions";

const alumniRouter: IRouter = Router();

/* =====================
   PUBLIC
===================== */

// Optional auth middleware — populates req.user if valid token present, but doesn't block if missing
const optionalAuth = async (req: any, res: any, next: any) => {
  if (req.cookies?.access_token) {
    return authMiddleware(req, res, next);
  }
  next();
};

// GET ALUMNI (Public sees isApproved=true; Admin can filter ?status=pending)
alumniRouter.get("/", optionalAuth, alumniController.getAll);
alumniRouter.get("/:id", alumniController.getById);

// PUBLIC SUBMIT ALUMNI (No auth required)
alumniRouter.post(
  "/public",
  upload.single("photo"),
  validate(CreateAlumniSchema),
  alumniController.createPublic,
);

/* =====================
   PROTECTED
===================== */

alumniRouter.use(authMiddleware, requirePermission(PERMISSIONS.ALUMNI_MANAGE));

// CREATE ALUMNI (Admin direct create)
alumniRouter.post(
  "/",
  upload.single("photo"),
  validate(CreateAlumniSchema),
  alumniController.create,
);

// UPDATE ALUMNI
alumniRouter.put(
  "/:id",
  upload.single("photo"),
  validate(UpdateAlumniSchema),
  alumniController.update,
);

// APPROVE ALUMNI (Admin approval)
alumniRouter.patch(
  "/:id/approve",
  validate(ApproveAlumniSchema),
  alumniController.approveOrReject,
);

// DELETE ALUMNI
alumniRouter.delete("/:id", alumniController.delete);

export default alumniRouter;

