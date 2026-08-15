import { z } from "zod";

export const CreateAccreditationSchema = z
  .object({
    category: z.enum(["KAMPUS", "PRODI"], {
      message: "Category is required (KAMPUS or PRODI)",
    }),

    prodi: z.enum(["S1", "D3"]).optional().nullable(),

    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title must be at most 255 characters"),

    grade: z
      .string()
      .min(1, "Grade is required")
      .max(50, "Grade must be at most 50 characters"),

    skNumber: z
      .string()
      .min(1, "SK Number is required")
      .max(100, "SK Number must be at most 100 characters"),

    skLink: z
      .string()
      .url("SK Link must be a valid URL")
      .optional()
      .nullable()
      .or(z.literal("")),

    certificateFile: z
      .string()
      .max(255, "Certificate file path must be at most 255 characters")
      .optional()
      .nullable(),

    institution: z
      .string()
      .max(100, "Institution name must be at most 100 characters")
      .optional()
      .nullable(),

    validFrom: z.coerce.date(),

    validUntil: z.coerce.date(),
  })
  .refine((data) => data.validUntil >= data.validFrom, {
    message: "validUntil must be after or equal to validFrom",
    path: ["validUntil"],
  });

export const UpdateAccreditationSchema = z
  .object({
    category: z.enum(["KAMPUS", "PRODI"]).optional(),

    prodi: z.enum(["S1", "D3"]).optional().nullable(),

    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title must be at most 255 characters")
      .optional(),

    grade: z
      .string()
      .min(1, "Grade is required")
      .max(50, "Grade must be at most 50 characters")
      .optional(),

    skNumber: z
      .string()
      .min(1, "SK Number is required")
      .max(100, "SK Number must be at most 100 characters")
      .optional(),

    skLink: z
      .string()
      .url("SK Link must be a valid URL")
      .optional()
      .nullable()
      .or(z.literal("")),

    certificateFile: z
      .string()
      .max(255, "Certificate file path must be at most 255 characters")
      .optional()
      .nullable(),

    institution: z
      .string()
      .max(100, "Institution name must be at most 100 characters")
      .optional()
      .nullable(),

    validFrom: z.coerce.date().optional(),

    validUntil: z.coerce.date().optional(),
  })
  .refine(
    (data) => {
      if (!data.validFrom || !data.validUntil) return true;
      return data.validUntil >= data.validFrom;
    },
    {
      message: "validUntil must be after or equal to validFrom",
      path: ["validUntil"],
    },
  );
