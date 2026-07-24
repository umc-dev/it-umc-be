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
  photo: string | null;
  video: string;
  message: string; 
  year: number;
  prodi: 'S1' | 'D3';
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateAlumniDto = z.infer<
  typeof CreateAlumniSchema
>;

export interface CreateAlumniData {
  name: string;
  photo?: string | null;
  video: string;
  message: string;
  year: number;
  prodi?: 'S1' | 'D3';
}

export type UpdateAlumniDto = z.infer<
  typeof UpdateAlumniSchema
>;

export interface UpdateAlumniData {
  name?: string;
  photo?: string | null;
  video?: string;
  message?: string;
  year?: number;
  prodi?: 'S1' | 'D3';
}

// Response DTO
export interface AlumniResponse {
  id: string;
  name: string;
  photo: string | null;
  video: string;
  message: string;
  year: number;
  prodi: 'S1' | 'D3';
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedAlumniResponse {
  data: AlumniResponse[];
  meta: PaginationMeta;
}
