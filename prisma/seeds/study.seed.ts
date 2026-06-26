import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function seedStudies() {
  console.log("Seeding studies...");

  const studies = [
    { prodi: "S1" as const, source: "https://example.com/kurikulum-s1.pdf" },
    { prodi: "D3" as const, source: "https://example.com/kurikulum-d3.pdf" },
  ];

  for (const study of studies) {
    await prisma.study.create({
      data: study,
    });
  }

  console.log("Studies seeded.");
}
