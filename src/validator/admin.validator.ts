import { z } from "zod";

export const CreateAdminSchema = z.object({
  email: z.email(),
  name: z.string().optional(),
  password: z.string().min(6),
  avatar: z.string().optional(),
});

export const UpdateAdminSchema = z.object({
  email: z.email().optional(),
  name: z.string().optional(),
  password: z.string().min(6).optional(),
  avatar: z.string().optional(),
});
