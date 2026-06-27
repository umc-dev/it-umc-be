import { NextFunction, Request, Response } from "express";
import BadRequestException from "../exceptions/BadRequestException";
import {
  CreateOrganizationalStructureDto,
  OrganizationalStructureResponse,
  UpdateOrganizationalStructureDto,
} from "../types/organizationalStructure.type";
import { ResponseHTTP } from "../utils/response";
import { organizationalStructureService } from "../services/organizationalStructure.service";

export const organizationalStructureController = {
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const prodi = (req.query.prodi as 'S1' | 'D3') || 'S1';
      const result = await organizationalStructureService.getOne(prodi);

      return res
        .status(200)
        .json(ResponseHTTP.ok(result, "Organizational structure fetched"));
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new BadRequestException("Image file is required");
      }

      const body: CreateOrganizationalStructureDto = {
        ...req.body,
      };

      const result: OrganizationalStructureResponse =
        await organizationalStructureService.create(body, req.file);

      return res
        .status(201)
        .json(ResponseHTTP.created(result, "Organizational structure created"));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const prodi = (req.query.prodi as 'S1' | 'D3') || req.body.prodi || 'S1';
      const body: UpdateOrganizationalStructureDto = {
        ...req.body,
      };

      const result: OrganizationalStructureResponse =
        await organizationalStructureService.update(prodi, body, req.file);

      return res
        .status(200)
        .json(ResponseHTTP.ok(result, "Organizational structure updated"));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const prodi = (req.query.prodi as 'S1' | 'D3') || 'S1';
      await organizationalStructureService.delete(prodi);

      return res
        .status(200)
        .json(ResponseHTTP.success("Organizational structure deleted"));
    } catch (err) {
      next(err);
    }
  },
};
