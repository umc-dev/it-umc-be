import { IRouter, Router } from "express";
import partnershipsController from "../controllers/partnerships.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  CreatePartnershipSchema,
  UpdatePartnershipSchema,
} from "../validator/partnerships.validator";

const partnershipsRouter: IRouter = Router();

// Get All
partnershipsRouter.get("/", partnershipsController.getAll);

// Get By Id
partnershipsRouter.get("/:id", partnershipsController.getById);

// Create Partnership
partnershipsRouter.post(
  "/",
  authMiddleware,
  upload.single("photo"),
  validate(CreatePartnershipSchema),
  partnershipsController.create,
);

// Update Partnership
partnershipsRouter.put(
  "/:id",
  authMiddleware,
  upload.single("photo"),
  validate(UpdatePartnershipSchema),
  partnershipsController.update,
);

// Delete Partnership
partnershipsRouter.delete(
  "/:id",
  authMiddleware,
  partnershipsController.delete,
);

export default partnershipsRouter;
