import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateAdminSchema,
  UpdateAdminSchema,
} from "../validator/admin.validator";
import adminController from "../controllers/admin.controller";
import upload from "../middlewares/upload.middleware";

const adminRouter: IRouter = Router();

adminRouter.get("/", adminController.getAll);

adminRouter.get("/:id", adminController.getById);

adminRouter.post(
  "/",
  authMiddleware,
  upload.single("avatar"),
  validate(CreateAdminSchema),
  adminController.create,
);

adminRouter.put(
  "/:id",
  authMiddleware,
  upload.single("avatar"),
  validate(UpdateAdminSchema),
  adminController.update,
);

adminRouter.delete("/:id", authMiddleware, adminController.delete);

export default adminRouter;
