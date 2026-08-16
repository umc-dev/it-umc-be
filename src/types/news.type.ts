import {
  CreateNewsSchema,
  UpdateNewsSchema,
  ApproveNewsSchema,
} from "../validator/news.validator";
import { PaginationMeta } from ".";
import { AdminResponse } from "./admin.type";
import z from "zod";

export type NewsStatus = "PENDING" | "PUBLISHED" | "REJECTED";

// News DTO
export interface News {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  slug: string;
  status: NewsStatus;
  categoryId: number;
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
  categoryId: number;
  authorId: string;
  status: NewsStatus;
}

export type UpdateNewsDto = z.infer<typeof UpdateNewsSchema>;

export interface UpdateNewsData {
  title?: string;
  content?: string;
  categoryId?: number;
  thumbnail?: string;
  slug?: string;
}

export type ApproveNewsDto = z.infer<typeof ApproveNewsSchema>;

// Response DTO
export interface NewsResponse {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  slug: string;
  status: NewsStatus;
  categoryId: number;
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
