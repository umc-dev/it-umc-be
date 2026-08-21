import { AchievementCategory } from "@prisma/client";
import z from "zod";
import { PaginationMeta } from ".";
import {
  CreateAchievementSchema,
  UpdateAchievementSchema,
} from "../validator/achievement.validator";

export interface Achievement {
  id: number;
  prodi: 'S1' | 'D3';
  category: AchievementCategory;
  name: string;
  achievementName: string;
  link: string;
  achievedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateAchievementDto = z.infer<typeof CreateAchievementSchema>;

export interface CreateAchievementData {
  prodi?: 'S1' | 'D3';
  category?: AchievementCategory;
  name: string;
  achievementName: string;
  link: string;
  achievedAt: Date;
}

export type UpdateAchievementDto = z.infer<typeof UpdateAchievementSchema>;

export interface UpdateAchievementData {
  prodi?: 'S1' | 'D3';
  category?: AchievementCategory;
  name?: string;
  achievementName?: string;
  link?: string;
  achievedAt?: Date;
}

export interface AchievementResponse {
  id: number;
  prodi: 'S1' | 'D3';
  category: AchievementCategory;
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
