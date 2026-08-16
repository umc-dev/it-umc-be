import { NextFunction, Request, Response } from "express";
import { newsService } from "../services/news.service";
import { ApproveNewsDto, CreateNewsDto, NewsResponse, UpdateNewsDto } from "../types/news.type";
import { ResponseHTTP } from "../utils/response";
import BadRequestException from "../exceptions/BadRequestException";

export const newsController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new BadRequestException("Thumbnail file is required");
      }

      const body: CreateNewsDto = { ...req.body };

      const result: NewsResponse = await newsService.create(
        body,
        req.file,
        req.user,
      );

      return res.status(201).json(ResponseHTTP.created(result, "News created"));
    } catch (err) {
      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || "";
      const category = req.query.category as string | undefined;

      // req.user is set only if authMiddleware ran (optional)
      const result = await newsService.getAll(limit, page, search, category, req.user);

      return res
        .status(200)
        .json(ResponseHTTP.ok(result.data, "News fetched", result.meta));
    } catch (err) {
      next(err);
    }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      if (!slug) {
        throw new BadRequestException("Slug params is required");
      }

      const result = await newsService.getBySlug(slug, req.user);

      return res.status(200).json(ResponseHTTP.ok(result, "News fetched"));
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      if (!slug) {
        throw new BadRequestException("Slug params is required");
      }

      const body: UpdateNewsDto = { ...req.body };

      const result: NewsResponse = await newsService.update(
        slug,
        body,
        req.user,
        req.file,
      );

      return res.status(200).json(ResponseHTTP.ok(result, "News updated"));
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      if (!slug) {
        throw new BadRequestException("Slug params is required");
      }

      await newsService.delete(slug, req.user);
      return res.status(200).json(ResponseHTTP.success("News deleted"));
    } catch (err) {
      next(err);
    }
  },

  async approveOrReject(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      if (!slug) {
        throw new BadRequestException("Slug params is required");
      }

      const body: ApproveNewsDto = { ...req.body };

      const result = await newsService.approveOrReject(slug, body);

      return res.status(200).json(ResponseHTTP.ok(result, `News ${body.status.toLowerCase()}`));
    } catch (err) {
      next(err);
    }
  },
};

