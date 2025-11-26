import { CategoryCreateDTO, CategoryUpdateDTO } from "../types/category.type";
import { removeUndefined } from "../utils";
import { db } from "../utils/prisma";

const categoryRepository = {
  async getAllCategory(limit: number, page: number, search: string) {
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

  async addCategory(data: CategoryCreateDTO) {
    return await db.category.create({
      data: {
        name: data.name,
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        updatedAt: new Date(),
      }
    })
  },

  async getCategoryByName(name: string) {
    return await db.category.findUnique({
      where: { name },
    });
  },

  async deleteCategory(id: string) {
    return await db.category.delete({
      where: { id },
    });
  },

  async updateCategory(id: string, data: CategoryUpdateDTO) {
    return await db.category.update({
      where: { id },
      data: {
        ...removeUndefined(data),
        updatedAt: new Date(),
      },
    });
  },

  async getCategoryById(id: string) {
    return await db.category.findUnique({
      where: { id },
      include: {
        news: true,
      },
    });
  },
}

export default categoryRepository;