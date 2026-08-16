import {
  CreateNewsData,
  NewsStatus,
  UpdateNewsData,
} from "../types/news.type";
import { db } from "../utils/prisma";
import { removeUndefined } from "../utils";

export const newsRepository = {
  async add(data: CreateNewsData) {
    return await db.news.create({
      data,
    });
  },

  async getAll(
    limit: number,
    page: number,
    search: string,
    category?: string,
    authorId?: string,
    status?: NewsStatus,
  ) {
    const skip = (page - 1) * limit;
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
      ];
    }

    if (category) {
      whereClause.category = { slug: category };
    }

    if (authorId) {
      whereClause.authorId = authorId;
    }

    if (status) {
      whereClause.status = status;
    }

    const [news, total] = await db.$transaction([
      db.news.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        where: whereClause,
        include: { category: true, admin: true },
      }),

      db.news.count({ where: whereClause }),
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

  async update(slug: string, data: UpdateNewsData) {
    return await db.news.update({
      where: { slug },
      data: { ...removeUndefined(data) },
    });
  },

  async approveOrReject(slug: string, status: NewsStatus) {
    return await db.news.update({
      where: { slug },
      data: { status },
    });
  },

  async delete(slug: string) {
    return await db.news.delete({
      where: { slug },
    });
  },
};
