import NotFoundException from "../exceptions/NotFoundException";
import { newsRepository } from "../repositories/news.repository";
import {
  CreateNewsData,
  CreateNewsDto,
  NewsResponse,
  PaginatedNewsResponse,
  UpdateNewsData,
  UpdateNewsDto,
} from "../types/news.type";
import { generateSlug } from "../utils";
import { deleteUploadedFile, saveUploadedFile } from "../utils/file";

export const newsService = {
  async create(
    data: CreateNewsDto,
    file: Express.Multer.File,
    authorId: string,
  ): Promise<NewsResponse> {
    const slug = generateSlug(data.title);

    const savedFile = saveUploadedFile(file);

    const dataToSave: CreateNewsData = {
      title: data.title,
      content: data.content,
      authorId,
      categoryId: data.categoryId,
      slug,
      thumbnail: savedFile.url,
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

  async update(
    slug: string,
    data: UpdateNewsDto,
    file?: Express.Multer.File,
  ): Promise<NewsResponse> {
    const exist = await newsRepository.getBySlug(slug);
    if (!exist) throw new NotFoundException("News not found");

    let newThumbnailUrl: string;
    const oldThumbnailUrl = exist.thumbnail;

    if (file) {
      const saved = saveUploadedFile(file);
      newThumbnailUrl = saved.url;
    }

    // Generate slug baru jika title berubah
    const updateData: UpdateNewsData = {
      ...data,
    };

    if (data.title && data.title !== exist.title) {
      updateData.slug = generateSlug(data.title);
    }

    // set thumbnail jika upload baru
    if (newThumbnailUrl) {
      updateData.thumbnail = newThumbnailUrl;
    }

    // Jika update sukses dan ada file baru → hapus file lama
    if (newThumbnailUrl && exist.thumbnail) {
      deleteUploadedFile(exist.thumbnail);
    }

    const updated = await newsRepository.update(slug, updateData);

    // Hapus file lama jika ada file baru
    if (newThumbnailUrl && oldThumbnailUrl) {
      deleteUploadedFile(oldThumbnailUrl);
    }

    return updated;
  },

  async delete(slug: string): Promise<NewsResponse> {
    const exist = await newsRepository.getBySlug(slug);
    if (!exist) throw new NotFoundException("News not found");

    if (exist.thumbnail) {
      deleteUploadedFile(exist.thumbnail);
    }

    return newsRepository.delete(slug);
  },
};
