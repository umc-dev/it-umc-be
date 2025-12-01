import { PrismaClient } from "@prisma/client";
import { Faker, id_ID } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedAdmins() {
  // Total data
  const totalAdmins = 1;

  // Faker Bahasa Indonesia
  const fakerID = new Faker({ locale: [id_ID] });

  const adminsData = await Promise.all(
    Array.from({ length: totalAdmins }).map(async () => ({
      name: fakerID.person.fullName(),
      email: "admin@mail.com",
      password: await bcrypt.hash("cirebon321", 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  );

  await prisma.admin.createMany({
    data: adminsData,
  });

  console.log(`${totalAdmins} admins created.`);
}
