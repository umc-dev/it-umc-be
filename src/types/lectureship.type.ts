import {
  CreateLectureshipSchema,
  UpdateLectureshipSchema,
} from '../validator/lectureship.validator';
import { PaginationMeta } from '.';
import { News } from './news.type';
import z from 'zod';
import { Dosen } from './dosen.type';

// Lectureship DTO
export interface Lectureship {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateLectureshipDto = z.infer<typeof CreateLectureshipSchema>;

export interface CreateLectureshipData {
  name: string;
}

export type UpdateLectureshipDto = z.infer<typeof UpdateLectureshipSchema>;

export interface UpdateLectureshipData {
  name?: string;
}

// Response DTO
export interface LectureshipResponse {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LectureshipListResponse {
  lectureships: LectureshipResponse[];
}

export interface PaginatedLectureshipResponse {
  data: LectureshipResponse[];
  meta: PaginationMeta;
}

export interface LectureshipWithDosenResponse extends LectureshipResponse {
  dosen: {
    id: string;
    name: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export interface LectureshipWithDosen extends Lectureship {
  dosen: Dosen[];
}
