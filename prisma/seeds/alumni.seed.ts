import { PrismaClient } from '@prisma/client';
import { Faker, id_ID, faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedAlumni() {
  // Total data yang ingin dibuat
  const totalAlumni = 5;

  // Faker Bahasa Indonesia
  const fakerID = new Faker({ locale: [id_ID] });

  const alumniData = await Promise.all(
    Array.from({ length: totalAlumni }).map(async () => {
      const videoId = fakerID.string.alphanumeric(11);

      return {
        name: fakerID.person.fullName(),
        video: `https://www.youtube.com/watch?v=${videoId}`,
        message: faker.lorem.paragraph(1),
        year: faker.number.int({ min: 2000, max: 2025 }),
      };
    })
  );

  await prisma.alumni.createMany({
    data: alumniData,
    skipDuplicates: true,
  });

  console.log(`${totalAlumni} alumni created.`);
}