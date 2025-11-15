import type { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException.ts";
import { ZodError } from "zod";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("❌ Error:", err);

  // Jika error berasal dari Zod (validasi input)
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: err.issues,
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
