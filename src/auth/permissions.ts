export const PERMISSIONS = {
  ADMIN_MANAGE: 'admin:manage',

  NEWS_CREATE: 'news:create',
  NEWS_UPDATE: 'news:update',
  NEWS_DELETE: 'news:delete',

  CATEGORY_MANAGE: 'category:manage',

  DOSEN_CREATE: 'dosen:create',
  DOSEN_UPDATE: 'dosen:update',
  DOSEN_DELETE: 'dosen:delete',

  STATISTIC_MANAGE: 'statistic:manage',
  VISION_MISSION_MANAGE: 'vision-mission:manage',
  PARTNERSHIP_MANAGE: 'partnership:manage',
  ALUMNI_MANAGE: 'alumni:manage',
  STUDY_MANAGE: 'study:manage',
  ACHIEVEMENT_MANAGE: 'achievement:manage',
  ORGANIZATIONAL_STRUCTURE_MANAGE: 'organizational-structure:manage',
  LECTURESHIP_MANAGE: 'lectureship:manage',
  FACILITY_MANAGE: 'facility:manage',
  DOSEN_TRIDARMA_MANAGE: 'dosen-tridarma:manage',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
