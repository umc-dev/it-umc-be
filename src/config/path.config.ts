import path from "path";
import { env } from "./env";

export const ROOT_PATH = path.resolve(__dirname, "../../");
export const UPLOADS_PATH = env.UPLOADS_PATH ?? path.join(ROOT_PATH, "uploads");
