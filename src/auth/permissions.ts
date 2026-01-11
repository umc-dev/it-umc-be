export const PERMISSIONS = {
  ADMIN_MANAGE: "admin:manage",

  NEWS_CREATE: "news:create",
  NEWS_UPDATE: "news:update",
  NEWS_DELETE: "news:delete",

  CATEGORY_MANAGE: "category:manage",

  DOSEN_MANAGE: "dosen:manage",
  STATISTIC_MANAGE: "statistic:manage",
  VISION_MISSION_MANAGE: "vision-mission:manage",
  PARTNERSHIP_MANAGE: "partnership:manage",
  ALUMNI_MANAGE: "alumni:manage",
  STUDY_MANAGE: "study:manage",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
