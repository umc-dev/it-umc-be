import {
  CreateAlumniData,
  UpdateAlumniData,
} from '../types/alumni.type';
import { removeUndefined } from '../utils';
import { db } from '../utils/prisma';

export const alumniRepository = {
  async add(data: CreateAlumniData) {
    return await db.alumni.create({
      data,
    });
  },

  async getAll(limit: number, page: number, search: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? {
          OR: [
            ...(Number.isInteger(Number(search))
              ? [{ year: Number(search) }]
              : [{ name: { contains: search, mode: 'insensitive' } }]),
          ],
        }
      : {};

    const [alumni, total] = await db.$transaction([
      db.alumni.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        where: whereClause,
      }),

      db.alumni.count({
        where: whereClause,
      }),
    ]);

    return {
      data: alumni,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getAlumniById(id: string) {
    return await db.alumni.findUnique({
      where: { id },
    });
  },

  async update(id: string, data: UpdateAlumniData) {
    return await db.alumni.update({
      where: { id },
      data: {
        ...removeUndefined(data),
      },
    });
  },

  async delete(id: string) {
    return db.alumni.delete({
      where: { id },
    });
  },
};