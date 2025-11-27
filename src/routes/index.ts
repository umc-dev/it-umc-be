// All Routes

import { Router, type IRouter } from "express";
import adminRouter from "./admin.route";
import authRouter from "./auth.route";
import newsRouter from "./news.route";

const router: IRouter = Router();

// Semua route digabungkan di sini
router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/news", newsRouter);

// kalau nanti ada routes lain
// router.use("/news", newsRoutes);

export default router;
