import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function seedStatisticStudents() {
  console.log("Seeding student statistics...");

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 5;

  for (let year = startYear; year <= currentYear; year++) {
    const enteredStudents = faker.number.int({ min: 100, max: 250 });
    const graduatedStudents = faker.number.int({ min: 80, max: 180 });

    await prisma.statisticStudent.upsert({
      where: { year },
      update: {},
      create: {
        year,
        enteredStudents,
        graduatedStudents,
      },
    });
  }

  console.log("Student statistics seeded.");
}
