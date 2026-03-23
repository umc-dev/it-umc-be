// All Routes

import { Router, type IRouter } from "express";
import adminRouter from "./admin.route";
import authRouter from "./auth.route";
import categoryRouter from "./category.route";
import newsRouter from "./news.route";
import lectureshipRouter from "./lectureship.route";
import dosenRouter from "./dosen.route";
import statisticStudentRouter from "./statisticStudent.route";
import visionMissionRouter from "./visionMission.route";
import partnershipsRouter from "./partnerships.route";
import alumniRouter from "./alumni.route";
import studyRouter from "./study.route";
import achievementRouter from "./achievement.route";
import facilityRouter from "./facility.route";
import { chatbotRouter } from "./chatbot.route";
import organizationalStructureRouter from "./organizationalStructure.route";

const router: IRouter = Router();

// Semua route digabungkan di sini
router.use("/admin", adminRouter);
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/news", newsRouter);
router.use("/lectureships", lectureshipRouter);
router.use("/dosen", dosenRouter);
router.use("/statistic-student", statisticStudentRouter);
router.use("/vision-mission", visionMissionRouter);
router.use("/partnerships", partnershipsRouter);
router.use("/alumni", alumniRouter);
router.use("/studies", studyRouter);
router.use("/achievement", achievementRouter);
router.use("/facilities", facilityRouter);
router.use("/chatbot", chatbotRouter);
router.use("/organizational-structure", organizationalStructureRouter);

// kalau nanti ada routes lain
// router.use("/news", newsRoutes);

export default router;
