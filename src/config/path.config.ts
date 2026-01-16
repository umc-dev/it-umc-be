import path from "path";
import { env } from "./env";

export const ROOT_PATH = process.cwd();

export const UPLOADS_PATH = env.UPLOADS_PATH
  ? path.isAbsolute(env.UPLOADS_PATH)
    ? env.UPLOADS_PATH
    : path.join(ROOT_PATH, env.UPLOADS_PATH)
  : path.join(ROOT_PATH, "uploads");
