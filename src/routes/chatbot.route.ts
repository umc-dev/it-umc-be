import { IRouter, Router } from "express";
import { chatbotController } from "../controllers/chatbot.controller";
import { chatbotFileController } from "../controllers/chatbotFile.controller";
import { validate } from "../middlewares/validation.middleware";
import { ChatbotSchema } from "../validator/chatbot.validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";

export const chatbotRouter: IRouter = Router();

// Chat response (Public)
chatbotRouter.post(
  "/response",
  validate(ChatbotSchema),
  chatbotController.getResponse,
);

// File Context Management (Protected for logged in admins)
chatbotRouter.get(
  "/files",
  authMiddleware,
  chatbotFileController.listFiles,
);

chatbotRouter.post(
  "/files",
  authMiddleware,
  upload.single("file"),
  chatbotFileController.uploadFile,
);

chatbotRouter.delete(
  "/files/:id",
  authMiddleware,
  chatbotFileController.deleteFile,
);

