import {
  CreateNewsData,
  CreateNewsDto,
  UpdateNewsDto,
} from "../types/news.type";
import { db } from "../utils/prisma";
import { removeUndefined } from "../utils";

export const newsRepository = {
  async add(data: CreateNewsData) {
    return await db.news.create({
      data,
    });
  },

  async getAll(limit: number, page: number, search: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? {
          OR: [
            {
              title: { contains: search, mode: "insensitive" },
            },
            {
              content: { contains: search, mode: "insensitive" },
            },
          ],
        }
      : {};

    // Pake Transaction biar konsisten kalo jalanin 2 kali query
    const [news, total] = await db.$transaction([
      // 1. Query untuk mengambil data
      db.news.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: whereClause,
        include: {
          category: true,
          admin: true,
        },
      }),

      // 2. Query untuk menghitung total data
      db.news.count({
        where: whereClause,
      }),
    ]);

    return {
      data: news,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getBySlug(slug: string) {
    return db.news.findUnique({
      where: { slug },
      include: { admin: true, category: true },
    });
  },

  async update(slug: string, data: UpdateNewsDto) {
    return await db.news.update({
      where: { slug },
      data: {
        ...removeUndefined(data),
      },
    });
  },

  async delete(slug: string) {
    return await db.news.delete({
      where: { slug },
    });
  },
};
