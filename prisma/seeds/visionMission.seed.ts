import { PrismaClient } from '@prisma/client';
import { Faker, id_ID, faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedVisionMission() {
  // Total data yang ingin dibuat
  const totalVisionMission = 3;

  // Faker Bahasa Indonesia
  const fakerID = new Faker({ locale: [id_ID] });

  const visionMissionData = await Promise.all(
    Array.from({ length: totalVisionMission }).map(async () => {
      return {
        vision: faker.lorem.paragraph(1),
        mission: faker.lorem.paragraph(2),
      };
    })
  );

  await prisma.visionMission.createMany({
    data: visionMissionData,
    skipDuplicates: true,
  });

  console.log(`${totalVisionMission} vision-mission created.`);
}
