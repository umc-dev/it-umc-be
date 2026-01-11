import {
  CreateStudyData,
  UpdateStudyData,
} from '../types/study.type';
import { db } from '../utils/prisma';
import { removeUndefined } from '../utils';

export const studyRepository = {
  async add(data: CreateStudyData) {
    return await db.study.create({
      data,
    });
  },

  async getAll(limit: number, page: number, search: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? {
          OR: [
            {
              source: search,
            },
          ],
        }
      : {};

    const [study, total] = await db.$transaction([
      db.study.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        where: whereClause,
      }),

      db.study.count({
        where: whereClause,
      }),
    ]);

    return {
      data: study,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  getById(id: number) {
    return db.study.findUnique({
      where: { id },
    });
  },

  async update(id: number, data: UpdateStudyData) {
    return await db.study.update({
      where: { id },
      data: removeUndefined(data),
    });
  },

  async delete(id: number) {
    return await db.study.delete({
      where: { id },
    });
  },
};
