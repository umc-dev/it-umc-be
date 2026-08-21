import { AchievementCategory } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import BadRequestException from "../exceptions/BadRequestException";
import achievementService from "../services/achievement.service";
import {
  AchievementResponse,
  CreateAchievementDto,
  PaginatedAchievementResponse,
  UpdateAchievementDto,
} from "../types/achievement.type";
import { ResponseHTTP } from "../utils/response";

function parseAchievementId(idParam: string | undefined): number {
  const id = Number(idParam);

  if (!idParam || Number.isNaN(id) || !Number.isInteger(id) || id < 1) {
    throw new BadRequestException("Id params must be a positive integer");
  }

  return id;
}

const achievementController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CreateAchievementDto = {
        ...req.body,
      };

      const result = await achievementService.create(body);

      return res
        .status(201)
        .json(ResponseHTTP.created(result, "Achievement created"));
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || "";
      const prodi = req.query.prodi as 'S1' | 'D3' | undefined;
      const category = req.query.category as AchievementCategory | undefined;

      const result: PaginatedAchievementResponse = await achievementService.getAll(
        limit,
        page,
        search,
        prodi,
        category,
      );


      return res
        .status(200)
        .json(ResponseHTTP.ok(result.data, "Achievements fetched", result.meta));
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseAchievementId(req.params.id);

      const result: AchievementResponse = await achievementService.getById(id);

      return res.status(200).json(ResponseHTTP.ok(result, "Achievement fetched"));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseAchievementId(req.params.id);

      const body: UpdateAchievementDto = {
        ...req.body,
      };

      const result: AchievementResponse = await achievementService.update(
        id,
        body,
      );

      return res.status(200).json(ResponseHTTP.ok(result, "Achievement updated"));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseAchievementId(req.params.id);

      await achievementService.delete(id);

      return res.status(200).json(ResponseHTTP.success("Achievement deleted"));
    } catch (err) {
      next(err);
    }
  },
};

export default achievementController;
