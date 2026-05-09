import {
  CreateDosenTridharmaSchema,
  UpdateDosenTridharmaSchema,
} from '../validator/dosenTridharma.validator';
import { PaginationMeta } from '.';
import z from 'zod';
import { DosenTridharmaCategory } from '@prisma/client';

// DosenTridarma DTO
export interface DosenTridarma {
  id: number;
  dosenId: string;
  category: DosenTridharmaCategory;
  title: string;
  description: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

// Request DTO
export type CreateDosenTridharmaDto = z.infer<
  typeof CreateDosenTridharmaSchema
>;

export interface CreateDosenTridharmaData {
  dosenId: string;
  category: DosenTridharmaCategory;
  title: string;
  year: number;
  description: string;
  link: string;
}

export type UpdateDosenTridharmaDto = z.infer<
  typeof UpdateDosenTridharmaSchema
>;

export interface UpdateDosenTridharmaData {
  dosenId?: string;
  category?: DosenTridharmaCategory;
  title?: string;
  year?: number;
  description?: string;
  link?: string;
}

// Response DTO
export interface DosenTridharmaResponse {
  id: number;
  dosenId: string;
  category: DosenTridharmaCategory;
  title: string;
  year: number;
  description: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DosenTridharmaListResponse {
  dosenTridharmas: DosenTridharmaResponse[];
}

export interface PaginatedDosenTridharmaResponse {
  data: DosenTridharmaResponse[];
  meta: PaginationMeta;
}

export interface DosenTridharmaWithDosenResponse extends DosenTridharmaResponse {
  dosen: {
    id: string;
    nidn: string;
    name: string;
    expertise: string;
    photo: string;
    teaching: string;
    research: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
