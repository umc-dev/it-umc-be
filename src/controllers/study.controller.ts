import { NextFunction, Request, Response } from 'express';
import { studyService } from '../services/study.service';
import { StudyResponse, CreateStudyDto, UpdateStudyDto } from '../types/study.type';
import { ResponseHTTP } from '../utils/response';
import BadRequestException from '../exceptions/BadRequestException';

export const studyController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new BadRequestException('Document file is required');
      }
      
      const result: StudyResponse = await studyService.create(
        req.file,
      );

      return res.status(201).json(ResponseHTTP.created(result, 'Study created'));
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || '';

      const result = await studyService.getAll(limit, page, search);

      return res
        .status(200)
        .json(ResponseHTTP.ok(result.data, 'Studies fetched', result.meta));
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id))
        throw new BadRequestException('Id param must be a number');

      const result = await studyService.getById(id);

      return res.status(200).json(ResponseHTTP.ok(result, 'Study fetched'));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id))
        throw new BadRequestException('Id param must be a number');
      
      const result: StudyResponse = await studyService.update(
        id,
        req.file
      );

      return res.status(200).json(ResponseHTTP.created(result, 'Study updated'));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id))
        throw new BadRequestException('Id param must be a number');

      await studyService.delete(id);
      return res.status(200).json(ResponseHTTP.success('Study deleted'));
    } catch (err) {
      next(err);
    }
  },
};
