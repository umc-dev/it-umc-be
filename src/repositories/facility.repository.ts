import { CreateFacilityData, UpdateFacilityData } from '../types/facility.type';
import { removeUndefined } from '../utils';
import { db } from '../utils/prisma';

export const facilityRepository = {
  async add(data: CreateFacilityData) {
    return await db.facility.create({
      data,
    });
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

    const [facility, total] = await db.$transaction([
      db.facility.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        where: whereClause,
      }),

      db.facility.count({
        where: whereClause,
      }),
    ]);

    return {
      data: facility,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: number) {
    return db.facility.findUnique({
      where: { id },
    });
  },

  async update(id: number, data: UpdateFacilityData) {
    return await db.facility.update({
      where: { id },
      data: {
        ...removeUndefined(data),
      },
    });
  },

  async delete(id: number) {
    return db.facility.delete({
      where: { id },
    });
  },
};
