import z from 'zod';

export const CreateVisionMissionSchema = z.object({
  prodi: z.enum(['S1', 'D3']).optional(),
  vision: z.string().min(5, 'Vision is required'),
  mission: z.string().min(5, 'Mission is required'),
});

export const UpdateVisionMissionSchema = z.object({
  prodi: z.enum(['S1', 'D3']).optional(),
  vision: z.string().optional(),
  mission: z.string().optional(),
});

