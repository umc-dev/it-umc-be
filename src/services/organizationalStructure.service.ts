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
  async getOne(prodi: 'S1' | 'D3'): Promise<OrganizationalStructureResponse> {
    const data = await organizationalStructureRepository.getOne(prodi);

    if (!data) {
      throw new NotFoundException(`Organizational structure for prodi ${prodi} not found`);
    }

    return data;
  },

  async create(
    body: CreateOrganizationalStructureDto,
    file: Express.Multer.File,
  ): Promise<OrganizationalStructureResponse> {
    const prodi = body.prodi || 'S1';
    const existing = await organizationalStructureRepository.getOne(prodi);

    if (existing) {
      throw new BadRequestException(
        `Organizational structure for prodi ${prodi} already exists. Use update endpoint instead.`,
      );
    }

    const uploaded = saveUploadedFile(file);

    try {
      return await organizationalStructureRepository.create({
        image: uploaded.url,
        description: body.description,
        prodi,
      });
    } catch (err) {
      deleteUploadedFile(uploaded.url);
      throw err;
    }
  },

  async update(
    prodi: 'S1' | 'D3',
    body: UpdateOrganizationalStructureDto,
    file?: Express.Multer.File,
  ): Promise<OrganizationalStructureResponse> {
    const existing = await organizationalStructureRepository.getOne(prodi);

    if (!existing) {
      throw new NotFoundException(`Organizational structure for prodi ${prodi} not found`);
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
        prodi,
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

  async delete(prodi: 'S1' | 'D3'): Promise<OrganizationalStructureResponse> {
    const existing = await organizationalStructureRepository.getOne(prodi);

    if (!existing) {
      throw new NotFoundException(`Organizational structure for prodi ${prodi} not found`);
    }

    const deleted = await organizationalStructureRepository.delete(prodi);

    if (deleted.image) {
      deleteUploadedFile(deleted.image);
    }

    return deleted;
  },
};
