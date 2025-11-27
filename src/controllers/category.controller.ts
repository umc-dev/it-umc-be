import { CreateCategorySchema, UpdateCategorySchema } from './../validator/category.validator';
import { CategoryResponse, CategoryWithNewsResponse } from './../types/category.type';
import { NextFunction, Request, Response } from "express";
import { PaginatedCategoryResponse } from "../types/category.type";
import categoryService from "../services/category.service";
import { ResponseHTTP } from "../utils/response";
import BadRequestException from "../exceptions/BadRequestException";

export class CategoryController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 25;
      const page = parseInt(req.query.page as string) || 1;
      const search = (req.query.search as string) || '';

      const response: PaginatedCategoryResponse = await categoryService.getAll(
        page,
        limit,
        search
      );

      return res
        .status(200)
        .json(
          ResponseHTTP.ok(response.data, 'Categories fetched', response.meta)
        );
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new BadRequestException('Category ID is required');
      }

      const data: CategoryWithNewsResponse = await categoryService.getById(id);
      return res.status(200).json(ResponseHTTP.ok(data, 'Category fetched'));
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = CreateCategorySchema.parse(req.body);

      const data = await categoryService.createCategory(body);
      return res.status(201).json(ResponseHTTP.created(data, 'Category created'));
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if(!id) {
        throw new BadRequestException("Category ID is required");
      }

      const body = UpdateCategorySchema.parse(req.body);

      const data: CategoryResponse = await categoryService.updateCategory(id, body);
      return res.status(200).json(ResponseHTTP.ok(data, "Category updated"));
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;  

      if (!id) {
        throw new BadRequestException('Category ID is required');
      }

      await categoryService.deleteCategory(id);
      return res.status(200).json(ResponseHTTP.success('Category deleted'));
    } catch (err) {
      next(err);
    }
  }
}

export default new CategoryController();