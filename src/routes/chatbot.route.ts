import { IRouter, Router } from "express";
import { chatbotController } from "../controllers/chatbot.controller";
import { validate } from "../middlewares/validation.middleware";
import { ChatbotSchema } from "../validator/chatbot.validator";

export const chatbotRouter: IRouter = Router();

chatbotRouter.post(
  "/response",
  validate(ChatbotSchema),
  chatbotController.getResponse,
);
