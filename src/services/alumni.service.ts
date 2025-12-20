import NotFoundException from "../exceptions/NotFoundException";
import { alumniRepository } from "../repositories/alumni.repository";
import { AlumniResponse, CreateAlumniData, CreateAlumniDto, PaginatedAlumniResponse, UpdateAlumniData, UpdateAlumniDto } from "../types/alumni.type";

export const alumniService = {
  async create(data: CreateAlumniDto): Promise<AlumniResponse> {
    const dataToSave: CreateAlumniData = {
      name: data.name,
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
    data: UpdateAlumniDto
  ): Promise<AlumniResponse> {
    const alumni = await alumniRepository.getAlumniById(id);

    if(!alumni) throw new NotFoundException('Alumni not found');

    const dataToUpdate: UpdateAlumniData = {
      ...data,
    }

    return await alumniRepository.update(id, dataToUpdate);
  },

  async delete(id: string): Promise<AlumniResponse> {
    const alumni = await alumniRepository.getAlumniById(id);

    if(!alumni) throw new NotFoundException('Alumni not found');

    return await alumniRepository.delete(id);
  }
}