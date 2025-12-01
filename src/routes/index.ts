// All Routes

import { Router, type IRouter } from "express";
import adminRouter from "./admin.route";
import authRouter from "./auth.route";
import categoryRoute from "./category.route";
import newsRouter from "./news.route";
import dosenRouter from "./dosen.route";

const router: IRouter = Router();

// Semua route digabungkan di sini
router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/news", newsRouter);
router.use("/dosen", dosenRouter);

// kalau nanti ada routes lain
// router.use("/news", newsRoutes);
router.use("/category", categoryRoute);

export default router;
