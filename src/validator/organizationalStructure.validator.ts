import { z } from "zod";

export const CreateOrganizationalStructureSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

export const UpdateOrganizationalStructureSchema = z.object({
  description: z.string().min(1, "Description is required").optional(),
});
