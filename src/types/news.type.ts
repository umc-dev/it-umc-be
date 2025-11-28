import {
  CreateNewsSchema,
  UpdateNewsSchema,
} from "../validator/news.validator";
import { PaginationMeta } from ".";
import { AdminResponse } from "./admin.type";
import z from "zod";

// News DTO
export interface News {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  slug: string;
  categoryId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateNewsDto = z.infer<typeof CreateNewsSchema>;

export interface CreateNewsData {
  title: string;
  content: string;
  slug: string;
  thumbnail: string;
  categoryId: string;
  authorId: string;
}

export type UpdateNewsDto = z.infer<typeof UpdateNewsSchema>;

export interface UpdateNewsData {
  title?: string;
  content?: string;
  categoryId?: string;
  thumbnail?: string;
  slug?: string;
}

// Response DTO
export interface NewsResponse {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  slug: string;
  categoryId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewsListResponse {
  news: NewsResponse[];
}

export interface PaginatedNewsResponse {
  data: NewsResponse[];
  meta: PaginationMeta;
}

export interface NewsWithCategoryResponse extends NewsResponse {
  category: {
    id: string;
    name: string;
  };
}

export interface NewsWithAuthorResponse extends NewsResponse {
  author: AdminResponse;
}
