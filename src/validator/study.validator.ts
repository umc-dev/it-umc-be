import { z } from 'zod';

export const CreateStudySchema = z.object({
  prodi: z.enum(['S1', 'D3']).optional(),
});

export const UpdateStudySchema = z.object({
  prodi: z.enum(['S1', 'D3']).optional(),
});