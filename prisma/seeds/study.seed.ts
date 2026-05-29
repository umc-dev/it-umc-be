import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function seedStudies() {
  console.log("Seeding studies...");

  for (let i = 0; i < 3; i++) {
    await prisma.study.create({
      data: {
        source: faker.internet.url(),
      },
    });
  }

  console.log("Studies seeded.");
}
