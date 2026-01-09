import multer from 'multer';
import path from 'path';
import BadRequestException from '../exceptions/BadRequestException';

const uploadFile = multer({
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
  fileFilter(req, file, next) {
    const allowed = 'application/pdf';

    if (file.mimetype !== allowed) {
      return next(new BadRequestException('File extention not allowed'));
    }

    next(null, true);
  },
  dest: path.join(__dirname, "../../uploads/temp"),
});

export default uploadFile;
