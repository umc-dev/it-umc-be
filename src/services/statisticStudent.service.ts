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
    const statisticStudentIsExist = await statisticStudentRepository.getByYear(
      data.year
    );

    if (statisticStudentIsExist)
      throw new BadRequestException(
        'Statistic Student for this year already exists'
      );

    const dataToSave: CreateStatisticStudentData = {
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
    search: number
  ): Promise<PaginatedStatisticStudentResponse> {
    const paginatedResult = await statisticStudentRepository.getAll(
      limit,
      page,
      search
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  async getByYear(year: number): Promise<StatisticStudentResponse> {
    const statisticStudent = await statisticStudentRepository.getByYear(year);

    if (!statisticStudent)
      throw new NotFoundException('Statistic Student not found');

    return statisticStudent;
  },

  async update(
    year: number,
    data: UpdateStatisticStudentDto
  ): Promise<StatisticStudentResponse> {
    const statisticStudent = await statisticStudentRepository.getByYear(year);

    if (!statisticStudent)
      throw new NotFoundException('Statistic Student not found');

    const dataToUpdate: UpdateStatisticStudentData = {
      ...data,
    };

    // Jika ada data.year dan tidak sama dengan tahun lama, cek duplikasi
    if (data.year && data.year !== statisticStudent.year) {
      const statisticStudentIsExist =
        await statisticStudentRepository.getByYear(data.year);

      if (statisticStudentIsExist)
        throw new BadRequestException(
          'Statistic Student for this year already exists'
        );
    }

    return await statisticStudentRepository.update(year, dataToUpdate);;
  },

  async delete(year: number): Promise<StatisticStudentResponse> {
    const statisticStudent = await statisticStudentRepository.getByYear(year);

    if (!statisticStudent)
      throw new NotFoundException('Statistic Student not found');

    return await statisticStudentRepository.delete(year);
  },
};
