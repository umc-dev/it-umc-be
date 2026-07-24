import {
  CreateStatisticStudentSchema,
  UpdateStatisticStudentSchema,
} from '../validator/statisticStudent.validator';
import { PaginationMeta } from '.';
import z from 'zod';

// Student Statistic DTO
export interface StatisticStudent {
  id: string;
  prodi: 'S1' | 'D3';
  year: number;
  enteredStudents: number;
  graduatedStudents: number;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateStatisticStudentDto = z.infer<
  typeof CreateStatisticStudentSchema
>;

export interface CreateStatisticStudentData {
  prodi?: 'S1' | 'D3';
  year: number;
  enteredStudents: number;
  graduatedStudents: number;
}

export type UpdateStatisticStudentDto = z.infer<
  typeof UpdateStatisticStudentSchema
>;

export interface UpdateStatisticStudentData {
  prodi?: 'S1' | 'D3';
  year?: number;
  enteredStudents?: number;
  graduatedStudents?: number;
}

// Response DTO
export interface StatisticStudentResponse {
  id: string;
  prodi: 'S1' | 'D3';
  year: number;
  enteredStudents: number;
  graduatedStudents: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatisticStudentListResponse {
  studentStatistic: StatisticStudentResponse[];
}

export interface PaginatedStatisticStudentResponse {
  data: StatisticStudentResponse[];
  meta: PaginationMeta;
}
