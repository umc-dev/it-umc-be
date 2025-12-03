import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { dosenController } from "../controllers/dosen.controller";
import upload from "../middlewares/upload.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateDosenSchema,
  UpdateDosenSchema,
} from "../validator/dosen.validator";

const dosenRouter: IRouter = Router();

// Get All
dosenRouter.get("/", dosenController.getAll);

// Get By Id
dosenRouter.get("/:id", dosenController.getById);

// Create Dosen
dosenRouter.post(
  "/",
  authMiddleware,
  upload.single("photo"),
  validate(CreateDosenSchema),
  dosenController.create,
);

// Update Dosen
dosenRouter.put(
  "/:id",
  authMiddleware,
  upload.single("photo"),
  validate(UpdateDosenSchema),
  dosenController.update,
);

// Delete Dosen
dosenRouter.delete("/:id", authMiddleware, dosenController.delete);

export default dosenRouter;
