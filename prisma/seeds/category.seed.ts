import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedCategory() {
  console.log("Seeding categories...");

  await prisma.category.createMany({
    data: [
      { name: "Kemahasiswaan", slug: "kemahasiswaan" },
      { name: "Akademik", slug: "akademik" },
      { name: "Berita Kampus", slug: "berita-kampus" },
      { name: "Promosi", slug: "promosi" },
    ],
    skipDuplicates: true,
  });

  console.log("Categories seeded.");
}
