// All Routes

import { Router, type IRouter } from "express";
import adminRouter from "./admin.route";
import authRouter from "./auth.route";
import categoryRoute from "./category.route";

const router: IRouter = Router();

// Semua route digabungkan di sini
router.use("/admin", adminRouter);
router.use("/auth", authRouter);

// kalau nanti ada routes lain
// router.use("/news", newsRoutes);
router.use("/category", categoryRoute);

export default router;
