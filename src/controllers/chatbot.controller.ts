import { NextFunction, Request, Response } from "express";
import { ResponseHTTP } from "../utils/response";
import { chatbotService } from "../services/chatbot.service";

export const chatbotController = {
  async getResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }

      const { answer, reasoning } =
        await chatbotService.getResponseFromGroq(message);

      return res
        .status(200)
        .json(ResponseHTTP.ok({ answer, reasoning }, "Message Responded"));
    } catch (err) {
      next(err);
    }
  },
};
