import {
  CreateFacilitySchema,
  UpdateFacilitySchema,
} from '../validator/facility.validator';
import { PaginationMeta } from '.';
import z from 'zod';

// Student Statistic DTO
export interface Facility {
  id: string;
  name: string;
  description: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateFacilityDto = z.infer<
  typeof CreateFacilitySchema
>;

export interface CreateFacilityData {
  name: string;
  description: string;
  photo: string;
}

export type UpdateFacilityDto = z.infer<
  typeof UpdateFacilitySchema
>;

export interface UpdateFacilityData {
  name?: string;
  description?: string;
  photo?: string;
}

// Response DTO
export interface FacilityResponse {
  id: number;
  name: string;
  description: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FacilityListResponse {
  facilities: FacilityResponse[];
}

export interface PaginatedFacilityResponse {
  data: FacilityResponse[];
  meta: PaginationMeta;
}
