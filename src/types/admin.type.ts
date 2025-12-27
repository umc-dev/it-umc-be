import z from "zod";
import {
  CreateAdminSchema,
  UpdateAdminSchema,
} from "../validator/admin.validator";
import { PaginationMeta } from ".";
import { News } from "./news.type";
import { AdminRole } from "@prisma/client";
import { Permission } from "../auth/permissions";

// Admin DTO

export interface Admin {
  id: string;
  email: string;
  name: string | null;
  password: string | null;
  avatar: string | null;
  role: AdminRole;
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
export interface AdminCreateData {
  email: string;
  name: string;
  password?: string;
  avatar?: string;
  role?: AdminRole;
}

export type AdminCreateDTO = z.infer<typeof CreateAdminSchema>;

export interface AdminUpdateData {
  email?: string;
  name?: string;
  password?: string;
  avatar?: string;
  role?: AdminRole;
}

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
  role: AdminRole;
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

export interface AuthAdmin {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}
