import z from "zod";
import { PaginationMeta } from ".";
import {
  CreateAchievementSchema,
  UpdateAchievementSchema,
} from "../validator/achievement.validator";

export interface Achievement {
  id: number;
  name: string;
  achievementName: string;
  link: string;
  achievedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateAchievementDto = z.infer<typeof CreateAchievementSchema>;

export interface CreateAchievementData {
  name: string;
  achievementName: string;
  link: string;
  achievedAt: Date;
}

export type UpdateAchievementDto = z.infer<typeof UpdateAchievementSchema>;

export interface UpdateAchievementData {
  name?: string;
  achievementName?: string;
  link?: string;
  achievedAt?: Date;
}

export interface AchievementResponse {
  id: number;
  name: string;
  achievementName: string;
  link: string;
  achievedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedAchievementResponse {
  data: AchievementResponse[];
  meta: PaginationMeta;
}
