import { z } from 'zod';

export const CreateAlumniSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  workplace: z.string().max(255).optional().nullable(),
  position: z.string().max(255).optional().nullable(),
  linkedin: z.string().url('LinkedIn link must be a valid URL').optional().nullable().or(z.literal('')),
  instagram: z.string().url('Instagram link must be a valid URL').optional().nullable().or(z.literal('')),
  video: z.string().url('Video link must be a valid URL').optional().nullable().or(z.literal('')),
  message: z.string().min(1, 'Message is required'),
  year: z.coerce.number().min(1900, 'Year must be valid'),
  graduationYear: z.coerce.number().min(1900).optional().nullable(),
  prodi: z.enum(['S1', 'D3']).optional(),
});

export const UpdateAlumniSchema = z.object({
  name: z.string().optional(),
  workplace: z.string().max(255).optional().nullable(),
  position: z.string().max(255).optional().nullable(),
  linkedin: z.string().url('LinkedIn link must be a valid URL').optional().nullable().or(z.literal('')),
  instagram: z.string().url('Instagram link must be a valid URL').optional().nullable().or(z.literal('')),
  video: z.string().url('Video link must be a valid URL').optional().nullable().or(z.literal('')),
  message: z.string().optional(),
  year: z.coerce.number().optional(),
  graduationYear: z.coerce.number().optional().nullable(),
  prodi: z.enum(['S1', 'D3']).optional(),
});

export const ApproveAlumniSchema = z.object({
  isApproved: z.boolean({
    message: 'isApproved must be a boolean',
  }),
});


