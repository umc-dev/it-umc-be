import z from "zod";
import {
  CreateDosenSchema,
  UpdateDosenSchema,
} from "../validator/dosen.validator";
import { PaginationMeta } from ".";

// Lecturer Model
export interface Dosen {
  id: string;
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateDosenDTO = z.infer<typeof CreateDosenSchema>;

export interface CreateDosenData {
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string;
}
export type UpdateDosenDTO = z.infer<typeof UpdateDosenSchema>;

export interface UpdateDosenData {
  name?: string;
  expertise?: string;
  research?: string;
  teaching?: string;
  photo?: string;
}

// Response DTO

export interface DosenResponse {
  id: string;
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DosenListResponse {
  dosen: DosenResponse[];
}

export interface PaginatedDosenResponse {
  data: DosenResponse[];
  meta: PaginationMeta;
}
