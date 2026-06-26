import { PrismaClient, DosenTridharmaCategory } from "@prisma/client";
import { Faker, id_ID, faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedDosen() {
  console.log("Seeding dosen, positions, and tridharma...");

  const fakerID = new Faker({ locale: [id_ID] });

  // Get lectureships
  const lectureships = await prisma.lectureship.findMany();
  if (lectureships.length === 0) {
    console.log("Lectureships must be seeded first!");
    return;
  }

  const expertises = [
    "Kecerdasan Buatan & Data Science",
    "Rekayasa Perangkat Lunak & Mobile Dev",
    "Keamanan Jaringan & Cloud Computing",
    "Sistem Informasi & E-Business",
    "Interaksi Manusia dan Komputer",
  ];

  const subjects = [
    "Pemrograman Web, Kecerdasan Buatan, Struktur Data",
    "Rekayasa Perangkat Lunak, Basis Data, Pemrograman Berorientasi Objek",
    "Jaringan Komputer, Keamanan Sistem, Sistem Operasi",
    "Analisis Desain Sistem, Sistem Informasi Manajemen, Technopreneurship",
  ];

  const totalDosen = 6;
  const defaultPasswordHash = await bcrypt.hash("dosen123", 10);

  for (let i = 0; i < totalDosen; i++) {
    const prodi = i % 2 === 0 ? "S1" : "D3";
    const nidn = faker.string.numeric(10);
    const name = fakerID.person.fullName();
    const email = faker.internet.email({ firstName: name.split(" ")[0].toLowerCase() });
    const expertise = expertises[i % expertises.length];
    const teaching = subjects[i % subjects.length];
    const research = `Penelitian tentang ${faker.lorem.sentence(4)}`;
    const photo = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
    const education = `S1 Informatika Universitas Muhammadiyah Cirebon, S2 Ilmu Komputer ${faker.helpers.arrayElement(["Institut Teknologi Bandung", "Universitas Gadjah Mada", "Universitas Indonesia"])}`;
    const description = `Dosen tetap dengan keahlian di bidang ${expertise}. Aktif mengajar dan melakukan publikasi ilmiah tingkat nasional maupun internasional.`;
    
    // Create admin account for Dosen
    await prisma.admin.create({
      data: {
        name,
        email,
        password: defaultPasswordHash,
        role: "DOSEN",
        avatar: photo,
      },
    });

    // Create dosen
    const dosen = await prisma.dosen.create({
      data: {
        prodi,
        nidn,
        name,
        email,
        expertise,
        photo,
        teaching,
        research,
        education,
        description,
      },
    });

    // Create DosenLectureship
    const randomLectureship = lectureships[faker.number.int({ min: 0, max: lectureships.length - 1 })];
    await prisma.dosenLectureship.create({
      data: {
        dosenId: dosen.id,
        lectureshipId: randomLectureship.id,
        startDate: faker.date.past({ years: 5 }),
        endDate: faker.helpers.arrayElement([null, faker.date.future()]),
      },
    });

    // Create DosenTridharma
    const categories: DosenTridharmaCategory[] = ["PENGAJARAN", "PENELITIAN", "PENGABDIAN"];
    for (const category of categories) {
      await prisma.dosenTridharma.create({
        data: {
          dosenId: dosen.id,
          category,
          title: `Tridharma ${category} - ${faker.lorem.sentence(3)}`,
          year: faker.number.int({ min: 2020, max: 2026 }),
          description: faker.lorem.paragraph(1),
          link: faker.internet.url(),
        },
      });
    }
  }

  console.log(`${totalDosen} dosen with positions and tridharma records seeded.`);
}
