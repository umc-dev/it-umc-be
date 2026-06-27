import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedOrganizationalStructure() {
  console.log("Seeding organizational structure...");

  // Seed for S1
  const existingS1 = await prisma.organizationalStructure.findUnique({
    where: { prodi: 'S1' },
  });
  if (!existingS1) {
    await prisma.organizationalStructure.create({
      data: {
        prodi: 'S1',
        image: "https://api.dicebear.com/7.x/initials/svg?seed=OrgChartS1",
        description: "Struktur Organisasi Program Studi S1 Teknik Informatika Universitas Muhammadiyah Cirebon periode 2024-2028.",
      },
    });
  }

  // Seed for D3
  const existingD3 = await prisma.organizationalStructure.findUnique({
    where: { prodi: 'D3' },
  });
  if (!existingD3) {
    await prisma.organizationalStructure.create({
      data: {
        prodi: 'D3',
        image: "https://api.dicebear.com/7.x/initials/svg?seed=OrgChartD3",
        description: "Struktur Organisasi Program Studi D3 Teknik Informatika Universitas Muhammadiyah Cirebon periode 2024-2028.",
      },
    });
  }

  console.log("Organizational structure seeded.");
}
