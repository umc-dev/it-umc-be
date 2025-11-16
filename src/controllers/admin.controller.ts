import type { NextFunction, Request, Response } from "express";
import adminService from "../services/admin.service";
import {
  CreateAdminSchema,
  UpdateAdminSchema,
} from "../validator/admin.validator";
import { ResponseHTTP } from "../utils/response";
import BadRequestException from "../exceptions/BadRequestException";

export class AdminController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;

      const data = await adminService.getAll(limit, page);

      return res.status(200).json(ResponseHTTP.ok(data, "Admins fetched"));
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Admin ID is required");
      }

      const data = await adminService.getById(id);
      return res.status(200).json(ResponseHTTP.ok(data, "Admin fetched"));
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = CreateAdminSchema.parse(req.body);

      const data = await adminService.create(body);
      return res.status(201).json(ResponseHTTP.created(data, "Admin created"));
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException("Admin ID is required");
      }

      const body = UpdateAdminSchema.parse(req.body);

      const data = await adminService.update(id, body);
      return res.status(200).json(ResponseHTTP.ok(data, "Admin updated"));
    } catch (err) {
      next(err);
    }
  }

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
  }
}

export default new AdminController();
