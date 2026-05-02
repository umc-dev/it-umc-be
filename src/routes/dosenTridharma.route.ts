import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { dosenTridharmaController } from "../controllers/dosenTridharma.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateDosenTridharmaSchema,
  UpdateDosenTridharmaSchema,
} from "../validator/dosenTridharma.validator";
import { PERMISSIONS } from "../auth/permissions";
import { requirePermission } from "../middlewares/permissions.middleware";

const dosenTridharmaRouter: IRouter = Router();

/* =====================
    PUBLIC
===================== */

// GET DOSEN TRIDHARMA
dosenTridharmaRouter.get("/", dosenTridharmaController.getAll);
dosenTridharmaRouter.get("/:id", dosenTridharmaController.getById);

/* =====================
    PROTECTED
===================== */

dosenTridharmaRouter.use(
  authMiddleware,
  requirePermission(PERMISSIONS.DOSEN_TRIDARMA_MANAGE),
);

// CREATE DOSEN TRIDHARMA
dosenTridharmaRouter.post(
  "/",
  validate(CreateDosenTridharmaSchema),
  dosenTridharmaController.create,
);

// UPDATE VISION MISSION
dosenTridharmaRouter.put(
  "/:id",
  validate(UpdateDosenTridharmaSchema),
  dosenTridharmaController.update,
);

// DELETE VISION MISSION
dosenTridharmaRouter.delete("/:id", dosenTridharmaController.delete);

export default dosenTridharmaRouter;
