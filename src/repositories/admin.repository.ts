import type { AdminCreateDTO, AdminUpdateDTO } from "../types/admin.type";
import { removeUndefined } from "../utils/index";
import { db } from "../utils/prisma";

const adminRepository = {
  // Ambil semua admin
  async getAllAdmin(limit: number, page: number, search: string) {
    const skip = (page - 1) * limit;
    const whereClause = search
      ? {
          OR: [{ name: { contains: search } }, { email: { contains: search } }],
        }
      : {};

    // Pake Transaction biar konsisten kalo jalanin 2 kali query
    const [admins, total] = await db.$transaction([
      // 1. Query untuk mengambil data
      db.admin.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        where: whereClause,
      }),

      // 2. Query untuk menghitung total data
      db.admin.count({
        where: whereClause,
      }),
    ]);

    return {
      data: admins,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // Menambahkan admin
  async addAdmin(data: AdminCreateDTO) {
    return await db.admin.create({
      data: {
        email: data.email,
        name: data.name ?? null,
        password: data.password,
        avatar: data.avatar ?? null,
        updatedAt: new Date(),
      },
    });
  },

  // Ambil Admin berdasarkan email
  async getAdminByEmail(email: string) {
    return await db.admin.findUnique({
      where: { email },
    });
  },

  // Menghapus admin
  async deleteAdmin(id: string) {
    return await db.admin.delete({
      where: { id },
    });
  },

  // Update admin
  async updateAdmin(id: string, data: AdminUpdateDTO) {
    return await db.admin.update({
      where: { id },
      data: {
        ...removeUndefined(data),
        updatedAt: new Date(),
      },
    });
  },

  // Ambil admin berdasarkan id
  async getAdminById(id: string) {
    return await db.admin.findUnique({
      where: { id },
      include: {
        news: true, // include berita yang dibuat admin
      },
    });
  },
};

export default adminRepository;
