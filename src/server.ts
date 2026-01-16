import express from "express";
import type { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import NotFoundException from "./exceptions/NotFoundException";
import { errorHandler } from "./middlewares/error.middleware";
import routes from "./routes/index";
import path from "path";
import cors from "cors";
import "./config/passport";
import passport from "passport";
import cookieParser from "cookie-parser";

// Init Express
const app: Express = express();

// Cors (Ganti pas mau di deploy)
const allowedOrigins = env.ALLOWED_ORIGINS
  ? env.ALLOWED_ORIGINS.split(",")
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // untuk testing kaya postman / apidog / curl
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// Proteksi header
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
  }),
);

app.use(passport.initialize());

// Logging Request HTTP
app.use(morgan("combined"));

// Parsing JSON dan form-urlencoded
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Public folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
app.get("/", async (req, res) => {
  res.status(200).json({
    message: `Welcome to UMC BE API`,
  });
});

app.use("/api/v1", routes);

// Handler untuk route yang tidak ada
app.use((req, res, next) => {
  next(new NotFoundException(`Route ${req.originalUrl} not found`));
});

// Middlewares
app.use(errorHandler);

export default app;
