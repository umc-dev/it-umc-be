import jwt, { SignOptions } from "jsonwebtoken";
import type { AuthPayload } from "../types/auth.type";
import UnauthorizedException from "../exceptions/UnauthorizedException";

// Generate token jwt
export const generateToken = (
  payload: AuthPayload,
  expiresIn: string = "1d",
): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not defined.");
  }

  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload, secret, options);
};

// Verify token jwt
export const verifyToken = (token: string): AuthPayload => {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET environment variable is not defined.");
    }

    const decoded = jwt.verify(token, secret) as AuthPayload;
    return decoded;
  } catch {
    throw new UnauthorizedException("Invalid or expired token");
  }
};
