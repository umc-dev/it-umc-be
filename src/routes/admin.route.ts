import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  CreateAdminSchema,
  UpdateAdminSchema,
} from "../validator/admin.validator";
import adminController from "../controllers/admin.controller";

const adminRouter: IRouter = Router();

adminRouter.get("/", adminController.getAll);
adminRouter.get("/:id", adminController.getById);
adminRouter.post(
  "/",
  authMiddleware,
  validate(CreateAdminSchema),
  adminController.create,
);
adminRouter.put(
  "/:id",
  authMiddleware,
  validate(UpdateAdminSchema),
  adminController.update,
);
adminRouter.delete("/:id", authMiddleware, adminController.delete);

export default adminRouter;
