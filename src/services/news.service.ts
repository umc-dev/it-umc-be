import NotFoundException from "../exceptions/NotFoundException";
import ForbiddenException from "../exceptions/ForbiddenException";
import { newsRepository } from "../repositories/news.repository";
import {
  ApproveNewsDto,
  CreateNewsData,
  CreateNewsDto,
  NewsResponse,
  NewsStatus,
  PaginatedNewsResponse,
  UpdateNewsData,
  UpdateNewsDto,
} from "../types/news.type";
import { generateSlug } from "../utils";
import { deleteUploadedFile, saveUploadedFile } from "../utils/file";
import { AuthPayload } from "../types/auth.type";

export const newsService = {
  async create(
    data: CreateNewsDto,
    file: Express.Multer.File,
    user: AuthPayload,
  ): Promise<NewsResponse> {
    let uploaded: { url: string } | null = null;
    try {
      const slug = generateSlug(data.title);

      if (file) {
        uploaded = saveUploadedFile(file);
      }

      // Dosen's news needs approval — set to PENDING
      const status: NewsStatus =
        user.role === "DOSEN" ? "PENDING" : "PUBLISHED";

      const dataToSave: CreateNewsData = {
        title: data.title,
        content: data.content,
        authorId: user.id,
        categoryId: data.categoryId,
        slug,
        thumbnail: uploaded.url,
        status,
      };

      return await newsRepository.add(dataToSave);
    } catch (err: unknown) {
      if (uploaded?.url) {
        deleteUploadedFile(uploaded.url);
      }
      throw err;
    }
  },

  async getAll(
    limit: number,
    page: number,
    search: string,
    category?: string,
    viewer?: AuthPayload,
  ): Promise<PaginatedNewsResponse> {
    let filterAuthorId: string | undefined;
    let filterStatus: NewsStatus | undefined;

    if (!viewer) {
      // Public: only published
      filterStatus = "PUBLISHED";
    } else if (viewer.role === "DOSEN") {
      // Dosen: only their own news (all statuses)
      filterAuthorId = viewer.id;
    }
    // ADMIN / SUPER_ADMIN / EDITOR: all news, all statuses

    const paginatedResult = await newsRepository.getAll(
      limit,
      page,
      search,
      category,
      filterAuthorId,
      filterStatus,
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  async getBySlug(slug: string, viewer?: AuthPayload): Promise<NewsResponse> {
    const result = await newsRepository.getBySlug(slug);

    if (!result) {
      throw new NotFoundException("News not found");
    }

    // Dosen can only see their own news
    if (viewer?.role === "DOSEN" && result.authorId !== viewer.id) {
      throw new ForbiddenException("Access denied, this news belongs to another user");
    }

    // Public access: only published
    if (!viewer && result.status !== "PUBLISHED") {
      throw new NotFoundException("News not found");
    }

    return result;
  },

  async update(
    slug: string,
    data: UpdateNewsDto,
    viewer: AuthPayload,
    file?: Express.Multer.File,
  ): Promise<NewsResponse> {
    const exist = await newsRepository.getBySlug(slug);
    if (!exist) throw new NotFoundException("News not found");

    // Dosen can only edit their own news
    if (viewer.role === "DOSEN" && exist.authorId !== viewer.id) {
      throw new ForbiddenException("Access denied, you can only update your own news");
    }

    let newThumbnailUrl: string;
    const oldThumbnailUrl = exist.thumbnail;

    if (file) {
      const saved = saveUploadedFile(file);
      newThumbnailUrl = saved.url;
    }

    const updateData: UpdateNewsData = { ...data };

    if (data.title && data.title !== exist.title) {
      updateData.slug = generateSlug(data.title);
    }

    if (newThumbnailUrl) {
      updateData.thumbnail = newThumbnailUrl;
    }

    const updated = await newsRepository.update(slug, updateData);

    if (newThumbnailUrl && oldThumbnailUrl) {
      deleteUploadedFile(oldThumbnailUrl);
    }

    return updated;
  },

  async delete(slug: string, viewer: AuthPayload): Promise<NewsResponse> {
    const exist = await newsRepository.getBySlug(slug);
    if (!exist) throw new NotFoundException("News not found");

    // Dosen can only delete their own news
    if (viewer.role === "DOSEN" && exist.authorId !== viewer.id) {
      throw new ForbiddenException("Access denied, you can only delete your own news");
    }

    if (exist.thumbnail) {
      deleteUploadedFile(exist.thumbnail);
    }

    return newsRepository.delete(slug);
  },

  async approveOrReject(slug: string, dto: ApproveNewsDto): Promise<NewsResponse> {
    const exist = await newsRepository.getBySlug(slug);
    if (!exist) throw new NotFoundException("News not found");

    return newsRepository.approveOrReject(slug, dto.status as NewsStatus);
  },
};

