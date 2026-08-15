import {
  CreatePartnershipData,
  UpdatePartnershipData,
} from "../types/partnerships.type";
import { removeUndefined } from "../utils";
import { db } from "../utils/prisma";

const partnershipsRepository = {
  async create(data: CreatePartnershipData) {
    return await db.partnership.create({
      data,
      include: {
        files: true,
      },
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

    const [partnerships, total] = await db.$transaction([
      db.partnership.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: whereClause,
        include: {
          files: true,
        },
      }),

      db.partnership.count({
        where: whereClause,
      }),
    ]);

    return {
      data: partnerships,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string) {
    return db.partnership.findUnique({
      where: { id },
      include: {
        files: true,
      },
    });
  },

  async update(
    id: string,
    data: UpdatePartnershipData,
    newFiles?: { fileName: string; fileUrl: string; fileType?: string }[],
    deleteFileIds?: string[],
  ) {
    return await db.partnership.update({
      where: { id },
      data: {
        ...removeUndefined(data),
        ...(newFiles && newFiles.length > 0 && {
          files: {
            create: newFiles,
          },
        }),
      },
      include: {
        files: true,
      },
    });
  },

  async deleteFilesByIds(fileIds: string[]) {
    return await db.partnershipFile.deleteMany({
      where: {
        id: {
          in: fileIds,
        },
      },
    });
  },

  async getFilesByIds(fileIds: string[]) {
    return await db.partnershipFile.findMany({
      where: {
        id: {
          in: fileIds,
        },
      },
    });
  },

  async delete(id: string) {
    return await db.partnership.delete({
      where: { id },
      include: {
        files: true,
      },
    });
  },
};

export default partnershipsRepository;
