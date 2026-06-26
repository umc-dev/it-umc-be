import { PrismaClient } from '@prisma/client';
import { Faker, id_ID, faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedVisionMission() {
  // Total data yang ingin dibuat
  const totalVisionMission = 3;

  // Faker Bahasa Indonesia
  const fakerID = new Faker({ locale: [id_ID] });

  const visionMissionData = [
    {
      prodi: "S1" as const,
      vision: "Menjadi Program Studi Informatika yang unggul dan inovatif dalam menghasilkan lulusan berintegritas di tingkat nasional pada tahun 2030.",
      mission: "1. Menyelenggarakan pendidikan Informatika berkualitas.\n2. Melaksanakan penelitian inovatif bidang ilmu komputer.\n3. Melakukan pengabdian kepada masyarakat yang berdampak nyata.",
    },
    {
      prodi: "D3" as const,
      vision: "Menjadi Program Studi Diploma 3 Komputerisasi Akuntansi yang unggul dalam mencetak ahli madya akuntansi berbasis teknologi informasi pada tahun 2030.",
      mission: "1. Menyelenggarakan pendidikan vokasi bidang komputerisasi akuntansi.\n2. Mengembangkan program pengabdian masyarakat berbasis teknologi akuntansi.\n3. Menjalin kerja sama industri untuk kesiapan kerja lulusan.",
    }
  ];

  await prisma.visionMission.createMany({
    data: visionMissionData,
    skipDuplicates: true,
  });

  console.log(`${totalVisionMission} vision-mission created.`);
}
