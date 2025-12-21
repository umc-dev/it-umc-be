import { PaginationMeta } from ".";
import {
  CreatePartnershipSchema,
  UpdatePartnershipSchema,
} from "../validator/partnerships.validator";
import z from "zod";

export interface Partnership {
  id: string;
  name: string;
  photo: string | null;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

/* =========================
   Request DTO
========================= */
export type CreatePartnershipDto = z.infer<typeof CreatePartnershipSchema>;

export interface CreatePartnershipData {
  name: string;
  photo?: string | null;
  startDate: Date;
  endDate: Date;
}

export type UpdatePartnershipDto = z.infer<typeof UpdatePartnershipSchema>;

export interface UpdatePartnershipData {
  name?: string;
  photo?: string | null;
  startDate?: Date;
  endDate?: Date;
}

/* =========================
   Response DTO
========================= */
export interface PartnershipResponse {
  id: string;
  name: string;
  photo: string | null;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartnershipListResponse {
  partnerships: PartnershipResponse[];
}

export interface PaginatedPartnershipResponse {
  data: PartnershipResponse[];
  meta: PaginationMeta;
}
