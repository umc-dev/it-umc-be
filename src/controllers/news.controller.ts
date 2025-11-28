import { NextFunction, Request, Response } from "express";
import { newsService } from "../services/news.service";
import { CreateNewsDto, NewsResponse, UpdateNewsDto } from "../types/news.type";
import { ResponseHTTP } from "../utils/response";
import BadRequestException from "../exceptions/BadRequestException";
import fs from "fs";
import path from "path";

export const newsController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new BadRequestException("Thumbnail file is required");
      }

      const body: CreateNewsDto = {
        ...req.body,
      };

      const result: NewsResponse = await newsService.create(
        body,
        req.file,
        req.user.id,
      );

      return res.status(201).json(ResponseHTTP.created(result, "News created"));
    } catch (err) {
      if (req.file) {
        const filepath = path.join("uploads", req.file.filename);

        fs.unlink(filepath, (e) => {
          if (e) console.error("Gagal hapus file temp:", e);
        });
      }

      next(err);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || "";

      const result = await newsService.getAll(limit, page, search);

      return res.status(200).json(ResponseHTTP.ok(result.data, "News fetched"));
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

      const result = await newsService.getBySlug(slug);

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

      const body: UpdateNewsDto = {
        ...req.body,
      };

      const result: NewsResponse = await newsService.update(
        slug,
        body,
        req.file,
      );

      return res.status(200).json(ResponseHTTP.created(result, "News updated"));
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

      await newsService.delete(slug);
      return res.status(200).json(ResponseHTTP.success("News deleted"));
    } catch (err) {
      next(err);
    }
  },
};
