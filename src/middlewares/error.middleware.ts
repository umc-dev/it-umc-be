import type { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { ZodError } from "zod";
import multer from "multer";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("❌ Error:", err);

  // Jika error berasal dari Zod (validasi input)
  if (err instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    err.issues.forEach((issue) => {
      const fieldPath = issue.path.join('.');
      if (!errors[fieldPath]) {
        errors[fieldPath] = [];
      }
      errors[fieldPath].push(issue.message);
    });
    return res.status(400).json({
      success: false,
      status: 400,
      errors,
    });
  }

  // Jika error berasal dari multer (upload file)
  if (err instanceof multer.MulterError) {
    let message: string;

    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File size too large";
    }
    // Error spesifik bisa ditambah di sini

    return res.status(400).json({
      success: false,
      status: 400,
      message: message || err.message
    });
  }

  // Jika custom HttpException
  if (err instanceof HttpException) {
    return res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Default: internal server error
  return res.status(500).json({
    success: false,
    status: 500,
    message: "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: (err as Error)?.stack,
    }),
  });
};
