import { visionMissionRepository } from '../repositories/visionMission.repository';
import {
  CreateVisionMissionData,
  CreateVisionMissionDto,
  VisionMissionResponse,
  PaginatedVisionMissionResponse,
  UpdateVisionMissionData,
  UpdateVisionMissionDto,
} from './../types/visionMission.type';
import NotFoundException from '../exceptions/NotFoundException';

export const visionMissionService = {
  async create(data: CreateVisionMissionDto): Promise<VisionMissionResponse> {
    const dataToSave: CreateVisionMissionData = {
      vision: data.vision,
      mission: data.mission,
    };
    return await visionMissionRepository.add(dataToSave);
  },

  async getAll(
    limit: number,
    page: number,
    search: string
  ): Promise<PaginatedVisionMissionResponse> {
    const paginatedResult = await visionMissionRepository.getAll(
      limit,
      page,
      search
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  async getById(id: number): Promise<VisionMissionResponse> {
    const visionMission = await visionMissionRepository.getById(id);

    if (!visionMission) throw new NotFoundException('Vision Mission not found');

    return visionMission;
  },

  async update(
    id: number,
    data: UpdateVisionMissionDto
  ): Promise<VisionMissionResponse> {
    const visionMission = await visionMissionRepository.getById(id);

    if (!visionMission) throw new NotFoundException('Vision Mission not found');

    const dataToUpdate: UpdateVisionMissionData = {
      ...data,
    };

    return await visionMissionRepository.update(id, dataToUpdate);
  },

  async delete(id: number): Promise<VisionMissionResponse> {
    const visionMission = await visionMissionRepository.getById(id);

    if (!visionMission) throw new NotFoundException('Vision Mission not found');

    return visionMissionRepository.delete(id);
  },
};
