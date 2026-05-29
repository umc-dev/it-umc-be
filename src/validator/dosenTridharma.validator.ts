import { z } from "zod";

export const CreateDosenTridharmaSchema = z.object({
  dosenId: z.string('dosenId is required'),
  category: z.enum(['PENGABDIAN', 'PENGAJARAN', 'PENELITIAN']),
  title: z.string('name is required').min(3).max(100),
  year: z.number().min(2000, 'Year must be 2000 or later'),
  description: z.string('description is required').min(3),
  link: z.url('link must be a valid URL'),
});

export const UpdateDosenTridharmaSchema = z.object({
  dosenId: z.string().optional(),
  category: z.enum(['PENGABDIAN', 'PENGAJARAN', 'PENELITIAN']).optional(),
  title: z.string('name is required').min(3).max(100).optional(),
  year: z.number().min(2000, 'Year must be 2000 or later').optional(),
  description: z.string('description is required').min(3).optional(),
  link: z.url('link must be a valid URL').optional(),
});
