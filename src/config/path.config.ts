import path from "path";
import { env } from "./env";

export const ROOT_PATH = process.cwd();

// Jika di lingkungan Docker/production dan UPLOADS_PATH bernilai relatif ("uploads"),
// paksa gunakan "/uploads" (persistent volume Docker yang di-mount ke /var/www/uploads)
const isProduction = env.NODE_ENV === "production";
const rawUploadPath = env.UPLOADS_PATH || "uploads";

export const UPLOADS_PATH =
  isProduction && !path.isAbsolute(rawUploadPath)
    ? "/uploads"
    : path.resolve(rawUploadPath);
