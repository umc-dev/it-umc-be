import { Router, type IRouter } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { categoryController } from './../controllers/category.controller';
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from '../validator/category.validator';
import { validate } from '../middlewares/validation.middleware';

const categoryRouter: IRouter = Router();

categoryRouter.get('/', categoryController.getAll);

categoryRouter.get('/:slug', categoryController.getBySlug);

categoryRouter.post(
  '/',
  authMiddleware,
  validate(CreateCategorySchema),
  categoryController.create
);

categoryRouter.put(
  '/:slug',
  authMiddleware,
  validate(UpdateCategorySchema),
  categoryController.update
);

categoryRouter.delete('/:slug', authMiddleware, categoryController.delete);

// categoryRouter.get('/:id', categoryController.getById);
// categoryRouter.put('/:id', authMiddleware, categoryController.update);
// categoryRouter.delete('/:id', authMiddleware, categoryController.delete);

export default categoryRouter;
