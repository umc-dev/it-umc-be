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

  async getAll(limit: number, page: number, search?: string, prodi?: 'S1' | 'D3') {
    const skip = (page - 1) * limit;
    const whereClause: any = {};

    if (search) {
      const searchNum = Number(search);
      if (!Number.isNaN(searchNum)) {
        whereClause.year = searchNum;
      }
    }

    if (prodi) {
      whereClause.prodi = prodi;
    }

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

  getById(id: string) {
    return db.statisticStudent.findUnique({
      where: { id },
    });
  },

  getByYearAndProdi(year: number, prodi: 'S1' | 'D3') {
    return db.statisticStudent.findUnique({
      where: {
        year_prodi: { year, prodi },
      },
    });
  },

  async update(id: string, data: UpdateStatisticStudentData) {
    return await db.statisticStudent.update({
      where: { id },
      data: removeUndefined(data),
    });
  },

  async delete(id: string) {
    return await db.statisticStudent.delete({
      where: { id },
    });
  },
};
