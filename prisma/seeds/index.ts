import { PrismaClient } from "@prisma/client";
import { seedAdmins } from "./admin.seed";
import { seedNews } from "./news.seed";
import { seedCategory } from "./category.seed";
import { seedVisionMission } from "./visionMission.seed";
import { seedAlumni } from "./alumni.seed";
import { seedChatbotContext } from "./chatbotContext.seed";
import { seedLectureships } from "./lectureship.seed";
import { seedDosen } from "./dosen.seed";
import { seedStatisticStudents } from "./statisticStudent.seed";
import { seedPartnerships } from "./partnership.seed";
import { seedStudies } from "./study.seed";
import { seedAchievements } from "./achievement.seed";
import { seedFacilities } from "./facility.seed";
import { seedOrganizationalStructure } from "./organizationalStructure.seed";

const prisma = new PrismaClient();

async function main() {
  console.log("Running seeders...");
  await seedAdmins();
  await seedChatbotContext();
  await seedCategory();
  await seedNews();
  await seedVisionMission();
  await seedAlumni();
  await seedLectureships();
  await seedDosen();
  await seedStatisticStudents();
  await seedPartnerships();
  await seedStudies();
  await seedAchievements();
  await seedFacilities();
  await seedOrganizationalStructure();
  console.log("Seeding finished.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

