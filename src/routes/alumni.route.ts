import { Router, type IRouter } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { alumniController } from '../controllers/alumni.controller';
import { validate } from '../middlewares/validation.middleware';
import {
  CreateAlumniSchema,
  UpdateAlumniSchema,
} from '../validator/alumni.validator';

const alumniRouter: IRouter = Router();

alumniRouter.get('/', alumniController.getAll);

alumniRouter.get('/:id', alumniController.getById);

alumniRouter.post(
  '/',
  authMiddleware,
  validate(CreateAlumniSchema),
  alumniController.create
);

alumniRouter.put(
  '/:id',
  authMiddleware,
  validate(UpdateAlumniSchema),
  alumniController.update
);
alumniRouter.delete(
  '/:id',
  authMiddleware,
  alumniController.delete
);

export default alumniRouter;
