import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import { AccreditationCategory, Prodi } from "@prisma/client";
import {
  CreateAccreditationDto,
  PaginatedAccreditationResponse,
  AccreditationResponse,
  UpdateAccreditationDto,
} from "../types/accreditation.type";
import accreditationService from "../services/accreditation.service";
import { ResponseHTTP } from "../utils/response";
import BadRequestException from "../exceptions/BadRequestException";

const accreditationController = {
  // Create Accreditation Controller
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CreateAccreditationDto = {
        ...req.body,
      };

      const result = await accreditationService.create(body, req.file);

      return res
        .status(201)
        .json(ResponseHTTP.created(result, "Accreditation created"));
    } catch (err) {
      if (req.file) {
        const filepath = path.join("uploads", req.file.filename);

        fs.unlink(filepath, (e) => {
          if (e) console.error("Gagal hapus file temp : ", e);
        });
      }

      next(err);
    }
  },

  // Get All Accreditation Controller
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || "";
      const category = req.query.category as AccreditationCategory | undefined;
      const prodi = req.query.prodi as Prodi | undefined;

      const result: PaginatedAccreditationResponse =
        await accreditationService.getAll(limit, page, search, category, prodi);

      return res
        .status(200)
        .json(ResponseHTTP.ok(result.data, "Accreditation fetched", result.meta));
    } catch (err) {
      next(err);
    }
  },

  // Get By Id Accreditation Controller
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException("Id params is required");

      const result: AccreditationResponse = await accreditationService.getById(id);

      return res
        .status(200)
        .json(ResponseHTTP.ok(result, "Accreditation fetched"));
    } catch (err) {
      next(err);
    }
  },

  // Update Accreditation Controller
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException("Id params is required");

      const body: UpdateAccreditationDto = {
        ...req.body,
      };

      const result: AccreditationResponse = await accreditationService.update(
        body,
        id,
        req.file,
      );

      return res
        .status(200)
        .json(ResponseHTTP.ok(result, "Accreditation updated"));
    } catch (err) {
      if (req.file) {
        const filepath = path.join("uploads", req.file.filename);

        fs.unlink(filepath, (e) => {
          if (e) console.error("Gagal hapus file temp : ", e);
        });
      }

      next(err);
    }
  },

  // Delete Accreditation Controller
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Id params is required");
      }

      await accreditationService.delete(id);

      return res.status(200).json(ResponseHTTP.success("Accreditation deleted"));
    } catch (err) {
      next(err);
    }
  },
};

export default accreditationController;
