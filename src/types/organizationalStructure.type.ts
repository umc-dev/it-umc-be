import z from "zod";
import {
  CreateOrganizationalStructureSchema,
  UpdateOrganizationalStructureSchema,
} from "../validator/organizationalStructure.validator";

export type CreateOrganizationalStructureDto = z.infer<
  typeof CreateOrganizationalStructureSchema
>;

export type UpdateOrganizationalStructureDto = z.infer<
  typeof UpdateOrganizationalStructureSchema
>;

export interface OrganizationalStructureResponse {
  id: string;
  prodi: 'S1' | 'D3';
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
