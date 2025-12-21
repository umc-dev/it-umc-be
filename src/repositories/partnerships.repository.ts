import {
  CreatePartnershipData,
  UpdatePartnershipDto,
} from "../types/partnerships.type";
import { removeUndefined } from "../utils";
import { db } from "../utils/prisma";

const partnershipsRepository = {
  async create(data: CreatePartnershipData) {
    return await db.partnership.create({ data });
  },

  async getAll(limit: number, page: number, search: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? {
          OR: [
            {
              name: { contains: search },
            },
          ],
        }
      : {};

    // Pake Transaction biar konsisten kalo jalanin 2 kali query
    const [partnerships, total] = await db.$transaction([
      // 1. Query untuk mengambil data
      db.partnership.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: whereClause,
      }),

      // 2. Query untuk menghitung total data
      db.partnership.count({
        where: whereClause,
      }),
    ]);

    return {
      data: partnerships,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string) {
    return db.partnership.findUnique({
      where: { id },
    });
  },

  async update(id: string, data: UpdatePartnershipDto) {
    return await db.partnership.update({
      where: { id },
      data: {
        ...removeUndefined(data),
      },
    });
  },

  async delete(id: string) {
    return await db.partnership.delete({
      where: { id },
    });
  },
};

export default partnershipsRepository;
