import { PrismaClient } from "@prisma/client";
import { seedAdmins } from "./admin.seed";
import { seedNews } from "./news.seed";

const prisma = new PrismaClient();

async function main() {
  console.log("Running seeders...");
  await seedAdmins();
  await seedNews();
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
