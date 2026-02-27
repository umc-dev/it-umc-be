import { NextFunction, Request, Response } from 'express';
import {
  CreateLectureshipDto,
  PaginatedLectureshipResponse,
  UpdateLectureshipDto,
  LectureshipResponse,
} from './../types/lectureship.type';
import { ResponseHTTP } from '../utils/response';
import BadRequestException from '../exceptions/BadRequestException';
import { lectureshipService } from '../services/lectureship.service';

export const lectureshipController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CreateLectureshipDto = {
        ...req.body,
      };

      const result: LectureshipResponse =
        await lectureshipService.create(body);

      return res
        .status(201)
        .json(ResponseHTTP.created(result, 'Lectureship created'));
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || '';

      const result: PaginatedLectureshipResponse =
        await lectureshipService.getAll(limit, page, search);

      return res
        .status(200)
        .json(
          ResponseHTTP.ok(result.data, 'Lectureships fetched', result.meta),
        );
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id))
        throw new BadRequestException('Id param must be a number');

      const result: LectureshipResponse =
        await lectureshipService.getById(id);
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Lectureship fetched'));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id))
        throw new BadRequestException('Id param must be a number');

      const body: UpdateLectureshipDto = {
        ...req.body,
      };

      const result: LectureshipResponse = await lectureshipService.update(
        id,
        body,
      );
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Lectureship updated'));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id))
        throw new BadRequestException('Id param must be a number');

      await lectureshipService.delete(id);
      return res
        .status(200)
        .json(ResponseHTTP.success('Lectureship deleted'));
    } catch (err) {
      next(err);
    }
  },
};
