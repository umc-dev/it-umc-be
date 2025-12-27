import { PrismaClient, AdminRole } from "@prisma/client";
import { Faker, id_ID } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedAdmins() {
  const fakerID = new Faker({ locale: [id_ID] });

  const password = await bcrypt.hash("cirebon321", 10);

  const adminsData = [
    {
      name: fakerID.person.fullName(),
      email: "superadmin@mail.com",
      password,
      role: AdminRole.SUPER_ADMIN,
    },
    {
      name: fakerID.person.fullName(),
      email: "admin@mail.com",
      password,
      role: AdminRole.ADMIN,
    },
    {
      name: fakerID.person.fullName(),
      email: "editor@mail.com",
      password,
      role: AdminRole.EDITOR,
    },
  ];

  await prisma.admin.createMany({
    data: adminsData,
    skipDuplicates: true, // aman kalau seed dijalankan ulang
  });

  console.log("✅ Admin seeded:");
  console.log("- superadmin@mail.com (SUPER_ADMIN)");
  console.log("- admin@mail.com (ADMIN)");
  console.log("- editor@mail.com (EDITOR)");
}
