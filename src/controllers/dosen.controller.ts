import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import {
  CreateDosenDTO,
  DosenResponse,
  PaginatedDosenResponse,
  UpdateDosenDTO,
} from "../types/dosen.type";
import { dosenService } from "../services/dosen.service";
import { ResponseHTTP } from "../utils/response";
import BadRequestException from "../exceptions/BadRequestException";

export const dosenController = {
  // Create Dosen Controller
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CreateDosenDTO = {
        ...req.body,
      };

      const result: DosenResponse = await dosenService.create(body, req.file);

      return res
        .status(201)
        .json(ResponseHTTP.created(result, "Dosen created"));
    } catch (err) {
      next(err);
    }
  },

  // Get All Dosen Controller
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || "";

      const result: PaginatedDosenResponse = await dosenService.getAll(
        limit,
        page,
        search,
      );

      return res
        .status(200)
        .json(ResponseHTTP.ok(result.data, "Dosen fetched", result.meta));
    } catch (err) {
      next(err);
    }
  },

  // Get By Id Dosen Controller
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Id params is required");
      }

      const result: DosenResponse = await dosenService.getById(id);

      return res.status(200).json(ResponseHTTP.ok(result, "Dosen fetched"));
    } catch (err) {
      next(err);
    }
  },

  // Update Dosen Controller
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Id params is required");
      }

      const body: UpdateDosenDTO = {
        ...req.body,
      };

      const result: DosenResponse = await dosenService.update(
        id,
        body,
        req.file,
      );

      return res.status(200).json(ResponseHTTP.ok(result, "Dosen updated"));
    } catch (err) {
      next(err);
    }
  },

  // Delete Dosen Controller
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Id params is required");
      }

      await dosenService.delete(id);

      return res.status(200).json(ResponseHTTP.success("Dosen deleted"));
    } catch (err) {
      next(err);
    }
  },
};
