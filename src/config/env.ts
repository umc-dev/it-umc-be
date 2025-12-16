import dotenv from "dotenv";
import z from "zod";

// Pastikan .env sudah sesuai dengan .env.example

// Load environment variables dari .env
dotenv.config();

// Pengecekan .env
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  BASE_URL: z.url(),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GOOGLE_CALLBACK_URL: z.url(),

  // URL
  CLIENT_URL: z.url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:\n");
  console.error("Make sure .env is correct");
  process.exit(1);
}

export const env = parsed.data;
