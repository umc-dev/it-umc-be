import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedOrganizationalStructure() {
  console.log("Seeding organizational structure...");

  const existing = await prisma.organizationalStructure.findFirst();
  if (!existing) {
    await prisma.organizationalStructure.create({
      data: {
        image: "https://api.dicebear.com/7.x/initials/svg?seed=OrgChart",
        description: "Struktur Organisasi Program Studi Teknik Informatika Universitas Muhammadiyah Cirebon periode 2024-2028.",
      },
    });
  }

  console.log("Organizational structure seeded.");
}
