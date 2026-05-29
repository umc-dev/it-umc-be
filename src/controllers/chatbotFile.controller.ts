import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { chatbotFileRepository } from "../repositories/chatbotFile.repository";
import { parseFileContent } from "../utils/parser";
import { saveUploadedFile, deleteUploadedFile } from "../utils/file";
import { ResponseHTTP } from "../utils/response";
import BadRequestException from "../exceptions/BadRequestException";
import NotFoundException from "../exceptions/NotFoundException";

export const chatbotFileController = {
  async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new BadRequestException("Please upload a PDF or Excel file.");
      }

      const buffer = fs.readFileSync(req.file.path);
      let content = "";
      
      try {
        content = await parseFileContent(
          buffer,
          req.file.mimetype,
          req.file.originalname
        );
      } catch (err: any) {
        // Clean up temp file in case of parsing error
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        throw new BadRequestException(err.message || "Failed to parse file.");
      }

      // Save to uploads folder
      const saved = saveUploadedFile(req.file);

      const chatbotFile = await chatbotFileRepository.create({
        filename: req.file.originalname,
        filePath: saved.path,
        fileUrl: saved.url,
        content: content,
      });

      return res
        .status(201)
        .json(ResponseHTTP.created(chatbotFile, "File uploaded and parsed successfully."));
    } catch (err) {
      next(err);
    }
  },

  async listFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const files = await chatbotFileRepository.getAll();
      return res
        .status(200)
        .json(ResponseHTTP.ok(files, "Chatbot files fetched."));
    } catch (err) {
      next(err);
    }
  },

  async deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        throw new BadRequestException("ID param must be a number");
      }

      const fileRecord = await chatbotFileRepository.getById(id);
      if (!fileRecord) {
        throw new NotFoundException("Chatbot file not found.");
      }

      // Delete from storage
      deleteUploadedFile(fileRecord.fileUrl);

      // Delete from database
      await chatbotFileRepository.delete(id);

      return res
        .status(200)
        .json(ResponseHTTP.success("Chatbot file deleted successfully."));
    } catch (err) {
      next(err);
    }
  },
};
