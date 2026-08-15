import { AccreditationCategory, Prodi } from "@prisma/client";
import {
  CreateAccreditationData,
  UpdateAccreditationData,
} from "../types/accreditation.type";
import { removeUndefined } from "../utils";
import { db } from "../utils/prisma";

const accreditationRepository = {
  async create(data: CreateAccreditationData) {
    return await db.accreditation.create({ data });
  },

  async getAll(
    limit: number,
    page: number,
    search: string,
    category?: AccreditationCategory,
    prodi?: Prodi,
  ) {
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { skNumber: { contains: search } },
        { grade: { contains: search } },
        { institution: { contains: search } },
      ];
    }

    if (category) {
      whereClause.category = category;
    }

    if (prodi) {
      whereClause.prodi = prodi;
    }

    const [accreditations, total] = await db.$transaction([
      db.accreditation.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: whereClause,
      }),

      db.accreditation.count({
        where: whereClause,
      }),
    ]);

    return {
      data: accreditations,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string) {
    return db.accreditation.findUnique({
      where: { id },
    });
  },

  async update(id: string, data: UpdateAccreditationData) {
    return await db.accreditation.update({
      where: { id },
      data: {
        ...removeUndefined(data),
      },
    });
  },

  async delete(id: string) {
    return await db.accreditation.delete({
      where: { id },
    });
  },
};

export default accreditationRepository;
