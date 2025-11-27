import { Router, type IRouter } from 'express';
import CategoryController from '../controllers/category.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const categoryRoute: IRouter = Router();

categoryRoute.get('/', CategoryController.getAll);
categoryRoute.get('/:id', CategoryController.getById);
categoryRoute.post('/', authMiddleware, CategoryController.create);
categoryRoute.put('/:id', authMiddleware, CategoryController.update);
categoryRoute.delete('/:id', authMiddleware, CategoryController.delete);

export default categoryRoute;
