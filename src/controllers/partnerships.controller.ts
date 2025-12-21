import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import {
  CreatePartnershipDto,
  PaginatedPartnershipResponse,
  PartnershipResponse,
  UpdatePartnershipDto,
} from "../types/partnerships.type";
import partnershipsService from "../services/partnerships.service";
import { ResponseHTTP } from "../utils/response";
import BadRequestException from "../exceptions/BadRequestException";

const partnershipsController = {
  // Create Partnership Controller
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CreatePartnershipDto = {
        ...req.body,
      };

      const result = await partnershipsService.create(body, req.file);

      return res
        .status(201)
        .json(ResponseHTTP.created(result, "Partnership created"));
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

  // Get All Partnership Controller
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || "";

      const result: PaginatedPartnershipResponse =
        await partnershipsService.getAll(limit, page, search);

      return res
        .status(200)
        .json(ResponseHTTP.ok(result.data, "Partnership fetched", result.meta));
    } catch (err) {
      next(err);
    }
  },

  // Get By Id Partnership Controller
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException("Id params is required");

      const result: PartnershipResponse = await partnershipsService.getById(id);

      return res
        .status(200)
        .json(ResponseHTTP.ok(result, "Partnership fetched"));
    } catch (err) {
      next(err);
    }
  },

  // Update Partnership Controller
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) throw new BadRequestException("Id params is required");

      const body: UpdatePartnershipDto = {
        ...req.body,
      };

      const result: PartnershipResponse = await partnershipsService.update(
        body,
        id,
        req.file,
      );

      return res
        .status(200)
        .json(ResponseHTTP.ok(result, "Partnership updated"));
    } catch (err) {
      next(err);
    }
  },

  // Delete Partnership Controller
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Id params is required");
      }

      await partnershipsService.delete(id);

      return res.status(200).json(ResponseHTTP.success("Partnership deleted"));
    } catch (err) {
      next(err);
    }
  },
};

export default partnershipsController;
