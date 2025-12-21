// All Routes

import { Router, type IRouter } from "express";
import adminRouter from "./admin.route";
import authRouter from "./auth.route";
import categoryRoute from "./category.route";
import newsRouter from "./news.route";
import dosenRouter from "./dosen.route";
import statisticStudentRouter from "./statisticStudent.route";
import visionMissionRouter from "./visionMission.route";
import partnershipsRouter from "./partnerships.route";

const router: IRouter = Router();

// Semua route digabungkan di sini
router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/news", newsRouter);
router.use("/dosen", dosenRouter);
router.use("/statistic-student", statisticStudentRouter);
router.use("/vision-mission", visionMissionRouter);
router.use("/partnerships", partnershipsRouter);

// kalau nanti ada routes lain
// router.use("/news", newsRoutes);
router.use("/category", categoryRoute);

export default router;
