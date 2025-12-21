import { CreateVisionMissionData, UpdateVisionMissionData } from '../types/visionMission.type';
import { removeUndefined } from '../utils';
import { db } from '../utils/prisma';

export const visionMissionRepository = {
  async add(data: CreateVisionMissionData) {
    return await db.visionMission.create({
      data,
    });
  },

  async getAll(limit: number, page: number, search: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? {
          OR: [
            {
              vision: { contains: search },
            },
            {
              mission: { contains: search },
            },
          ],
        }
      : {};

    const [visionMission, total] = await db.$transaction([
      db.visionMission.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        where: whereClause,
      }),

      db.visionMission.count({
        where: whereClause,
      }),
    ]);

    return {
      data: visionMission,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: number) {
    return db.visionMission.findUnique({
      where: { id },
    });
  },

  async update(id: number, data: UpdateVisionMissionData) {
    return await db.visionMission.update({
      where: { id },
      data: {
        ...removeUndefined(data),
      },
    });
  },

  async delete(id: number) {
    return db.visionMission.delete({
      where: { id },
    });
  },
};
