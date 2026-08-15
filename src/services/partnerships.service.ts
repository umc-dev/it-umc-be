import BadRequestException from "../exceptions/BadRequestException";
import NotFoundException from "../exceptions/NotFoundException";
import partnershipsRepository from "../repositories/partnerships.repository";
import {
  CreatePartnershipData,
  CreatePartnershipDto,
  PaginatedPartnershipResponse,
  PartnershipResponse,
  UpdatePartnershipData,
  UpdatePartnershipDto,
} from "../types/partnerships.type";
import { deleteUploadedFile, saveUploadedFile } from "../utils/file";

const partnershipsService = {
  // Create Partnership
  async create(
    data: CreatePartnershipDto,
    files?: Express.Multer.File[],
  ): Promise<PartnershipResponse> {
    const uploadedFilesData = files && files.length > 0
      ? files.map((file) => {
          const savedFile = saveUploadedFile(file);
          return {
            fileName: file.originalname,
            fileUrl: savedFile.url,
            fileType: file.mimetype,
          };
        })
      : [];

    const dataToSave: CreatePartnershipData = {
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      ...(uploadedFilesData.length > 0 && {
        files: {
          create: uploadedFilesData,
        },
      }),
    };

    return await partnershipsRepository.create(dataToSave);
  },

  // Get All Partnerships
  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedPartnershipResponse> {
    const paginatedResult = await partnershipsRepository.getAll(
      limit,
      page,
      search,
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  // Get By Id Partnership
  async getById(id: string): Promise<PartnershipResponse> {
    const result = await partnershipsRepository.getById(id);

    if (!result) throw new NotFoundException("Partnership not found");

    return result;
  },

  // Update Partnership
  async update(
    data: UpdatePartnershipDto,
    id: string,
    files?: Express.Multer.File[],
  ): Promise<PartnershipResponse> {
    const partnership = await partnershipsRepository.getById(id);

    if (!partnership) throw new NotFoundException("Partnership not found");

    // Process new file uploads
    const newFilesData = files && files.length > 0
      ? files.map((file) => {
          const saved = saveUploadedFile(file);
          return {
            fileName: file.originalname,
            fileUrl: saved.url,
            fileType: file.mimetype,
          };
        })
      : [];

    // Delete requested files
    if (data.deleteFileIds && data.deleteFileIds.length > 0) {
      const filesToDelete = await partnershipsRepository.getFilesByIds(data.deleteFileIds);
      for (const f of filesToDelete) {
        deleteUploadedFile(f.fileUrl);
      }
      await partnershipsRepository.deleteFilesByIds(data.deleteFileIds);
    }

    const { deleteFileIds, ...updateFields } = data;

    const updatedData: UpdatePartnershipData = {
      ...updateFields,
    };

    return await partnershipsRepository.update(
      id,
      updatedData,
      newFilesData,
    );
  },

  // Delete Partnership
  async delete(id: string): Promise<PartnershipResponse> {
    const partnership = await partnershipsRepository.getById(id);

    if (!partnership) throw new NotFoundException("Partnership not found");

    if (partnership.files && partnership.files.length > 0) {
      for (const file of partnership.files) {
        deleteUploadedFile(file.fileUrl);
      }
    }

    return await partnershipsRepository.delete(id);
  },
};

export default partnershipsService;
