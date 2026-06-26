import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function seedAchievements() {
  console.log("Seeding achievements...");

  const achievements = [
    {
      prodi: "S1" as const,
      name: "Juara 1 Gemastik Bidang Keamanan Siber",
      achievementName: "Gemastik XVII 2024",
      link: "https://gemastik.kemdikbud.go.id",
    },
    {
      prodi: "D3" as const,
      name: "Juara 2 Hackathon Nasional UI/UX Design",
      achievementName: "HackFest UMC 2025",
      link: "https://hackfest.umc.ac.id",
    },
    {
      prodi: "S1" as const,
      name: "Best Paper Award on International Conference on IT",
      achievementName: "ICIT 2024",
      link: "https://ieee.org/icit-2024",
    },
  ];

  for (const item of achievements) {
    await prisma.achievement.create({
      data: {
        prodi: item.prodi,
        name: item.name,
        achievementName: item.achievementName,
        link: item.link,
        achievedAt: faker.date.past({ years: 1 }),
      },
    });
  }

  console.log("Achievements seeded.");
}
