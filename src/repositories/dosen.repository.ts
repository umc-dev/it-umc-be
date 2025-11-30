import { CreateDosenData, UpdateDosenData } from "../types/dosen.type";
import { removeUndefined } from "../utils";
import { db } from "../utils/prisma";

export const dosenRepository = {
  async create(data: CreateDosenData) {
    return await db.dosen.create({ data });
  },

  async update(id: string, data: UpdateDosenData) {
    return await db.dosen.update({
      where: { id },
      data: {
        ...removeUndefined(data),
      },
    });
  },

  async getAll(limit: number, page: number, search: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? {
          OR: [
            {
              name: { contains: search, mode: "insensitive" },
            },
            {
              expertise: { contains: search, mode: "insensitive" },
            },
          ],
        }
      : {};

    // Pake Transaction biar konsisten kalo jalanin 2 kali query
    const [dosen, total] = await db.$transaction([
      // 1. Query untuk ambil data
      db.dosen.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: whereClause,
      }),

      // 2. Query untuk hitung total data
      db.dosen.count({
        where: whereClause,
      }),
    ]);

    return {
      data: dosen,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string) {
    return db.dosen.findUnique({
      where: { id },
    });
  },

  async delete(id: string) {
    return db.dosen.delete({
      where: { id },
    });
  },
};
