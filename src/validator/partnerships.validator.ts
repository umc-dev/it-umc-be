import { z } from "zod";

export const CreatePartnershipSchema = z
  .object({
    name: z
      .string()
      .min(1, "Partnership name is required")
      .max(255, "Partnership name must be at most 255 characters"),

    startDate: z.coerce.date(),

    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after or equal to start date",
    path: ["endDate"],
  });

export const UpdatePartnershipSchema = z
  .object({
    name: z
      .string()
      .min(1, "Partnership name is required")
      .max(255, "Partnership name must be at most 255 characters")
      .optional(),

    photo: z
      .string()
      .max(255, "Photo path must be at most 255 characters")
      .optional()
      .nullable(),

    startDate: z.coerce.date().optional(),

    endDate: z.coerce.date().optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return data.endDate >= data.startDate;
    },
    {
      message: "End date must be after or equal to start date",
      path: ["endDate"],
    },
  );
