import {
  CreateStudySchema,
  UpdateStudySchema,
} from '../validator/study.validator';
import { PaginationMeta } from '.';
import z from 'zod';

// Study DTO
export interface Study {
  id: number;
  prodi: 'S1' | 'D3';
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateStudyDto = z.infer<typeof CreateStudySchema>;

export interface CreateStudyData {
  prodi?: 'S1' | 'D3';
  source: string;
}

export type UpdateStudyDto = z.infer<typeof UpdateStudySchema>;

export interface UpdateStudyData {
  prodi?: 'S1' | 'D3';
  source?: string;
}

// Response DTO
export interface StudyResponse {
  id: number;
  prodi: 'S1' | 'D3';
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyListResponse {
  studies: StudyResponse[];
}

export interface PaginatedStudyResponse {
  data: StudyResponse[];
  meta: PaginationMeta;
}