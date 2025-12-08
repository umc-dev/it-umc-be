import { Router, type IRouter } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { statisticStudentController } from '../controllers/statisticStudent.controller';
import {
  CreateStatisticStudentSchema,
  UpdateStatisticStudentSchema,
} from '../validator/statisticStudent.validator';
import { validate } from '../middlewares/validation.middleware';

const statisticStudentRouter: IRouter = Router();

statisticStudentRouter.get('/', statisticStudentController.getAll);

statisticStudentRouter.get('/:year', statisticStudentController.getByYear);

statisticStudentRouter.post(
  '/',
  authMiddleware,
  validate(CreateStatisticStudentSchema),
  statisticStudentController.create
);

statisticStudentRouter.put(
  '/:year',
  authMiddleware,
  validate(UpdateStatisticStudentSchema),
  statisticStudentController.update
);
statisticStudentRouter.delete(
  '/:year',
  authMiddleware,
  statisticStudentController.delete
);

export default statisticStudentRouter