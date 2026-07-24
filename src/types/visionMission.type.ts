import {
  CreateVisionMissionSchema,
  UpdateVisionMissionSchema,
} from '../validator/visionMission.validator';
import { PaginationMeta } from '.';
import z from 'zod';

// Vision Mission DTO
export interface VisionMission {
  id: number;
  prodi: 'S1' | 'D3';
  vision: string;
  mission: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateVisionMissionDto = z.infer<typeof CreateVisionMissionSchema>;

export interface CreateVisionMissionData {
  prodi?: 'S1' | 'D3';
  vision: string;
  mission: string;
}

export type UpdateVisionMissionDto = z.infer<typeof UpdateVisionMissionSchema>;

export interface UpdateVisionMissionData {
  prodi?: 'S1' | 'D3';
  vision?: string;
  mission?: string;
}

// Response DTO
export interface VisionMissionResponse {
  id: number;
  prodi: 'S1' | 'D3';
  vision: string;
  mission: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VisionMissionListResponse {
  visionMission: VisionMissionResponse[];
}

export interface PaginatedVisionMissionResponse {
  data: VisionMissionResponse[];
  meta: PaginationMeta;
}
