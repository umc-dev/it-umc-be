import { facilityRepository } from './../repositories/facility.repository';
import {
  CreateFacilityData,
  CreateFacilityDto,
  FacilityResponse,
  PaginatedFacilityResponse,
  UpdateFacilityData,
  UpdateFacilityDto,
} from './../types/facility.type';
import NotFoundException from '../exceptions/NotFoundException';
import { deleteUploadedFile, saveUploadedFile } from '../utils/file';

export const facilityService = {
  async create(
    data: CreateFacilityDto,
    file: Express.Multer.File,
  ): Promise<FacilityResponse> {
    let uploaded: { url: string } | null = null;

    try {
      if (file) {
        uploaded = saveUploadedFile(file);
      }

      const dataToSave: CreateFacilityData = {
        name: data.name,
        description: data.description,
        photo: uploaded.url,
      };

      return await facilityRepository.add(dataToSave);
    } catch (err: unknown) {
      if (uploaded?.url) {
        deleteUploadedFile(uploaded.url);
      }
      throw err;
    }
  },

  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedFacilityResponse> {
    const paginatedResult = await facilityRepository.getAll(
      limit,
      page,
      search,
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  async getById(id: number): Promise<FacilityResponse | null> {
    const facility = await facilityRepository.getById(id);

    if (!facility) throw new NotFoundException('Facility not found');

    return facility;
  },

  async update(
    id: number,
    data: UpdateFacilityDto,
    file?: Express.Multer.File,
  ): Promise<FacilityResponse> {
    const facility = await facilityRepository.getById(id);

    if (!facility) throw new NotFoundException('Facility not found');

    let newPhotoUrl: string;
    const oldPhotoUrl = facility.photo;

    if (file) {
      const saved = saveUploadedFile(file);
      newPhotoUrl = saved.url;
    }

    const dataToUpdate: UpdateFacilityData = {
      ...data,
      photo: newPhotoUrl || facility.photo,
    };

    const updated = await facilityRepository.update(id, dataToUpdate);

    if (newPhotoUrl && oldPhotoUrl) {
      deleteUploadedFile(oldPhotoUrl);
    }

    return updated;
  },

  async delete(id: number): Promise<FacilityResponse> {
    const facility = await facilityRepository.getById(id);

    if (!facility) throw new NotFoundException('Facility not found');

    if (facility.photo) {
      deleteUploadedFile(facility.photo);
    }

    return facilityRepository.delete(id);
  },
};
