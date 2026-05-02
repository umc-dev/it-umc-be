import {
  CreateDosenTridharmaData,
  UpdateDosenTridharmaData,
} from '../types/dosenTridharma.type';
import { removeUndefined } from '../utils';
import { db } from '../utils/prisma';

export const dosenTridharmaRepository = {
  async add(data: CreateDosenTridharmaData) {
    return await db.dosenTridharma.create({
      data,
    });
  },

  async getAll(limit: number, page: number, search: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? {
          OR: [
            {
              title: { contains: search },
            },
          ],
        }
      : {};

    const [dosenTridharma, total] = await db.$transaction([
      db.dosenTridharma.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        where: whereClause,
      }),

      db.dosenTridharma.count({
        where: whereClause,
      }),
    ]);

    return {
      data: dosenTridharma,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: number) {
    return db.dosenTridharma.findUnique({
      where: { id },
      include: { dosen: true },
    });
  },

  async update(id: number, data: UpdateDosenTridharmaData) {
    return await db.dosenTridharma.update({
      where: { id },
      data: {
        ...removeUndefined(data),
      },
    });
  },

  async delete(id: number) {
    return db.dosenTridharma.delete({
      where: { id },
    });
  },
};
