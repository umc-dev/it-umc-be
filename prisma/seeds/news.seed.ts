import { PrismaClient } from "@prisma/client";
import { Faker, id_ID } from "@faker-js/faker";
import slugify from "slugify";

const prisma = new PrismaClient();

export async function seedNews() {
  // Total data yang ingin dibuat
  const totalNews = 5;

  // Faker Bahasa Indonesia
  const fakerID = new Faker({ locale: [id_ID] });

  // Cek admin & category (pakai yang pertama)
  const admin = await prisma.admin.findFirst();
  // const category = await prisma.category.findFirst();
  const category = { id: "12", name: "Lorem" };

  if (!admin || !category) {
    console.log("Admin atau Category belum ada. Seed dibatalkan.");
    return;
  }

  const newsData = await Promise.all(
    Array.from({ length: totalNews }).map(async () => {
      const title = fakerID.lorem.sentence(6);
      const slug = slugify(title, { lower: true, strict: true });

      return {
        title,
        content: fakerID.lorem.paragraphs(3),
        authorId: admin.id,
        thumbnail: fakerID.image.urlLoremFlickr({ category: "news" }),
        slug,
        categoryId: category.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }),
  );

  await prisma.news.createMany({
    data: newsData,
  });

  console.log(`${totalNews} news created.`);
}
