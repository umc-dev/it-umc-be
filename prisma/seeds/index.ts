import { PrismaClient } from "@prisma/client";
import { seedAdmins } from "./admin.seed";
import { seedNews } from "./news.seed";
import { seedCategory } from "./category.seed";
import { seedAlumni } from "./alumni.seed";

const prisma = new PrismaClient();

async function main() {
  console.log("Running seeders...");
  await seedAdmins();
  await seedCategory();
  await seedNews();
  await seedAlumni();
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
