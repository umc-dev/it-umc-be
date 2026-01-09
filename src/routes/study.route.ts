import { Router, type IRouter } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { studyController } from '../controllers/study.controller';
import {
  CreateStudySchema,
  UpdateStudySchema,
} from '../validator/study.validator';
import { validate } from '../middlewares/validation.middleware';
import uploadFile from '../middlewares/uploadFile.middleware';
import { requirePermission } from '../middlewares/permissions.middleware';
import { PERMISSIONS } from '../auth/permissions';

const studyRouter: IRouter = Router();

/* =====================
   PUBLIC
===================== */

// GET STUDIES
studyRouter.get('/', studyController.getAll);

// Get By ID
studyRouter.get('/:id', studyController.getById);

/* =====================
   PROTECTED
===================== */

studyRouter.use(authMiddleware);

// CREATE STUDY
studyRouter.post(
  '/',
  requirePermission(PERMISSIONS.STUDY_MANAGE),
  uploadFile.single('source'),
  studyController.create
);

// UPDATE STUDY
studyRouter.put(
  '/:id',
  requirePermission(PERMISSIONS.STUDY_MANAGE),
  uploadFile.single('source'),
  studyController.update
);

// DELETE STUDY
studyRouter.delete(
  '/:id',
  requirePermission(PERMISSIONS.STUDY_MANAGE),
  studyController.delete
);

export default studyRouter;
