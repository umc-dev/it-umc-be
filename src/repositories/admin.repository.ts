import BadRequestException from "../exceptions/BadRequestException";
import NotFoundException from "../exceptions/NotFoundException";
import type {
  AdminCreateData,
  AdminCreateDTO,
  AdminUpdateDTO,
} from "../types/admin.type";
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
  async addAdmin(data: AdminCreateData) {
    // Memulai transaction untuk memastikan konsistensi
    return await db.$transaction(async (tx) => {
      // 1. Buat akun admin
      const admin = await tx.admin.create({
        data: {
          email: data.email,
          name: data.name ?? null,
          password: data.password,
          avatar: data.avatar,
          role: data.role,
          updatedAt: new Date(),
        },
      });

      // 2. Cek jika role adalah DOSEN
      if (data.role === 'DOSEN') {
        // Buat data dosen secara sinkron
        await tx.dosen.create({
          data: {
            nidn: `TEMP-${Date.now()}`,
            name: data.name,
            email: data.email,
            expertise: '-',
            research: '-',
            teaching: '-',
            photo: data.avatar ?? '',
          },
        });
      }

      return admin;
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
    return await db.$transaction(async (tx) => {
      // Ambil data admin lama
      const existingAdmin = await tx.admin.findUnique({
        where: { id },
      });

      if (!existingAdmin) {
        throw new NotFoundException('Admin not found');
      }

      const updatedAdmin = await tx.admin.update({
        where: { id },
        data: {
          ...removeUndefined(data),
          updatedAt: new Date(),
        },
      });

      const oldRole = existingAdmin.role;
      const newRole = data.role ?? oldRole;

      // Selain dosen -> DOSEN
      if (oldRole !== 'DOSEN' && newRole === 'DOSEN') {
        const existingDosen = await tx.dosen.findUnique({
          where: {
            email: existingAdmin.email,
          },
        });

        if (!existingDosen) {
          await tx.dosen.create({
            data: {
              nidn: `TEMP-${Date.now()}`,
              name: updatedAdmin.name ?? '',
              email: updatedAdmin.email,
              expertise: '-',
              research: '-',
              teaching: '-',
              photo: updatedAdmin.avatar ?? '',
            },
          });
        } else {
          throw new BadRequestException ('Dosen already exist')
        }
      }

      // DOSEN -> selain DOSEN
      if (oldRole === 'DOSEN' && newRole !== 'DOSEN') {
        await tx.dosen.deleteMany({
          where: {
            email: existingAdmin.email,
          },
        });
      }

      return updatedAdmin;
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
