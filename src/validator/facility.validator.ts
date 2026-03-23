import { z } from "zod";

export const CreateFacilitySchema = z.object({
  name: z.string(),
  description: z.string().min(3, 'Description is required'),
});

export const UpdateFacilitySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});