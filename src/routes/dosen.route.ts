import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { dosenController } from "../controllers/dosen.controller";
import upload from "../middlewares/upload.middleware";
import { parseDosenPositions } from "../middlewares/parseDosenPositions.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  // CreateDosenSchema,
  UpdateDosenSchema,
} from "../validator/dosen.validator";
import { requirePermission } from "../middlewares/permissions.middleware";
import { PERMISSIONS } from "../auth/permissions";

const dosenRouter: IRouter = Router();

/* =====================
   PUBLIC
===================== */

// Get All
dosenRouter.get("/", dosenController.getAll);

// Get By Id
dosenRouter.get("/:id", dosenController.getById);

/* =====================
   PROTECTED
===================== */

dosenRouter.use(authMiddleware);

// Create Dosen
// dosenRouter.post(
//   "/",
//   requirePermission(PERMISSIONS.DOSEN_CREATE),
//   upload.single("photo"),
//   parseDosenPositions,
//   validate(CreateDosenSchema),
//   dosenController.create,
// );

// Update Dosen
dosenRouter.put(
  "/:id",
  requirePermission(PERMISSIONS.DOSEN_UPDATE),
  upload.single("photo"),
  parseDosenPositions,
  validate(UpdateDosenSchema),
  dosenController.update,
);

// Delete Dosen
dosenRouter.delete(
  '/:id',
  requirePermission(PERMISSIONS.DOSEN_DELETE),
  dosenController.delete,
);

export default dosenRouter;
