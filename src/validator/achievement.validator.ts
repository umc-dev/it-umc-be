import { z } from "zod";

export const CreateAchievementSchema = z.object({
  prodi: z.enum(['S1', 'D3']).optional(),
  name: z
    .string()
    .min(1, "Achievement name is required")
    .max(255, "Achievement name must be at most 255 characters"),
  achievementName: z
    .string()
    .min(1, "Achievement title is required")
    .max(255, "Achievement title must be at most 255 characters"),
  link: z.url("Certificate link must be a valid URL").max(
    255,
    "Certificate link must be at most 255 characters",
  ),
  achievedAt: z.coerce.date(),
});

export const UpdateAchievementSchema = z.object({
  prodi: z.enum(['S1', 'D3']).optional(),
  name: z
    .string()
    .min(1, "Achievement name is required")
    .max(255, "Achievement name must be at most 255 characters")
    .optional(),
  achievementName: z
    .string()
    .min(1, "Achievement title is required")
    .max(255, "Achievement title must be at most 255 characters")
    .optional(),
  link: z
    .url("Certificate link must be a valid URL")
    .max(255, "Certificate link must be at most 255 characters")
    .optional(),
  achievedAt: z.coerce.date().optional(),
});
