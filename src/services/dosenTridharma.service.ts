import { dosenTridharmaRepository } from '../repositories/dosenTridharma.repository';
import {
  CreateDosenTridharmaData,
  CreateDosenTridharmaDto,
  DosenTridharmaResponse,
  DosenTridharmaWithDosenResponse,
  PaginatedDosenTridharmaResponse,
  UpdateDosenTridharmaData,
  UpdateDosenTridharmaDto,
} from '../types/dosenTridharma.type';
import NotFoundException from '../exceptions/NotFoundException';
import { dosenRepository } from '../repositories/dosen.repository';

export const dosenTridharmaService = {
  async create(data: CreateDosenTridharmaDto): Promise<DosenTridharmaResponse> {
    const dosen = await dosenRepository.getById(data.dosenId);
    
    if (!dosen) throw new NotFoundException('Dosen not found');

    const dataToSave: CreateDosenTridharmaData = {
      dosenId: data.dosenId,
      category: data.category,
      title: data.title,
      year: data.year,
      description: data.description,
      link: data.link,
    };
    return await dosenTridharmaRepository.add(dataToSave);
  },

  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedDosenTridharmaResponse> {
    const paginatedResult = await dosenTridharmaRepository.getAll(
      limit,
      page,
      search,
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  async getById(id: number): Promise<DosenTridharmaWithDosenResponse> {
    const dosenTridharma = await dosenTridharmaRepository.getById(id);

    if (!dosenTridharma) throw new NotFoundException('Dosen Tridharma not found');

    return dosenTridharma;
  },

  async update(
    id: number,
    data: UpdateDosenTridharmaDto,
  ): Promise<DosenTridharmaResponse> {
    const dosenTridharma = await dosenTridharmaRepository.getById(id);

    if (!dosenTridharma) throw new NotFoundException('Dosen Tridharma not found');

    if(data.dosenId) {
      const dosen = await dosenRepository.getById(data.dosenId);
      if (!dosen) throw new NotFoundException('Dosen not found');
    }

    const dataToUpdate: UpdateDosenTridharmaData = {
      ...data,
    };

    return await dosenTridharmaRepository.update(id, dataToUpdate);
  },

  async delete(id: number): Promise<DosenTridharmaResponse> {
    const dosenTridharma = await dosenTridharmaRepository.getById(id);

    if (!dosenTridharma) throw new NotFoundException('Dosen Tridharma not found');

    return dosenTridharmaRepository.delete(id);
  },
};
