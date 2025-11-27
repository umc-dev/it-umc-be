import type { NextFunction, Request, Response } from "express";
import adminService from "../services/admin.service";
import {
  CreateAdminSchema,
  UpdateAdminSchema,
} from "../validator/admin.validator";
import { ResponseHTTP } from "../utils/response";
import BadRequestException from "../exceptions/BadRequestException";
import {
  AdminResponse,
  AdminWithNewsResponse,
  PaginatedAdminResponse,
} from "../types/admin.type";

export const adminController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || "";

      const response: PaginatedAdminResponse = await adminService.getAll(
        limit,
        page,
        search,
      );

      return res
        .status(200)
        .json(ResponseHTTP.ok(response.data, "Admins fetched", response.meta));
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Admin ID is required");
      }

      const data: AdminWithNewsResponse = await adminService.getById(id);
      return res.status(200).json(ResponseHTTP.ok(data, "Admin fetched"));
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const data: AdminResponse = await adminService.create(body);
      return res.status(201).json(ResponseHTTP.created(data, "Admin created"));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Admin ID is required");
      }

      const body = req.body;

      const data: AdminResponse = await adminService.update(id, body);
      return res.status(200).json(ResponseHTTP.ok(data, "Admin updated"));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Admin ID is required");
      }

      await adminService.delete(id);
      return res.status(200).json(ResponseHTTP.success("Admin deleted"));
    } catch (err) {
      next(err);
    }
  },
};

export default adminController;
