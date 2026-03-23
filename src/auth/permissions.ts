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
  ACHIEVEMENT_MANAGE: "achievement:manage",
<<<<<<< HEAD
  ORGANIZATIONAL_STRUCTURE_MANAGE: "organizational-structure:manage",
=======
  LECTURESHIP_MANAGE: "lectureship:manage",
  FACILITY_MANAGE: "facility:manage",
>>>>>>> d4344c41719e1f876d4e6a3ba3ad1513012c27fa
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
