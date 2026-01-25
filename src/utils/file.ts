import fs from "fs";
import path from "path";
import { UPLOADS_PATH } from "../config/path.config";
import sharp from 'sharp';

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// pastikan folder uploads ada
if (!fs.existsSync(UPLOADS_PATH)) {
  fs.mkdirSync(UPLOADS_PATH, { recursive: true });
}

// Save uploaded file
export const saveUploadedFile = async (file: Express.Multer.File) => {
  if (!file) throw new Error("No file provided");

  // Pengecekan mimetype
  const mimetype = file.mimetype.startsWith('image/');

  const ext = path.extname(file.originalname);
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${mimetype ? '.webp' : ext}`;
  const targetPath = path.join(UPLOADS_PATH, fileName);

  if (mimetype) {
    // convert ke webp
    await sharp(file.path).webp({ quality: 80 }).toFile(targetPath);
  }

  // pindahkan dari temp ke uploads
  fs.renameSync(file.path, targetPath);

  return {
    fileName,
    path: targetPath,
    url: `${BASE_URL.replace(/\/$/, "")}/uploads/${fileName}`,
  };
};

// Delete uploaded file
export const deleteUploadedFile = (fileUrl: string) => {
  try {
    const parsed = new URL(fileUrl);
    const filename = path.basename(parsed.pathname);

    const filePath = path.join(UPLOADS_PATH, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }

    return false;
  } catch (err) {
    console.error("Error deleting file:", err);
    return false;
  }
};
