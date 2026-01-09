import NotFoundException from "../exceptions/NotFoundException";
import { studyRepository } from "../repositories/study.repository";
import {
  CreateStudyData,
  CreateStudyDto,
  StudyResponse,
  PaginatedStudyResponse,
  UpdateStudyData,
  UpdateStudyDto,
} from "../types/study.type";
import { deleteUploadedFile, saveUploadedFile } from "../utils/file";

export const studyService = {
  async create(
    file: Express.Multer.File,
  ): Promise<StudyResponse> {
    let uploaded: { url: string } | null = null;
    try {
      const uploaded = saveUploadedFile(file);
      const dataToSave: CreateStudyData = {
        source: uploaded.url,
      };

      return await studyRepository.add(dataToSave);
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
  ): Promise<PaginatedStudyResponse> {
    const paginatedResult = await studyRepository.getAll(limit, page, search);

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  async getById(id: number): Promise<StudyResponse> {
    const result = await studyRepository.getById(id);

    if (!result) {
      throw new NotFoundException("Study not found");
    }

    return result;
  },

  async update(
    id: number,
    file?: Express.Multer.File,
  ): Promise<StudyResponse> {
    const exist = await studyRepository.getById(id);
    if (!exist) throw new NotFoundException('Study not found');

    const updateData: UpdateStudyData = {};

    // Jika ada file baru, simpan dan hapus file lama
    if (file) {
      const saved = saveUploadedFile(file);
      updateData.source = saved.url;
      deleteUploadedFile(exist.source);
    }

    const updated = await studyRepository.update(id, updateData);

    return updated;
  },

  async delete(id: number): Promise<StudyResponse> {
    const exist = await studyRepository.getById(id);
    if (!exist) throw new NotFoundException("Study not found");

    if (exist.source) {
      deleteUploadedFile(exist.source);
    }

    return studyRepository.delete(id);
  },
};
