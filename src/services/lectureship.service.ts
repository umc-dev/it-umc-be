import { lectureshipRepository } from './../repositories/lectureship.repository';
import {
  CreateLectureshipData,
  CreateLectureshipDto,
  LectureshipResponse,
  LectureshipWithDosenResponse,
  PaginatedLectureshipResponse,
  UpdateLectureshipData,
  UpdateLectureshipDto,
} from './../types/lectureship.type';
import NotFoundException from '../exceptions/NotFoundException';

export const lectureshipService = {
  async create(data: CreateLectureshipDto): Promise<LectureshipResponse> {
    const dataToSave: CreateLectureshipData = {
      name: data.name,
    };
    return await lectureshipRepository.add(dataToSave);
  },

  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedLectureshipResponse> {
    const paginatedResult = await lectureshipRepository.getAll(
      limit,
      page,
      search,
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  async getById(id: number): Promise<LectureshipWithDosenResponse> {
    const lectureship = await lectureshipRepository.getById(id);

    if (!lectureship) throw new NotFoundException('Lectureship not found');

    return lectureship;
  },

  async update(
    id: number,
    data: UpdateLectureshipDto,
  ): Promise<LectureshipResponse> {
    const lectureship = await lectureshipRepository.getById(id);

    if (!lectureship) throw new NotFoundException('Lectureship not found');

    const dataToUpdate: UpdateLectureshipData = {
      ...data,
    };

    return await lectureshipRepository.update(id, dataToUpdate);
  },

  async delete(id: number): Promise<LectureshipResponse> {
    const lectureship = await lectureshipRepository.getById(id);

    if (!lectureship) throw new NotFoundException('Lectureship not found');

    return lectureshipRepository.delete(id);
  },
};
