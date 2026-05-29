import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function seedFacilities() {
  console.log("Seeding facilities...");

  const facilities = [
    {
      name: "Laboratorium Rekayasa Perangkat Lunak",
      description: "Laboratorium yang dilengkapi dengan komputer spesifikasi tinggi untuk pengembangan aplikasi desktop, web, dan mobile.",
      photo: "https://api.dicebear.com/7.x/initials/svg?seed=RPL",
    },
    {
      name: "Laboratorium Jaringan & Keamanan",
      description: "Laboratorium praktek jaringan, administrasi server, keamanan siber, dilengkapi dengan perangkat router Cisco dan switch terkelola.",
      photo: "https://api.dicebear.com/7.x/initials/svg?seed=Jaringan",
    },
    {
      name: "Perpustakaan Fakultas TI",
      description: "Perpustakaan dengan ribuan koleksi buku cetak, jurnal ilmiah, e-book, dan ruang baca ber-AC yang nyaman.",
      photo: "https://api.dicebear.com/7.x/initials/svg?seed=Perpus",
    },
  ];

  for (const item of facilities) {
    await prisma.facility.create({
      data: {
        name: item.name,
        description: item.description,
        photo: item.photo,
      },
    });
  }

  console.log("Facilities seeded.");
}
