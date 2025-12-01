import NotFoundException from "../exceptions/NotFoundException";
import { dosenRepository } from "../repositories/dosen.repository";
import {
  CreateDosenData,
  CreateDosenDTO,
  DosenResponse,
  PaginatedDosenResponse,
  UpdateDosenData,
  UpdateDosenDTO,
} from "../types/dosen.type";
import { deleteUploadedFile, saveUploadedFile } from "../utils/file";

export const dosenService = {
  // Create dosen
  async create(
    data: CreateDosenDTO,
    file?: Express.Multer.File,
  ): Promise<DosenResponse> {
    const savedFile = saveUploadedFile(file);
    const dataToSave: CreateDosenData = {
      name: data.name,
      expertise: data.expertise,
      photo: savedFile.url,
      research: data.research,
      teaching: data.teaching,
    };

    return await dosenRepository.create(dataToSave);
  },

  // Get all dosen
  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedDosenResponse> {
    const paginatedResult = await dosenRepository.getAll(limit, page, search);

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  // Get dosen by id
  async getById(id: string): Promise<DosenResponse> {
    const result = await dosenRepository.getById(id);

    if (!result) throw new NotFoundException("Dosen not found");

    return result;
  },

  // Update Dosen
  async update(
    id: string,
    data: UpdateDosenDTO,
    file?: Express.Multer.File,
  ): Promise<DosenResponse> {
    const dosen = await dosenRepository.getById(id);

    if (!dosen) throw new NotFoundException("Dosen not found");

    let newPhotoUrl: string;
    const oldPhotoUrl = dosen.photo;

    if (file) {
      const saved = saveUploadedFile(file);
      newPhotoUrl = saved.url;
    }

    const updateData: UpdateDosenData = {
      ...data,
    };

    // set thumbnail jika upload baru
    if (newPhotoUrl) {
      updateData.photo = newPhotoUrl;
    }

    const updated = await dosenRepository.update(id, updateData);

    // Hapus file lama jika ada file baru
    if (newPhotoUrl && oldPhotoUrl) {
      deleteUploadedFile(oldPhotoUrl);
    }

    return updated;
  },

  // Delete dosen
  async delete(id: string): Promise<DosenResponse> {
    const dosen = await dosenRepository.getById(id);

    if (!dosen) throw new NotFoundException("Dosen not found");

    if (dosen.photo) {
      deleteUploadedFile(dosen.photo);
    }

    return dosenRepository.delete(id);
  },
};
