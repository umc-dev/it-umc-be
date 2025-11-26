import z from "zod";
import { 
  CreateCategorySchema, 
  UpdateCategorySchema 
} from "../validator/category.validator";
import { PaginationMeta } from ".";
import { News } from "./news.type";


// Category DTO
export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CategoryCreateDTO = z.infer<typeof CreateCategorySchema>;
export type CategoryUpdateDTO = z.infer<typeof UpdateCategorySchema>;

// Response DTO
export interface CategoryResponse {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryListResponse {
  categories: CategoryResponse[];
}

export interface PaginatedCategoryResponse {
  data: CategoryResponse[];
  meta: PaginationMeta;
}

export interface CategoryWithNewsResponse extends CategoryResponse {
  news: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface CategoryWithNews extends Category {
  news: News[];
}







