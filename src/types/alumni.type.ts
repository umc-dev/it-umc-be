import {
  CreateAlumniSchema,
  UpdateAlumniSchema,
} from '../validator/alumni.validator';
import { PaginationMeta } from '.';
import z from 'zod';

// Student Statistic DTO
export interface Alumni {
  id: string;
  name: string;
  video: string;
  message: string; 
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateAlumniDto = z.infer<
  typeof CreateAlumniSchema
>;

export interface CreateAlumniData {
  name: string;
  video: string;
  message: string;
  year: number;
}

export type UpdateAlumniDto = z.infer<
  typeof UpdateAlumniSchema
>;

export interface UpdateAlumniData {
  name?: string;
  video?: string;
  message?: string;
  year?: number;
}

// Response DTO
export interface AlumniResponse {
  id: string;
  name: string;
  video: string;
  message: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AlumniListResponse {
  studentStatistic: AlumniResponse[];
}

export interface PaginatedAlumniResponse {
  data: AlumniResponse[];
  meta: PaginationMeta;
}
