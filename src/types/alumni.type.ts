import {
  CreateAlumniSchema,
  UpdateAlumniSchema,
  ApproveAlumniSchema,
} from '../validator/alumni.validator';
import { PaginationMeta } from '.';
import z from 'zod';

// Student Statistic DTO
export interface Alumni {
  id: string;
  name: string;
  photo: string | null;
  workplace: string | null;
  position: string | null;
  linkedin: string | null;
  instagram: string | null;
  video: string | null;
  message: string;
  year: number;
  graduationYear: number | null;
  prodi: 'S1' | 'D3';
  isApproved: boolean;
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
  workplace?: string | null;
  position?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  video?: string | null;
  message: string;
  year: number;
  graduationYear?: number | null;
  prodi?: 'S1' | 'D3';
  isApproved?: boolean;
}

export type UpdateAlumniDto = z.infer<
  typeof UpdateAlumniSchema
>;

export interface UpdateAlumniData {
  name?: string;
  photo?: string | null;
  workplace?: string | null;
  position?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  video?: string | null;
  message?: string;
  year?: number;
  graduationYear?: number | null;
  prodi?: 'S1' | 'D3';
  isApproved?: boolean;
}

export type ApproveAlumniDto = z.infer<
  typeof ApproveAlumniSchema
>;

// Response DTO
export interface AlumniResponse {
  id: string;
  name: string;
  photo: string | null;
  workplace: string | null;
  position: string | null;
  linkedin: string | null;
  instagram: string | null;
  video: string | null;
  message: string;
  year: number;
  graduationYear: number | null;
  prodi: 'S1' | 'D3';
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedAlumniResponse {
  data: AlumniResponse[];
  meta: PaginationMeta;
}

