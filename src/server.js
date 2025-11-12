import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import NotFoundException from "./exceptions/NotFoundException.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Init Express
const app = express();

// Proteksi header
app.use(helmet());

// Logging Request HTTP
app.use(morgan("combined"));

// Parsing JSON dan form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
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
