import express from "express";
import type { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.ts";
import NotFoundException from "./exceptions/NotFoundException.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";

// Init Express
const app: Express = express();

// Proteksi header
app.use(helmet());

// Logging Request HTTP
app.use(morgan("combined"));

// Parsing JSON dan form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", async (req, res) => {
  res.status(200).json({
    message: `API is running securely with Helmet on ${env.NODE_ENV} mode`,
  });
});

// Handler untuk route yang tidak ada
app.use((req, res, next) => {
  next(new NotFoundException(`Route ${req.originalUrl} not found`));
});

// Middlewares
app.use(errorHandler);

export default app;
