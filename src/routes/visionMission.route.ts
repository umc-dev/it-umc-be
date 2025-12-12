import { Router, type IRouter } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { visionMissionController } from '../controllers/visionMission.controller';
import { validate } from '../middlewares/validation.middleware';
import {
  CreateVisionMissionSchema,
  UpdateVisionMissionSchema,
} from '../validator/visionMission.validator';

const visionMissionRouter: IRouter = Router();

visionMissionRouter.get('/', visionMissionController.getAll);

visionMissionRouter.get('/:id', visionMissionController.getById);

visionMissionRouter.post(
  '/',
  authMiddleware,
  validate(CreateVisionMissionSchema),
  visionMissionController.create
);

visionMissionRouter.put(
  '/:id',
  authMiddleware,
  validate(UpdateVisionMissionSchema),
  visionMissionController.update
);
visionMissionRouter.delete(
  '/:id',
  authMiddleware,
  visionMissionController.delete
);

export default visionMissionRouter;
