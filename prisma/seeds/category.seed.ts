import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedCategory() {
  console.log("Seeding categories...");

  await prisma.category.createMany({
    data: [
      { name: "Teknologi", slug: "teknologi" },
      { name: "Pengumuman", slug: "pengumuman" },
      { name: "Kampus", slug: "kampus" },
    ],
    skipDuplicates: true,
  });

  console.log("Categories seeded.");
}
