import path from "path";
import { env } from "./env";

export const ROOT_PATH = process.cwd();

export const UPLOADS_PATH = env.UPLOADS_PATH
  ? path.resolve(env.UPLOADS_PATH)
  : "/uploads";
