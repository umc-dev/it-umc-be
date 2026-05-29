import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function seedPartnerships() {
  console.log("Seeding partnerships...");

  const partners = [
    { name: "PT. Telekomunikasi Indonesia", logo: "https://api.dicebear.com/7.x/initials/svg?seed=Telkom" },
    { name: "Google Indonesia", logo: "https://api.dicebear.com/7.x/initials/svg?seed=Google" },
    { name: "Microsoft Indonesia", logo: "https://api.dicebear.com/7.x/initials/svg?seed=Microsoft" },
    { name: "PT. Tokopedia", logo: "https://api.dicebear.com/7.x/initials/svg?seed=Tokopedia" },
    { name: "PT. Bukalapak", logo: "https://api.dicebear.com/7.x/initials/svg?seed=Bukalapak" },
  ];

  for (const partner of partners) {
    await prisma.partnership.create({
      data: {
        name: partner.name,
        photo: partner.logo,
        startDate: faker.date.past({ years: 2 }),
        endDate: faker.date.future({ years: 3 }),
      },
    });
  }

  console.log("Partnerships seeded.");
}
