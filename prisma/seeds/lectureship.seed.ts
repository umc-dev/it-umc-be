import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedLectureships() {
  console.log("Seeding lectureships...");

  await prisma.lectureship.createMany({
    data: [
      { name: "Asisten Ahli" },
      { name: "Lektor" },
      { name: "Lektor Kepala" },
      { name: "Guru Besar" },
    ],
    skipDuplicates: true,
  });

  console.log("Lectureships seeded.");
}
