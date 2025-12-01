import { Router, type IRouter } from "express";
import AdminController from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const adminRouter: IRouter = Router();

adminRouter.get("/", authMiddleware, AdminController.getAll);
adminRouter.get("/:id", authMiddleware, AdminController.getById);
adminRouter.post("/", authMiddleware, AdminController.create);
adminRouter.put("/:id", authMiddleware, AdminController.update);
adminRouter.delete("/:id", authMiddleware, AdminController.delete);

export default adminRouter;
