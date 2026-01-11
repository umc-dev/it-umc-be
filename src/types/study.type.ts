import {
  CreateStudySchema,
  UpdateStudySchema,
} from '../validator/study.validator';
import { PaginationMeta } from '.';
import z from 'zod';

// Study DTO
export interface Study {
  id: number;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateStudyDto = z.infer<typeof CreateStudySchema>;

export interface CreateStudyData {
  source: string;
}

export type UpdateStudyDto = z.infer<typeof UpdateStudySchema>;

export interface UpdateStudyData {
  source?: string;
}

// Response DTO
export interface StudyResponse {
  id: number;
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