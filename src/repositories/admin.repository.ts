import type { AdminCreateDTO, AdminUpdateDTO } from "../types/admin.type.ts";
import { removeUndefined } from "../utils/index.ts";
import { db } from "../utils/prisma.ts";

const adminRepository = {
  // Ambil semua admin
  async getAllAdmin(limit: number, page: number) {
    const skip = (page - 1) * limit;

    return await db.admin.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
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
