import { z } from "zod";

export const CreateNewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  authorId: z.string().min(1, "Author ID is required"),
  thumbnail: z.url("Thumbnail must be a valid URL"),
  categoryId: z.string().min(1, "Category ID is required"),
});

export const UpdateNewsSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  authorId: z.string().optional(),
  thumbnail: z.url().optional(),
  categoryId: z.string().optional(),
});
