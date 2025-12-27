import { Router, type IRouter } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { statisticStudentController } from "../controllers/statisticStudent.controller";
import {
  CreateStatisticStudentSchema,
  UpdateStatisticStudentSchema,
} from "../validator/statisticStudent.validator";
import { validate } from "../middlewares/validation.middleware";
import { requirePermission } from "../middlewares/permissions.middleware";
import { PERMISSIONS } from "../auth/permissions";

const statisticStudentRouter: IRouter = Router();

/* =====================
   PUBLIC
===================== */

// GET STATISTIC STUDENT
statisticStudentRouter.get("/", statisticStudentController.getAll);
statisticStudentRouter.get("/:year", statisticStudentController.getByYear);

/* =====================
    PROTECTED
===================== */

statisticStudentRouter.use(
  authMiddleware,
  requirePermission(PERMISSIONS.STATISTIC_MANAGE),
);

// CREATE STATISTIC STUDENT
statisticStudentRouter.post(
  "/",
  validate(CreateStatisticStudentSchema),
  statisticStudentController.create,
);

// UPDATE STATISTIC STUDENT
statisticStudentRouter.put(
  "/:year",
  validate(UpdateStatisticStudentSchema),
  statisticStudentController.update,
);

// DELETE STATISTIC STUDENT
statisticStudentRouter.delete("/:year", statisticStudentController.delete);

export default statisticStudentRouter;
