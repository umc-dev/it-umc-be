import { Router, type IRouter } from "express";
import AdminController from "../controllers/admin.controller.ts";

const adminRouter: IRouter = Router();

adminRouter.get("/", AdminController.getAll);
adminRouter.get("/:id", AdminController.getById);
adminRouter.post("/", AdminController.create);
adminRouter.put("/:id", AdminController.update);
adminRouter.delete("/:id", AdminController.delete);

export default adminRouter;
