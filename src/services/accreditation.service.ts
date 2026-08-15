import { AccreditationCategory, Prodi } from "@prisma/client";
import NotFoundException from "../exceptions/NotFoundException";
import accreditationRepository from "../repositories/accreditation.repository";
import {
  CreateAccreditationData,
  CreateAccreditationDto,
  PaginatedAccreditationResponse,
  AccreditationResponse,
  UpdateAccreditationData,
  UpdateAccreditationDto,
} from "../types/accreditation.type";
import { deleteUploadedFile, saveUploadedFile } from "../utils/file";

const accreditationService = {
  // Create Accreditation
  async create(
    data: CreateAccreditationDto,
    file?: Express.Multer.File,
  ): Promise<AccreditationResponse> {
    let certificateFile: string | null = null;

    if (file) {
      const savedFile = saveUploadedFile(file);
      certificateFile = savedFile.url;
    }

    const dataToSave: CreateAccreditationData = {
      category: data.category,
      prodi: data.prodi,
      title: data.title,
      grade: data.grade,
      skNumber: data.skNumber,
      skLink: data.skLink,
      certificateFile,
      institution: data.institution,
      validFrom: data.validFrom,
      validUntil: data.validUntil,
    };

    return await accreditationRepository.create(dataToSave);
  },

  // Get All Accreditations
  async getAll(
    limit: number,
    page: number,
    search: string,
    category?: AccreditationCategory,
    prodi?: Prodi,
  ): Promise<PaginatedAccreditationResponse> {
    const paginatedResult = await accreditationRepository.getAll(
      limit,
      page,
      search,
      category,
      prodi,
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  // Get By Id Accreditation
  async getById(id: string): Promise<AccreditationResponse> {
    const result = await accreditationRepository.getById(id);

    if (!result) throw new NotFoundException("Accreditation not found");

    return result;
  },

  // Update Accreditation
  async update(
    data: UpdateAccreditationDto,
    id: string,
    file?: Express.Multer.File,
  ): Promise<AccreditationResponse> {
    const accreditation = await accreditationRepository.getById(id);

    if (!accreditation) throw new NotFoundException("Accreditation not found");

    let newFileUrl: string | undefined;
    const oldFileUrl = accreditation.certificateFile;

    if (file) {
      const saved = saveUploadedFile(file);
      newFileUrl = saved.url;
    }

    const updatedData: UpdateAccreditationData = {
      ...data,
    };

    if (newFileUrl) {
      updatedData.certificateFile = newFileUrl;
    }

    const updated = await accreditationRepository.update(id, updatedData);

    // Hapus file lama jika ada file baru
    if (newFileUrl && oldFileUrl) {
      deleteUploadedFile(oldFileUrl);
    }

    return updated;
  },

  // Delete Accreditation
  async delete(id: string): Promise<AccreditationResponse> {
    const accreditation = await accreditationRepository.getById(id);

    if (!accreditation) throw new NotFoundException("Accreditation not found");

    if (accreditation.certificateFile) {
      deleteUploadedFile(accreditation.certificateFile);
    }

    return await accreditationRepository.delete(id);
  },
};

export default accreditationService;
