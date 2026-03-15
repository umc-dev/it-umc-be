import NotFoundException from "../exceptions/NotFoundException";
import achievementRepository from "../repositories/achievement.repository";
import {
  AchievementResponse,
  CreateAchievementData,
  CreateAchievementDto,
  PaginatedAchievementResponse,
  UpdateAchievementData,
  UpdateAchievementDto,
} from "../types/achievement.type";

const achievementService = {
  async create(data: CreateAchievementDto): Promise<AchievementResponse> {
    const dataToSave: CreateAchievementData = {
      name: data.name,
      achievementName: data.achievementName,
      link: data.link,
      achievedAt: data.achievedAt,
    };

    return await achievementRepository.create(dataToSave);
  },

  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedAchievementResponse> {
    const paginatedResult = await achievementRepository.getAll(
      limit,
      page,
      search,
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  async getById(id: number): Promise<AchievementResponse> {
    const achievement = await achievementRepository.getById(id);

    if (!achievement) throw new NotFoundException("Achievement not found");

    return achievement;
  },

  async update(
    id: number,
    data: UpdateAchievementDto,
  ): Promise<AchievementResponse> {
    const achievement = await achievementRepository.getById(id);

    if (!achievement) throw new NotFoundException("Achievement not found");

    const dataToUpdate: UpdateAchievementData = {
      ...data,
    };

    return await achievementRepository.update(id, dataToUpdate);
  },

  async delete(id: number): Promise<AchievementResponse> {
    const achievement = await achievementRepository.getById(id);

    if (!achievement) throw new NotFoundException("Achievement not found");

    return await achievementRepository.delete(id);
  },
};

export default achievementService;
