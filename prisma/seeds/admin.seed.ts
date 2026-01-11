import { PrismaClient, AdminRole } from "@prisma/client";
import { Faker, id_ID } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedAdmins() {
  const name = process.env.INITIAL_ADMIN_NAME;
  const email = process.env.INITIAL_ADMIN_EMAIL;

  const rawPassword = process.env.INITIAL_ADMIN_PASSWORD;

  // Cek jika email atau password kosong di .env
  if (!email || !rawPassword) {
    console.error(
      "❌ Error: INITIAL_ADMIN_EMAIL atau INITIAL_ADMIN_PASSWORD belum diset di .env",
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await prisma.admin.upsert({
    where: { email: email },
    update: {}, // Jika sudah ada, jangan timpa apapun
    create: {
      name,
      email,
      password: hashedPassword,
      role: AdminRole.SUPER_ADMIN,
    },
  });

  console.log("✅ Admin seeded:");
}
