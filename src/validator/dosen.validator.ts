import { z } from "zod";

const DosenPositionSchema = z
  .object({
    lectureshipId: z.coerce.number().int().positive(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional().nullable(),
  })
  .refine(
    (data) => !data.endDate || data.endDate >= data.startDate,
    {
      message: "End date must be after or equal to start date",
      path: ["endDate"],
    },
  );

export const CreateDosenSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  expertise: z.string().min(1, 'Expertise is required'),
  research: z.url().min(1, 'Research description is required'),
  teaching: z.url().min(1, 'Teaching description is required'),
  positions: z.array(DosenPositionSchema).optional(),
});

export const UpdateDosenSchema = z.object({
  name: z.string().optional(),
  expertise: z.string().optional(),
  research: z.url().optional(),
  teaching: z.url().optional(),
  positions: z.array(DosenPositionSchema).optional(),
});
