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

// Nested relation ref
export interface LectureshipRef {
  id: number;
  name: string;
}

export interface DosenPositionInput {
  lectureshipId: number;
  startDate: Date;
  endDate?: Date | null;
}

export interface DosenPositionData extends DosenPositionInput {
  lectureshipId: number;
  startDate: Date;
  endDate?: Date | null;
}

export interface DosenPositionResponse {
  id: number;
  startDate: Date;
  endDate: Date | null;
  lectureship: LectureshipRef;
}

// Request DTO
export type CreateDosenDTO = z.infer<typeof CreateDosenSchema>;

export interface CreateDosenData {
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string;
  positions?: {
    create: DosenPositionData[];
  };
}
export type UpdateDosenDTO = z.infer<typeof UpdateDosenSchema>;

export interface UpdateDosenData {
  name?: string;
  expertise?: string;
  research?: string;
  teaching?: string;
  photo?: string;
  positions?: {
    deleteMany: Record<string, never>;
    create: DosenPositionData[];
  };
}

// Response DTO

export interface DosenResponse {
  id: string;
  name: string;
  expertise: string;
  research: string;
  teaching: string;
  photo: string | null;
  positions: DosenPositionResponse[];
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
