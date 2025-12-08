import z from 'zod';

export const CreateVisionMissionSchema = z.object({
  vision: z.string().min(5, 'Vision is required'),
  mission: z.string().min(5, 'Mission is required'),
});

export const UpdateVisionMissionSchema = z.object({
  vision: z.string().optional(),
  mission: z.string().optional(),
});
