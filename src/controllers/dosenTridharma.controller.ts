import { NextFunction, Request, Response } from 'express';
import {
  CreateDosenTridharmaDto,
  PaginatedDosenTridharmaResponse,
  UpdateDosenTridharmaDto,
  DosenTridharmaResponse,
  DosenTridharmaWithDosenResponse,
} from './../types/dosenTridharma.type';
import { ResponseHTTP } from '../utils/response';
import BadRequestException from '../exceptions/BadRequestException';
import { dosenTridharmaService } from '../services/dosenTridharma.service';

export const dosenTridharmaController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CreateDosenTridharmaDto = {
        ...req.body,
      };

      const result: DosenTridharmaResponse = await dosenTridharmaService.create(body);

      return res
        .status(201)
        .json(ResponseHTTP.created(result, 'Dosen Tridharma created'));
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || '';

      const result: PaginatedDosenTridharmaResponse =
        await dosenTridharmaService.getAll(limit, page, search);

      return res
        .status(200)
        .json(
          ResponseHTTP.ok(result.data, 'Dosen Tridharma fetched', result.meta),
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

      const result: DosenTridharmaWithDosenResponse = await dosenTridharmaService.getById(id);
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Dosen Tridharma fetched'));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id))
        throw new BadRequestException('Id param must be a number');

      const body: UpdateDosenTridharmaDto = {
        ...req.body,
      };

      const result: DosenTridharmaResponse = await dosenTridharmaService.update(
        id,
        body,
      );
      return res
        .status(200)
        .json(ResponseHTTP.ok(result, 'Dosen Tridharma updated'));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id))
        throw new BadRequestException('Id param must be a number');

      await dosenTridharmaService.delete(id);
      return res.status(200).json(ResponseHTTP.success('Dosen Tridharma deleted'));
    } catch (err) {
      next(err);
    }
  },
};
