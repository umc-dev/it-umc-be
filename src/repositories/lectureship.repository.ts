import { CreateLectureshipData, UpdateLectureshipData } from '../types/lectureship.type';
import { removeUndefined } from '../utils';
import { db } from '../utils/prisma';

export const lectureshipRepository = {
  async add(data: CreateLectureshipData) {
    return await db.lectureship.create({
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

    const [lectureship, total] = await db.$transaction([
      db.lectureship.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        where: whereClause,
      }),

      db.lectureship.count({
        where: whereClause,
      }),
    ]);

    return {
      data: lectureship,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: number) {
    return db.lectureship.findUnique({
      where: { id },
      include: {
        dosen: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  },

  async update(id: number, data: UpdateLectureshipData) {
    return await db.lectureship.update({
      where: { id },
      data: {
        ...removeUndefined(data),
      },
    });
  },

  async delete(id: number) {
    return db.lectureship.delete({
      where: { id },
    });
  },
};
