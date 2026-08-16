import NotFoundException from "../exceptions/NotFoundException";
import { 
  // CreateDosenData,
  UpdateDosenData 
} from "../types/dosen.type";
import { removeUndefined } from "../utils";
import { db } from "../utils/prisma";

export const dosenRepository = {
  // async create(data: CreateDosenData) {
  //   return await db.dosen.create({
  //     data,
  //     include: {
  //       positions: {
  //         orderBy: {
  //           startDate: "desc",
  //         },
  //         include: {
  //           lectureship: {
  //             select: { id: true, name: true },
  //           },
  //         },
  //       },
  //     },
  //   });
  // },

  async update(id: string, data: UpdateDosenData) {
    // return await db.dosen.update({
    //   where: { id },
    //   data: {
    //     ...removeUndefined(data),
    //   },
    //   include: {
    //     positions: {
    //       orderBy: {
    //         startDate: "desc",
    //       },
    //       include: {
    //         lectureship: {
    //           select: { id: true, name: true },
    //         },
    //       },
    //     },
    //     dosenTridharmas: {
    //       orderBy: {
    //         createdAt: 'desc',
    //       },
    //     },
    //   },
    // });

    return await db.$transaction(async (tx) => {
      // Ambil data dosen lama
      const dosen = await tx.dosen.findUnique({
        where: { id },
        select: {
          email: true,
        },
      });

      if (!dosen) {
        throw new NotFoundException('Dosen not found');
      }

      // Update dosen
      const updatedDosen = await tx.dosen.update({
        where: { id },
        data: {
          ...removeUndefined(data),
        },
        include: {
          positions: {
            orderBy: {
              startDate: 'desc',
            },
            include: {
              lectureship: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          dosenTridharmas: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

      // Sinkronkan ke admin
      await tx.admin.update({
        where: {
          email: dosen.email,
        },
        data: {
          ...(data.name && {
            name: data.name,
          }),
          ...(data.photo && {
            avatar: data.photo,
          }),
        },
      });

      return updatedDosen;
    });
  },

  async getAll(limit: number, page: number, search: string, prodi?: 'S1' | 'D3', emailFilter?: string) {
    const skip = (page - 1) * limit;
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        {
          name: { contains: search, mode: "insensitive" },
        },
        {
          expertise: { contains: search, mode: "insensitive" },
        },
      ];
    }

    if (prodi) {
      whereClause.prodi = prodi;
    }

    // If emailFilter is provided, scope to only this dosen
    if (emailFilter) {
      whereClause.email = emailFilter;
    }

    // Pake Transaction biar konsisten kalo jalanin 2 kali query
    const [dosen, total] = await db.$transaction([
      // 1. Query untuk ambil data
      db.dosen.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: whereClause,
        include: {
          positions: {
            orderBy: {
              startDate: "desc",
            },
            include: {
              lectureship: {
                select: { id: true, name: true },
              },
            },
          },
          dosenTridharmas: {
            orderBy: {
              createdAt: "desc", 
            },
          },
        },
      }),

      // 2. Query untuk hitung total data
      db.dosen.count({
        where: whereClause,
      }),
    ]);

    return {
      data: dosen,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string) {
    return db.dosen.findUnique({
      where: { id },
      include: {
        positions: {
          orderBy: {
            startDate: 'desc',
          },
          include: {
            lectureship: {
              select: { id: true, name: true },
            },
          },
        },
        dosenTridharmas: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  },

  // async delete(id: string) {
  //   return db.dosen.delete({
  //     where: { id },
  //     include: {
  //       positions: {
  //         orderBy: {
  //           startDate: "desc",
  //         },
  //         include: {
  //           lectureship: {
  //             select: { id: true, name: true },
  //           },
  //         },
  //       },
  //     },
  //   });
  // },
};
