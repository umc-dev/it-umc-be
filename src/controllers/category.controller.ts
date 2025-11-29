import { NextFunction, Request, Response } from 'express';
import { categoryService } from './../services/category.service';
import {
  CategoryResponse,
  CategoryWithNewsResponse,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './../types/category.type';
import { ResponseHTTP } from '../utils/response';
import BadRequestException from '../exceptions/BadRequestException';

export class CategoryController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CreateCategoryDto = {
        ...req.body,
      };

      const result: CategoryResponse = await categoryService.create(body);
      return res
        .status(201)
        .json(ResponseHTTP.created(result, 'Category created'));
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || '';

      const result = await categoryService.getAll(limit, page, search);

      return res
        .status(200)
        .json(ResponseHTTP.ok(result.data, 'Categories fetched', result.meta));
    } catch (err) {
      next(err);
    }
  }

  // async getById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;

  //     if (!id) throw new BadRequestException('ID param is required');

  //     const result = await categoryService.getById(id);
  //     return res.status(200).json(ResponseHTTP.ok(result, 'Category fetched'));
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      if (!slug) throw new BadRequestException('Slug param is required');

      const result = await categoryService.getBySlug(slug);
      return res.status(200).json(ResponseHTTP.ok(result, 'Category fetched'));
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      if (!slug) throw new BadRequestException('Slug param is required');

      const body: UpdateCategoryDto = {
        ...req.body,
      };

      const result: CategoryResponse = await categoryService.update(slug, body);
      return res.status(200).json(ResponseHTTP.ok(result, 'Category updated'));
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;

      if (!slug) throw new BadRequestException('Slug param is required');

      await categoryService.delete(slug);
      return res.status(200).json(ResponseHTTP.success('Category deleted'));
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();
