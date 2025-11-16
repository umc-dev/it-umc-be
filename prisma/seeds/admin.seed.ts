import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedAdmins() {
  const totalAdmins = 50;

  const adminsData = await Promise.all(
    Array.from({ length: totalAdmins }).map(async () => ({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: await bcrypt.hash(faker.internet.password(), 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  );

  await prisma.admin.createMany({
    data: adminsData,
  });

  console.log(`${totalAdmins} admins created.`);
}
