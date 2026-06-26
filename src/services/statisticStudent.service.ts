import { statisticStudentRepository } from '../repositories/statisticStudent.repository';
import {
  StatisticStudentResponse,
  CreateStatisticStudentDto,
  UpdateStatisticStudentDto,
  PaginatedStatisticStudentResponse,
  CreateStatisticStudentData,
  UpdateStatisticStudentData,
} from '../types/statisticStudent.type';
import BadRequestException from '../exceptions/BadRequestException';
import NotFoundException from '../exceptions/NotFoundException';

export const statisticStudentService = {
  async create(
    data: CreateStatisticStudentDto
  ): Promise<StatisticStudentResponse> {
    const prodi = data.prodi || 'S1';
    const statisticStudentIsExist = await statisticStudentRepository.getByYearAndProdi(
      data.year,
      prodi
    );

    if (statisticStudentIsExist)
      throw new BadRequestException(
        'Statistic Student for this year and study program already exists'
      );

    const dataToSave: CreateStatisticStudentData = {
      prodi,
      year: data.year,
      enteredStudents: data.enteredStudents,
      graduatedStudents: data.graduatedStudents,
    };
    return await statisticStudentRepository.add(
      dataToSave
    );
  },

  async getAll(
    limit: number,
    page: number,
    search?: string,
    prodi?: 'S1' | 'D3'
  ): Promise<PaginatedStatisticStudentResponse> {
    const paginatedResult = await statisticStudentRepository.getAll(
      limit,
      page,
      search,
      prodi
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  async getById(id: string): Promise<StatisticStudentResponse> {
    const statisticStudent = await statisticStudentRepository.getById(id);

    if (!statisticStudent)
      throw new NotFoundException('Statistic Student not found');

    return statisticStudent;
  },

  async update(
    id: string,
    data: UpdateStatisticStudentDto
  ): Promise<StatisticStudentResponse> {
    const statisticStudent = await statisticStudentRepository.getById(id);

    if (!statisticStudent)
      throw new NotFoundException('Statistic Student not found');

    const dataToUpdate: UpdateStatisticStudentData = {
      ...data,
    };

    const targetYear = data.year || statisticStudent.year;
    const targetProdi = data.prodi || statisticStudent.prodi;

    if (
      (data.year && data.year !== statisticStudent.year) ||
      (data.prodi && data.prodi !== statisticStudent.prodi)
    ) {
      const statisticStudentIsExist =
        await statisticStudentRepository.getByYearAndProdi(targetYear, targetProdi);

      if (statisticStudentIsExist && statisticStudentIsExist.id !== id)
        throw new BadRequestException(
          'Statistic Student for this year and study program already exists'
        );
    }

    return await statisticStudentRepository.update(id, dataToUpdate);
  },

  async delete(id: string): Promise<StatisticStudentResponse> {
    const statisticStudent = await statisticStudentRepository.getById(id);

    if (!statisticStudent)
      throw new NotFoundException('Statistic Student not found');

    return await statisticStudentRepository.delete(id);
  },
};
