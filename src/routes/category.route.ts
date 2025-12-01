import { Router, type IRouter } from 'express';
import CategoryController from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { CreateCategorySchema, UpdateCategorySchema } from '../validator/category.validator';
import { validate } from '../middlewares/validation.middleware';

const categoryRoute: IRouter = Router();

categoryRoute.get('/', CategoryController.getAll);
categoryRoute.get('/:slug', CategoryController.getBySlug);
categoryRoute.post('/', authMiddleware, validate(CreateCategorySchema), CategoryController.create);
categoryRoute.put('/:slug', authMiddleware, validate(UpdateCategorySchema), CategoryController.update);
categoryRoute.delete('/:slug', authMiddleware, CategoryController.delete);
// categoryRoute.get('/:id', CategoryController.getById);
// categoryRoute.put('/:id', authMiddleware, CategoryController.update);
// categoryRoute.delete('/:id', authMiddleware, CategoryController.delete);

export default categoryRoute;
