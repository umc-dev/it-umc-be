import { NextFunction, Request, Response } from "express";
import BadRequestException from "../exceptions/BadRequestException";

export const parseDosenPositions = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { positions } = req.body;

  if (typeof positions !== "string") {
    return next();
  }

  try {
    req.body.positions = JSON.parse(positions);
    next();
  } catch {
    next(
      new BadRequestException(
        "Positions must be a valid JSON array string in multipart/form-data",
      ),
    );
  }
};
