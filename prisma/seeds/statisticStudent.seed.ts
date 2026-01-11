import { PrismaClient } from '@prisma/client';
import { Faker, id_ID, faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedStatisticStudent() {
  // Total data yang ingin dibuat
  const totalStatisticStudent = 5;

  // Faker Bahasa Indonesia
  const fakerID = new Faker({ locale: [id_ID] });

  const statisticStudentData = await Promise.all(
    Array.from({ length: totalStatisticStudent }).map(async () => {

      return {
        year: faker.number.int({ min: 2020, max: 2025 }),
        enteredStudents: faker.number.int({ min: 1000, max: 2000 }),
        graduatedStudents: faker.number.int({ min: 1000, max: 2000 }),
      };
    })
  );

  await prisma.statisticStudent.createMany({
    data: statisticStudentData,
    skipDuplicates: true,
  });

  console.log(`${totalStatisticStudent} statisticStudent created.`);
}