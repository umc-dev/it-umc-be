import { z } from "zod";

export const CreateAdminSchema = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string().min(6),
});

export const UpdateAdminSchema = z.object({
  email: z.email().optional(),
  name: z.string().optional(),
  password: z.string().min(6).optional(),
});
