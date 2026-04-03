import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import {
  CreateFacilityDto,
  PaginatedFacilityResponse,
  UpdateFacilityDto,
  FacilityResponse,
} from './../types/facility.type';
import { ResponseHTTP } from '../utils/response';
import BadRequestException from '../exceptions/BadRequestException';
import { facilityService } from '../services/facility.service';

export const facilityController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new BadRequestException("Photo file is required");
      }

      const body: CreateFacilityDto = {
        ...req.body,
      };

      const result: FacilityResponse = await facilityService.create(body, req.file);

      return res
        .status(201)
        .json(ResponseHTTP.created(result, 'Facility created'));
    } catch (err) {
      if (req.file) {
        const filepath = path.join('uploads', req.file.filename);
        fs.unlink(filepath, () => null);
      }
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || '';

      const result: PaginatedFacilityResponse = await facilityService.getAll(
        limit,
        page,
        search,
      );

      return res
        .status(200)
        .json(ResponseHTTP.ok(result.data, 'Facility fetched', result.meta));
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      
      if (Number.isNaN(id))
        throw new BadRequestException('Id param must be a number');

      const result: FacilityResponse = await facilityService.getById(id);
      return res.status(200).json(ResponseHTTP.ok(result, 'Facility fetched'));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      
      if (Number.isNaN(id))
        throw new BadRequestException('Id param must be a number');

      const body: UpdateFacilityDto = {
        ...req.body,
      };

      const result: FacilityResponse = await facilityService.update(
        id,
        body,
        req.file,
      );
      return res.status(200).json(ResponseHTTP.ok(result, 'Facility updated'));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      
      if (Number.isNaN(id))
        throw new BadRequestException('Id param must be a number');

      await facilityService.delete(id);
      return res.status(200).json(ResponseHTTP.success('Facility deleted'));
    } catch (err) {
      next(err);
    }
  },
};
