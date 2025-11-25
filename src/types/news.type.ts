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
  categoryId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateNewsDto = z.infer<typeof CreateNewsSchema>;
export type UpdateNewsDto = z.infer<typeof UpdateNewsSchema>;

// Response DTO
export interface NewsResponse {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
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
