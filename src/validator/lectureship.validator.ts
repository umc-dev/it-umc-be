import { z } from "zod";

export const CreateLectureshipSchema = z.object({
  name: z.string().min(3).max(50),
});

export const UpdateLectureshipSchema = z.object({
  name: z.string().min(3).max(50).optional()
});