// All Routes

import { Router, type IRouter } from "express";
import adminRouter from "./admin.route";

const router: IRouter = Router();

// Semua route digabungkan di sini
router.use("/admins", adminRouter);

// kalau nanti ada routes lain
// router.use("/auth", authRoutes);
// router.use("/news", newsRoutes);

export default router;
