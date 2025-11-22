import type {
  AdminResponse,
  AdminWithNewsResponse,
  AdminCreateDTO,
  AdminUpdateDTO,
  PaginatedAdminResponse,
} from "../types/admin.type";
import adminRepository from "../repositories/admin.repository";
import NotFoundException from "../exceptions/NotFoundException";
import { hashPassword } from "../utils/password";
import BadRequestException from "../exceptions/BadRequestException";
import { da } from "zod/v4/locales";

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
  async create(data: AdminCreateDTO): Promise<AdminResponse> {
    const adminIsExist = await adminRepository.getAdminByEmail(data.email);

    if (adminIsExist) {
      throw new BadRequestException("Admin already exist");
    }

    const rawPassword = data.password;
    const hashedPassword = await hashPassword(rawPassword);

    const dataToSave: AdminCreateDTO = {
      ...data,
      password: hashedPassword,
    };

    const newAdmin = await adminRepository.addAdmin(dataToSave);
    return mapToAdminResponse(newAdmin);
  },

  // Update admin
  async update(id: string, data: AdminUpdateDTO): Promise<AdminResponse> {
    const admin = await adminRepository.getAdminById(id);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    if(data.email){
      const adminIsExist = await adminRepository.getAdminByEmail(data.email);
      if (data.email !== admin.email && adminIsExist) {
        throw new BadRequestException("Email already in use");
      }
    }

    let dataToUpdate: AdminUpdateDTO = { ...data };

    if (data.password) {
      const rawPassword = data.password;
      const hashedPassword = await hashPassword(rawPassword);
      dataToUpdate.password = hashedPassword;
    }

    const updated = await adminRepository.updateAdmin(id, dataToUpdate);
    return mapToAdminResponse(updated);
  },

  // Hapus Admin
  async delete(id: string): Promise<boolean> {
    const admin = await adminRepository.getAdminById(id);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    await adminRepository.deleteAdmin(id);

    return true;
  },
};

export default adminService;
