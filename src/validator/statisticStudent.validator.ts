import { z } from 'zod';

export const CreateStatisticStudentSchema = z.object({
  year: z.number().min(2000, 'Year must be 2000 or later'),
  enteredStudents: z.number().min(0, 'Entered students must be non-negative'),
  graduatedStudents: z
    .number()
    .min(0, 'Graduated students must be non-negative'),
});

export const UpdateStatisticStudentSchema = z.object({
  year: z.number().min(2000, 'Year must be 2000 or later').optional(),
  enteredStudents: z
    .number()
    .min(0, 'Entered students must be non-negative')
    .optional(),
  graduatedStudents: z
    .number()
    .min(0, 'Graduated students must be non-negative')
    .optional(),
});
