import {
  PaginatedAchievementResponse,
  AchievementResponse,
  CreateAchievementData,
  UpdateAchievementData,
} from "../types/achievement.type";
import { removeUndefined } from "../utils";
import { db } from "../utils/prisma";

function toAchievementResponse(data: any): AchievementResponse {
  return {
    id: data.id,
    prodi: data.prodi,
    name: data.name,
    achievementName: data.achievementName,
    link: data.link,
    achievedAt: data.achievedAt,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

const achievementRepository = {
  async create(data: CreateAchievementData): Promise<AchievementResponse> {
    const achievement = await db.achievement.create({ data });
    return toAchievementResponse(achievement);
  },

  async getAll(
    limit: number,
    page: number,
    search: string,
    prodi?: 'S1' | 'D3',
  ): Promise<PaginatedAchievementResponse> {
    const skip = (page - 1) * limit;
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        {
          name: { contains: search },
        },
      ];
    }

    if (prodi) {
      whereClause.prodi = prodi;
    }

    const [achievements, total] = await db.$transaction([
      db.achievement.findMany({
        skip,
        take: limit,
        orderBy: {
          achievedAt: "desc",
        },
        where: whereClause,
      }),
      db.achievement.count({
        where: whereClause,
      }),
    ]);

    return {
      data: achievements.map(toAchievementResponse),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: number): Promise<AchievementResponse | null> {
    const achievement = await db.achievement.findUnique({
      where: { id },
    });

    return achievement ? toAchievementResponse(achievement) : null;
  },

  async update(
    id: number,
    data: UpdateAchievementData,
  ): Promise<AchievementResponse> {
    const achievement = await db.achievement.update({
      where: { id },
      data: {
        ...removeUndefined(data),
      },
    });

    return toAchievementResponse(achievement);
  },

  async delete(id: number): Promise<AchievementResponse> {
    const achievement = await db.achievement.delete({
      where: { id },
    });

    return toAchievementResponse(achievement);
  },
};

export default achievementRepository;
