import multer from 'multer';
import path from 'path';
import BadRequestException from '../exceptions/BadRequestException';
import { UPLOAD_ALLOWED_MIME, UPLOAD_MAX_FILE_SIZE } from '../config/file.config';
import { UPLOADS_PATH } from '../config/path.config';

const uploadFile = multer({
  limits: {
    fileSize: UPLOAD_MAX_FILE_SIZE, // 2 MB
  },
  fileFilter(req, file, next) {
    const allowed = UPLOAD_ALLOWED_MIME;

    if (!allowed.includes(file.mimetype)) {
      return next(new BadRequestException('File extention not allowed'));
    }

    next(null, true);
  },
  dest: path.join(UPLOADS_PATH, "temp"),
});

export default uploadFile;
