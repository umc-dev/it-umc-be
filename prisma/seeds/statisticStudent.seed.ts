import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function seedStatisticStudents() {
  console.log("Seeding student statistics...");

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 5;

  const prodis = ["S1", "D3"] as const;

  for (let year = startYear; year <= currentYear; year++) {
    for (const prodi of prodis) {
      const enteredStudents = faker.number.int({ min: 100, max: 250 });
      const graduatedStudents = faker.number.int({ min: 80, max: 180 });

      await prisma.statisticStudent.upsert({
        where: {
          year_prodi: {
            year,
            prodi,
          },
        },
        update: {},
        create: {
          year,
          prodi,
          enteredStudents,
          graduatedStudents,
        },
      });
    }
  }

  console.log("Student statistics seeded.");
}
