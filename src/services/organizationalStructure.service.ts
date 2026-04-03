import BadRequestException from "../exceptions/BadRequestException";
import NotFoundException from "../exceptions/NotFoundException";
import {
  CreateOrganizationalStructureDto,
  OrganizationalStructureResponse,
  UpdateOrganizationalStructureDto,
} from "../types/organizationalStructure.type";
import { deleteUploadedFile, saveUploadedFile } from "../utils/file";
import { organizationalStructureRepository } from "../repositories/organizationalStructure.repository";

export const organizationalStructureService = {
  async getOne(): Promise<OrganizationalStructureResponse> {
    const data = await organizationalStructureRepository.getOne();

    if (!data) {
      throw new NotFoundException("Organizational structure not found");
    }

    return data;
  },

  async create(
    body: CreateOrganizationalStructureDto,
    file: Express.Multer.File,
  ): Promise<OrganizationalStructureResponse> {
    const existing = await organizationalStructureRepository.getOne();

    if (existing) {
      throw new BadRequestException(
        "Organizational structure already exists. Use update endpoint instead.",
      );
    }

    const uploaded = saveUploadedFile(file);

    try {
      return await organizationalStructureRepository.create({
        image: uploaded.url,
        description: body.description,
      });
    } catch (err) {
      deleteUploadedFile(uploaded.url);
      throw err;
    }
  },

  async update(
    body: UpdateOrganizationalStructureDto,
    file?: Express.Multer.File,
  ): Promise<OrganizationalStructureResponse> {
    const existing = await organizationalStructureRepository.getOne();

    if (!existing) {
      throw new NotFoundException("Organizational structure not found");
    }

    if (!file && body.description === undefined) {
      throw new BadRequestException(
        "At least image or description is required for update",
      );
    }

    let newImageUrl: string | undefined;

    if (file) {
      const uploaded = saveUploadedFile(file);
      newImageUrl = uploaded.url;
    }

    try {
      const updated = await organizationalStructureRepository.update(
        existing.image,
        {
          image: newImageUrl,
          description: body.description,
        },
      );

      if (newImageUrl) {
        deleteUploadedFile(existing.image);
      }

      return updated;
    } catch (err) {
      if (newImageUrl) {
        deleteUploadedFile(newImageUrl);
      }
      throw err;
    }
  },

  async delete(): Promise<OrganizationalStructureResponse> {
    const existing = await organizationalStructureRepository.getOne();

    if (!existing) {
      throw new NotFoundException("Organizational structure not found");
    }

    const deleted = await organizationalStructureRepository.delete(
      existing.image,
    );

    if (deleted.image) {
      deleteUploadedFile(deleted.image);
    }

    return deleted;
  },
};
