import { z } from "zod";

export const CreateOrganizationalStructureSchema = z.object({
  description: z.string().min(1, "Description is required"),
  prodi: z.enum(['S1', 'D3']).optional(),
});

export const UpdateOrganizationalStructureSchema = z.object({
  description: z.string().min(1, "Description is required").optional(),
  prodi: z.enum(['S1', 'D3']).optional(),
});
