import type {
  AdminResponse,
  AdminWithNewsResponse,
  AdminCreateDTO,
  AdminUpdateDTO,
} from "../types/admin.type";
import adminRepository from "../repositories/admin.repository";
import NotFoundException from "../exceptions/NotFoundException";
import { hashPassword } from "../utils/password";

// Mapping ke admin response
const mapToAdminResponse = (admin: any): AdminResponse => {
  if (!admin) return null as any;

  const { password, ...safe } = admin;
  return safe;
};

// Mapping ke admin with news response
const mapToAdminWithNewsResponse = (admin: any): AdminWithNewsResponse => {
  if (!admin) return null as any;

  const { password, ...safe } = admin;
  return safe;
};

const adminService = {
  // Ambil semua admin
  async getAll(limit: number, page: number): Promise<AdminResponse[]> {
    const admins = await adminRepository.getAllAdmin(limit, page);

    return admins.map((admin) => mapToAdminResponse(admin));
  },

  // Ambil admin berdasarkan id
  async getById(id: string): Promise<AdminWithNewsResponse | null> {
    const admin = await adminRepository.getAdminById(id);

    if (!admin) {
      throw new NotFoundException("Admin not found");
    }

    return mapToAdminWithNewsResponse(admin);
  },

  // Menambahkan admin
  async create(data: AdminCreateDTO): Promise<AdminResponse> {
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
