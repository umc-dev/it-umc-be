import NotFoundException from "../exceptions/NotFoundException";
import { alumniRepository } from "../repositories/alumni.repository";
import { AlumniResponse, CreateAlumniData, CreateAlumniDto, PaginatedAlumniResponse, UpdateAlumniData, UpdateAlumniDto } from "../types/alumni.type";
import { deleteUploadedFile, saveUploadedFile } from "../utils/file";

export const alumniService = {
  async create(
    data: CreateAlumniDto,
    file?: Express.Multer.File,
  ): Promise<AlumniResponse> {
    let photo: string | null = null;

    if (file) {
      const savedFile = saveUploadedFile(file);
      photo = savedFile.url;
    }

    const dataToSave: CreateAlumniData = {
      name: data.name,
      ...(photo && { photo }),
      video: data.video,
      message:data.message,
      year: data.year
    }
    return await alumniRepository.add(dataToSave);
  },

  async getAll(
    limit: number,
    page: number,
    search: string
  ): Promise<PaginatedAlumniResponse> {
    const paginateResult = await alumniRepository.getAll(
      limit,
      page,
      search,
    );

    return {
      data: paginateResult.data,
      meta: paginateResult.meta, 
    }
  },

  async getById(id: string): Promise<AlumniResponse> {
    const alumni = await alumniRepository.getAlumniById(id);

    if(!alumni) throw new NotFoundException('Alumni not found');

    return alumni;
  },

  async update(
    id: string,
    data: UpdateAlumniDto,
    file?: Express.Multer.File,
  ): Promise<AlumniResponse> {
    const alumni = await alumniRepository.getAlumniById(id);

    if(!alumni) throw new NotFoundException('Alumni not found');

    let newPhotoUrl: string;
    const oldPhotoUrl = alumni.photo;

    if (file) {
      const savedFile = saveUploadedFile(file);
      newPhotoUrl = savedFile.url;
    }

    const dataToUpdate: UpdateAlumniData = {
      ...data,
    };

    if (newPhotoUrl) {
      dataToUpdate.photo = newPhotoUrl;
    }

    const updated = await alumniRepository.update(id, dataToUpdate);

    if (newPhotoUrl && oldPhotoUrl) {
      deleteUploadedFile(oldPhotoUrl);
    }

    return updated;
  },

  async delete(id: string): Promise<AlumniResponse> {
    const alumni = await alumniRepository.getAlumniById(id);

    if(!alumni) throw new NotFoundException('Alumni not found');

    if (alumni.photo) {
      deleteUploadedFile(alumni.photo);
    }

    return await alumniRepository.delete(id);
  }
}
