import { NextFunction, Request, Response } from 'express';
import {
  StatisticStudentResponse,
  CreateStatisticStudentDto,
  UpdateStatisticStudentDto,
} from './../types/statisticStudent.type';
import { ResponseHTTP } from '../utils/response';
import BadRequestException from '../exceptions/BadRequestException';
import { statisticStudentService } from '../services/statisticStudent.service';

export const statisticStudentController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CreateStatisticStudentDto = {
        ...req.body,
      };

      const result: StatisticStudentResponse =
        await statisticStudentService.create(body);

      return res
        .status(201)
        .json(ResponseHTTP.created(result, 'Statistic Student created'));
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = parseInt(req.query.search as string) || 0;

      const result = await statisticStudentService.getAll(limit, page, search);

      return res
        .status(200)
        .json(
          ResponseHTTP.ok(result.data, 'Statistic Studets fetched', result.meta)
        );
    } catch (err) {
      next(err);
    }
  },

  async getByYear(req: Request, res: Response, next: NextFunction) {
    try {
      const { year } = req.params;

      if (!year) throw new BadRequestException('Year param is required');

      const yearParsed = Number(year);

      if (Number.isNaN(yearParsed))
        throw new BadRequestException('Year must be a valid number');

      const result = await statisticStudentService.getByYear(yearParsed);
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Statstic Studen fetched'));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { year } = req.params;

      if (!year) throw new BadRequestException('Year param is required');

      const yearParsed = Number(year);

      if (Number.isNaN(yearParsed))
        throw new BadRequestException('Year must be a valid number');

      const body: UpdateStatisticStudentDto = {
        ...req.body,
      };

      const result: StatisticStudentResponse =
        await statisticStudentService.update(yearParsed, body);
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Statistic Student updated'));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction){
    try {
      const { year } = req.params;

      if (!year) throw new BadRequestException('Year param is required');

      const yearParsed = Number(year);

      if (Number.isNaN(yearParsed))
        throw new BadRequestException('Year must be a valid number');

      await statisticStudentService.delete(yearParsed);
      return res.status(200).json(ResponseHTTP.success('Statistic Student deleted'))
    } catch (err) {
      next(err);
    }
  },
}

