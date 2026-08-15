import { AccreditationCategory, Prodi } from "@prisma/client";
import { PaginationMeta } from ".";
import {
  CreateAccreditationSchema,
  UpdateAccreditationSchema,
} from "../validator/accreditation.validator";
import z from "zod";

export interface Accreditation {
  id: string;
  category: AccreditationCategory;
  prodi: Prodi | null;
  title: string;
  grade: string;
  skNumber: string;
  skLink: string | null;
  certificateFile: string | null;
  institution: string | null;
  validFrom: Date;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}

/* =========================
   Request DTO
========================= */
export type CreateAccreditationDto = z.infer<typeof CreateAccreditationSchema>;

export interface CreateAccreditationData {
  category: AccreditationCategory;
  prodi?: Prodi | null;
  title: string;
  grade: string;
  skNumber: string;
  skLink?: string | null;
  certificateFile?: string | null;
  institution?: string | null;
  validFrom: Date;
  validUntil: Date;
}

export type UpdateAccreditationDto = z.infer<typeof UpdateAccreditationSchema>;

export interface UpdateAccreditationData {
  category?: AccreditationCategory;
  prodi?: Prodi | null;
  title?: string;
  grade?: string;
  skNumber?: string;
  skLink?: string | null;
  certificateFile?: string | null;
  institution?: string | null;
  validFrom?: Date;
  validUntil?: Date;
}

/* =========================
   Response DTO
========================= */
export interface AccreditationResponse {
  id: string;
  category: AccreditationCategory;
  prodi: Prodi | null;
  title: string;
  grade: string;
  skNumber: string;
  skLink: string | null;
  certificateFile: string | null;
  institution: string | null;
  validFrom: Date;
  validUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccreditationListResponse {
  accreditations: AccreditationResponse[];
}

export interface PaginatedAccreditationResponse {
  data: AccreditationResponse[];
  meta: PaginationMeta;
}
