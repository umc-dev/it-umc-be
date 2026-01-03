import type {
  AdminResponse,
  AdminWithNewsResponse,
  AdminCreateDTO,
  AdminUpdateDTO,
  PaginatedAdminResponse,
  AdminUpdateData,
  AdminCreateData,
} from "../types/admin.type";
import adminRepository from "../repositories/admin.repository";
import NotFoundException from "../exceptions/NotFoundException";
import { hashPassword } from "../utils/password";
import BadRequestException from "../exceptions/BadRequestException";
import { da } from "zod/v4/locales";
import { deleteUploadedFile, saveUploadedFile } from "../utils/file";

// Mapping ke admin response tanpa Password
const mapToAdminResponse = (admin: any): AdminResponse => {
  if (!admin) return null as any;

  const { password, ...safe } = admin;
  return safe;
};

// Mapping ke admin with news response tanpa Password
const mapToAdminWithNewsResponse = (admin: any): AdminWithNewsResponse => {
  if (!admin) return null as any;

  const { password, ...safe } = admin;
  return safe;
};

const adminService = {
  // Ambil semua admin
  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedAdminResponse> {
    const paginatedResult = await adminRepository.getAllAdmin(
      limit,
      page,
      search,
    );

    const safeAdmins = paginatedResult.data.map(mapToAdminResponse);

    return {
      data: safeAdmins,
      meta: paginatedResult.meta,
    };
  },

  // Ambil admin berdasarkan id
  async getById(id: string): Promise<AdminWithNewsResponse | null> {
    const admin = await adminRepository.getAdminById(id);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    return mapToAdminWithNewsResponse(admin);
  },

  // Ambil admin berdasarkan email
  async getByEmail(email: string): Promise<AdminResponse | null> {
    const admin = await adminRepository.getAdminByEmail(email);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    return mapToAdminWithNewsResponse(admin);
  },

  // Menambahkan admin
  async create(
    data: AdminCreateDTO,
    file?: Express.Multer.File,
  ): Promise<AdminResponse> {
    let avatar: { url: string } | null = null;

    try {
      const adminIsExist = await adminRepository.getAdminByEmail(data.email);

      if (adminIsExist) {
        throw new BadRequestException("Admin already exist");
      }

      const rawPassword = data.password;
      const hashedPassword = await hashPassword(rawPassword);

      if (file) {
        avatar = saveUploadedFile(file);
      }

      const dataToSave: AdminCreateData = {
        ...data,
        password: hashedPassword,
        avatar: avatar.url,
      };

      const newAdmin = await adminRepository.addAdmin(dataToSave);
      return mapToAdminResponse(newAdmin);
    } catch (error: unknown) {
      if (avatar?.url) {
        deleteUploadedFile(avatar.url);
      }

      throw error;
    }
  },

  // Update admin
  async update(
    id: string,
    data: AdminUpdateDTO,
    file?: Express.Multer.File,
  ): Promise<AdminResponse> {
    const admin = await adminRepository.getAdminById(id);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    const oldAvatarUrl = admin.avatar;
    let newAvatarUrl: string | undefined;

    // Upload file baru
    if (file) {
      const saved = saveUploadedFile(file);
      newAvatarUrl = saved.url;
    }

    // Validasi email
    if (data.email) {
      const adminExist = await adminRepository.getAdminByEmail(data.email);

      if (data.email !== admin.email && adminExist) {
        throw new BadRequestException("Email already in use");
      }
    }

    // Siapkan data untuk update
    const dataToUpdate: AdminUpdateData = { ...data };

    // Hash password
    if (data.password) {
      dataToUpdate.password = await hashPassword(data.password);
    }

    // Update avatar jika ada file baru
    if (newAvatarUrl) {
      dataToUpdate.avatar = newAvatarUrl;
    }

    const updated = await adminRepository.updateAdmin(id, dataToUpdate);

    // Hapus file lama jika update sukses
    if (newAvatarUrl && oldAvatarUrl) {
      deleteUploadedFile(oldAvatarUrl);
    }

    return mapToAdminResponse(updated);
  },

  // Hapus Admin
  async delete(id: string): Promise<boolean> {
    const admin = await adminRepository.getAdminById(id);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    if (admin.avatar) {
      deleteUploadedFile(admin.avatar);
    }

    await adminRepository.deleteAdmin(id);

    return true;
  },
};

export default adminService;
