import { NextFunction, Request, Response } from 'express';
import {
  StatisticStudentResponse,
  PaginatedStatisticStudentResponse,
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
      const search = (req.query.search as string) || '';
      const prodi = req.query.prodi as 'S1' | 'D3' | undefined;

      const result: PaginatedStatisticStudentResponse =
        await statisticStudentService.getAll(limit, page, search, prodi);

      return res
        .status(200)
        .json(
          ResponseHTTP.ok(result.data, 'Statistic Students fetched', result.meta)
        );
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException('Id param is required');

      const result: StatisticStudentResponse = await statisticStudentService.getById(id);
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Statistic Student fetched'));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException('Id param is required');

      const body: UpdateStatisticStudentDto = {
        ...req.body,
      };

      const result: StatisticStudentResponse =
        await statisticStudentService.update(id, body);
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Statistic Student updated'));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction){
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException('Id param is required');

      await statisticStudentService.delete(id);
      return res.status(200).json(ResponseHTTP.success('Statistic Student deleted'))
    } catch (err) {
      next(err);
    }
  },
}

