import {
  AlumniResponse,
  PaginatedAlumniResponse,
  CreateAlumniData,
  UpdateAlumniData,
} from '../types/alumni.type';
import { removeUndefined } from '../utils';
import { db } from '../utils/prisma';

// Untuk mengubah photo menjadi null jika tidak ada
function toAlumniResponse(data: any): AlumniResponse {
  return {
    ...data,
    photo: data.photo ?? null,
  };
}

export const alumniRepository = {
  async add(data: CreateAlumniData): Promise<AlumniResponse> {
    const alumni = await db.alumni.create({
      data,
    });

    return toAlumniResponse(alumni);
  },

  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedAlumniResponse> {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? {
          OR: [
            ...(Number.isInteger(Number(search))
              ? [{ year: Number(search) }]
              : [{ name: { contains: search } }]),
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
      data: alumni.map(toAlumniResponse),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getAlumniById(id: string): Promise<AlumniResponse | null> {
    const alumni = await db.alumni.findUnique({
      where: { id },
    });

    return alumni ? toAlumniResponse(alumni) : null;
  },

  async update(id: string, data: UpdateAlumniData): Promise<AlumniResponse> {
    const alumni = await db.alumni.update({
      where: { id },
      data: {
        ...removeUndefined(data),
      },
    });

    return toAlumniResponse(alumni);
  },

  async delete(id: string): Promise<AlumniResponse> {
    const alumni = await db.alumni.delete({
      where: { id },
    });

    return toAlumniResponse(alumni);
  },
};
