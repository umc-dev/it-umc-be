import multer from "multer";
import path from "path";
import { UPLOADS_PATH } from "../config/path.config";

const upload = multer({
  dest: path.join(UPLOADS_PATH, "temp"),
});

export default upload;
