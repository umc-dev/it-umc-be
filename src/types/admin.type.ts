import z from "zod";
import {
  CreateAdminSchema,
  UpdateAdminSchema,
} from "../validator/admin.validator";
import { PaginationMeta } from ".";
import { News } from "./news.type";

// Admin DTO

export interface Admin {
  id: string;
  email: string;
  name: string | null;
  password: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminWithNews extends Admin {
  news: News[];
}

// Request / Create

// export interface AdminCreateDTO {
//   email: string;
//   name?: string;
//   password: string;
//   avatar?: string;
// }

// export interface AdminUpdateDTO {
//   email?: string;
//   name?: string;
//   password?: string;
//   avatar?: string;
// }

export type AdminCreateDTO = z.infer<typeof CreateAdminSchema>;
export type AdminUpdateDTO = z.infer<typeof UpdateAdminSchema>;

export interface AdminLoginDTO {
  email: string;
  password: string;
}

// Response DTO

export interface AdminResponse {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedAdminResponse {
  data: AdminResponse[];
  meta: PaginationMeta;
}

export interface AdminWithNewsResponse extends AdminResponse {
  news: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface AdminListResponse {
  admins: AdminResponse[];
}

export interface LoginResponse {
  admin: AdminResponse;
  token: string;
}
