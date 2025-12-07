import {
  CreateStatisticStudentData,
  UpdateStatisticStudentData,
} from '../types/statisticStudent.type';
import { db } from '../utils/prisma';
import { removeUndefined } from '../utils';

export const statisticStudentRepository = {
  async add(data: CreateStatisticStudentData) {
    return await db.statisticStudent.create({
      data,
    });
  },

  async getAll(limit: number, page: number, search: number) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? {
          OR: [
            {
              year: search,
            },
          ],
        }
      : {};

    const [statisticStudent, total] = await db.$transaction([
      db.statisticStudent.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        where: whereClause,
      }),

      db.statisticStudent.count({
        where: whereClause,
      }),
    ]);

    return {
      data: statisticStudent,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  getByYear(year: number) {
    return db.statisticStudent.findUnique({
      where: { year },
    });
  },

  async update(year: number, data: UpdateStatisticStudentData) {
    return await db.statisticStudent.update({
      where: { year },
      data: removeUndefined(data),
    });
  },

  async delete(year: number) {
    return await db.statisticStudent.delete({
      where: { year },
    });
  },
};
