import { z } from "zod";

export const CreateDosenSchema = z.object({
  name: z.string().min(1, "Name is required"),
  expertise: z.string().min(1, "Expertise is required"),
  research: z.url().min(1, "Research description is required"),
  teaching: z.url().min(1, "Teaching description is required"),
});

export const UpdateDosenSchema = z.object({
  name: z.string().optional(),
  expertise: z.string().optional(),
  research: z.url().optional(),
  teaching: z.url().optional(),
});
