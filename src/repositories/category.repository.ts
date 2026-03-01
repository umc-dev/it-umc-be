import { CreateCategoryData, UpdateCategoryData } from "../types/category.type";
import { removeUndefined } from "../utils";
import { db } from "../utils/prisma";

export const categoryRepository = {
  async add(data: CreateCategoryData) {
    return await db.category.create({
      data,
    });
  },

  async getAll(limit: number, page: number, search: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? {
          OR: [{ name: { contains: search } }],
        }
      : {};

    const [categories, total] = await db.$transaction([
      db.category.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: whereClause,
      }),

      db.category.count({
        where: whereClause,
      }),
    ]);

    return {
      data: categories,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // async getById(id: string) {
  //   return await db.category.findUnique({
  //     where: { id },
  //     include: {
  //       news: true,
  //     },
  //   });
  // },

  async getBySlug(slug: string) {
    return await db.category.findUnique({
      where: { slug },
      include: {
        news: {
          include: {
            admin: true,
            category: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  },

  async getByName(name: string) {
    return await db.category.findUnique({
      where: { name },
    });
  },

  async update(slug: string, data: UpdateCategoryData) {
    return await db.category.update({
      where: { slug },
      data: {
        ...removeUndefined(data),
      },
    });
  },
  // data.name.toLowerCase().replace(/\s+/g, '-');

  async delete(slug: string) {
    return await db.category.delete({
      where: { slug },
    });
  },
};
