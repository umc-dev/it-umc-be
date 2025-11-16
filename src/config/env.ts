import dotenv from "dotenv";
import z from "zod";

// Pastikan .env sudah sesuai dengan .env.example

// Load environment variables dari .env
dotenv.config();

// Pengecekan .env
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().default("3000"),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:\n");
  console.error("Make sure .env is correct");
  process.exit(1);
}

export const env = parsed.data;
