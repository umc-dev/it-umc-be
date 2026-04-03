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
  image: string;
  description: string;
}
