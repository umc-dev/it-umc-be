import { NextFunction, Request, Response } from 'express';
import {
  CreateVisionMissionDto,
  PaginatedVisionMissionResponse,
  UpdateVisionMissionDto,
  VisionMissionResponse,
} from './../types/visionMission.type';
import { ResponseHTTP } from '../utils/response';
import BadRequestException from '../exceptions/BadRequestException';
import { visionMissionService } from '../services/visionMission.service';

export const visionMissionController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CreateVisionMissionDto = {
        ...req.body,
      };

      const result: VisionMissionResponse = await visionMissionService.create(
        body
      );

      return res
        .status(201)
        .json(ResponseHTTP.created(result, 'Vision Mission created'));
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || '';

      const result: PaginatedVisionMissionResponse =
        await visionMissionService.getAll(limit, page, search);

      return res
        .status(200)
        .json(
          ResponseHTTP.ok(result.data, 'Visions Missions fetched', result.meta)
        );
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException('Id param is required');

      const result: VisionMissionResponse = await visionMissionService.getById(
        id
      );
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Vision Mission fetched'));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException('Id param is required');

      const body: UpdateVisionMissionDto = {
        ...req.body,
      };

      const result: VisionMissionResponse = await visionMissionService.update(
        id,
        body
      );
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Vision Mission updated'));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException('Id param is required');

      await visionMissionService.delete(id);
      return res
        .status(200)
        .json(ResponseHTTP.success('Vision Mission deleted'));
    } catch (err) {
      next(err);
    }
  },
};
