import NotFoundException from "../exceptions/NotFoundException";
import { newsRepository } from "../repositories/news.repository";
import {
  CreateNewsDto,
  NewsResponse,
  PaginatedNewsResponse,
  UpdateNewsDto,
} from "../types/news.type";
import { generateSlug } from "../utils";

export const newsService = {
  async create(data: CreateNewsDto): Promise<NewsResponse> {
    const slug = generateSlug(data.title);

    const dataToSave: CreateNewsDto = {
      ...data,
      slug,
    };

    return await newsRepository.add(dataToSave);
  },

  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedNewsResponse> {
    const paginatedResult = await newsRepository.getAll(limit, page, search);

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  async getBySlug(slug: string): Promise<NewsResponse> {
    const result = await newsRepository.getBySlug(slug);

    if (!result) {
      throw new NotFoundException("News not found");
    }

    return result;
  },

  async update(slug: string, data: UpdateNewsDto): Promise<NewsResponse> {
    const exist = await newsRepository.getBySlug(slug);

    if (!exist) {
      throw new NotFoundException("News not found");
    }

    if (data.title && data.title !== exist.title) {
      data.slug = generateSlug(data.title);
    }

    return newsRepository.update(slug, data);
  },

  async delete(slug: string): Promise<NewsResponse> {
    const exist = await newsRepository.getBySlug(slug);

    if (!exist) {
      throw new NotFoundException("News not found");
    }

    return newsRepository.delete(slug);
  },
};
