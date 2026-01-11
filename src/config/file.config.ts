import { env } from './env';

export const UPLOAD_ALLOWED_MIME = env.UPLOAD_ALLOWED_MIME?.split(',') ?? ['application/pdf'];
export const UPLOAD_MAX_FILE_SIZE = env.UPLOAD_MAX_FILE_SIZE ?? 2 * 1024 * 1024;