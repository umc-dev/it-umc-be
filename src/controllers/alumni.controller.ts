import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import {
  CreateAlumniDto,
  PaginatedAlumniResponse,
  UpdateAlumniDto,
  AlumniResponse,
} from './../types/alumni.type';
import { ResponseHTTP } from '../utils/response';
import BadRequestException from '../exceptions/BadRequestException';
import { alumniService } from '../services/alumni.service';

export const alumniController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CreateAlumniDto = {
        ...req.body,
      };

      const result: AlumniResponse = await alumniService.create(
        body,
        req.file,
      );

      return res
        .status(201)
        .json(ResponseHTTP.created(result, 'Alumni created'));
    } catch (err) {
      if (req.file) {
        const filepath = path.join("uploads", req.file.filename);
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
      const prodi = (req.query.prodi as 'S1' | 'D3') || undefined;

      const result: PaginatedAlumniResponse =
        await alumniService.getAll(limit, page, search, prodi);

      return res
        .status(200)
        .json(
          ResponseHTTP.ok(result.data, 'Alumni fetched', result.meta)
        );
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException('Id param is required');

      const result: AlumniResponse = await alumniService.getById(
        id
      );
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Alumni fetched'));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException('Id param is required');

      const body: UpdateAlumniDto = {
        ...req.body,
      };

      const result: AlumniResponse = await alumniService.update(
        id,
        body,
        req.file,
      );
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Alumni updated'));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException('Id param is required');

      await alumniService.delete(id);
      return res
        .status(200)
        .json(ResponseHTTP.success('Alumni deleted'));
    } catch (err) {
      next(err);
    }
  },
};
