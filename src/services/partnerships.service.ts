import NotFoundException from "../exceptions/NotFoundException";
import partnershipsRepository from "../repositories/partnerships.repository";
import {
  CreatePartnershipData,
  CreatePartnershipDto,
  PaginatedPartnershipResponse,
  PartnershipResponse,
  UpdatePartnershipData,
  UpdatePartnershipDto,
} from "../types/partnerships.type";
import { deleteUploadedFile, saveUploadedFile } from "../utils/file";

const partnershipsService = {
  // Create Dosen
  async create(
    data: CreatePartnershipDto,
    file?: Express.Multer.File,
  ): Promise<PartnershipResponse> {
    let photo: string | null = null;

    if (file) {
      const savedFile = saveUploadedFile(file);
      photo = savedFile.url;
    }

    const dataToSave: CreatePartnershipData = {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      ...(photo && { photo }),
    };

    return await partnershipsRepository.create(dataToSave);
  },

  // Get All Dosen

  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedPartnershipResponse> {
    const paginatedResult = await partnershipsRepository.getAll(
      limit,
      page,
      search,
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  // Get By Id Dosen
  async getById(id: string): Promise<PartnershipResponse> {
    const result = await partnershipsRepository.getById(id);

    if (!result) throw new NotFoundException("Partnership not found");

    return result;
  },

  async update(
    data: UpdatePartnershipDto,
    id: string,
    file?: Express.Multer.File,
  ): Promise<PartnershipResponse> {
    const partnership = await partnershipsRepository.getById(id);

    if (!partnership) throw new NotFoundException("Partnership not found");

    let newPhotoUrl: string;
    const oldPhotoUrl = partnership.photo;

    if (file) {
      const saved = saveUploadedFile(file);
      newPhotoUrl = saved.url;
    }

    const updatedData: UpdatePartnershipData = {
      ...data,
    };

    // set photo jika upload baru
    if (newPhotoUrl) {
      updatedData.photo = newPhotoUrl;
    }

    const updated = await partnershipsRepository.update(id, updatedData);

    // Hapus file lama jika ada file baru
    if (newPhotoUrl && oldPhotoUrl) {
      deleteUploadedFile(oldPhotoUrl);
    }

    return updated;
  },

  // Delete Partnership
  async delete(id: string): Promise<PartnershipResponse> {
    const partnership = await partnershipsRepository.getById(id);

    if (!partnership) throw new NotFoundException("Partnership not found");

    if (partnership.photo) {
      deleteUploadedFile(partnership.photo);
    }

    return partnershipsRepository.delete(id);
  },
};

export default partnershipsService;
