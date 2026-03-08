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
  lectureshipId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

// Nested relation ref
export interface LectureshipRef {
  id: number;
  name: string;
}

// Request DTO
export type CreateDosenDTO = z.infer<typeof CreateDosenSchema>;

export interface CreateDosenData {
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string;
  lectureshipId?: number;
}
export type UpdateDosenDTO = z.infer<typeof UpdateDosenSchema>;

export interface UpdateDosenData {
  name?: string;
  expertise?: string;
  research?: string;
  teaching?: string;
  photo?: string;
  lectureshipId?: number;
}

// Response DTO

export interface DosenResponse {
  id: string;
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string | null;
  lectureship: LectureshipRef | null;
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
