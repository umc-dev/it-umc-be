import { db } from "../utils/prisma";

function formatSection(title: string, data: unknown) {
  return `${title}:\n${JSON.stringify(data, null, 2)}`;
}

export const chatbotContextRepository = {
  async getByName(name: string) {
    const rows = await db.$queryRaw<
      Array<{
        id: number;
        name: string;
        context: string;
        createdAt: Date;
        updatedAt: Date;
      }>
    >`
      SELECT id, name, context, createdAt, updatedAt
      FROM chatbot_contexts
      WHERE name = ${name}
      LIMIT 1
    `;

    return rows[0] ?? null;
  },

  async upsertByName(name: string, context: string) {
    return await db.chatbotContext.upsert({
      where: { name },
      update: { context },
      create: { name, context },
    });
  },

  async getPublicDatabaseSnapshot() {
    const [
      categories,
      news,
      lectureships,
      dosen,
      dosenLectureships,
      statisticStudents,
      visionMission,
      partnerships,
      alumni,
      studies,
      achievements,
      organizationalStructure,
      facilities,
      accreditations,
    ] = await Promise.all([
      db.category.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { id: "asc" },
      }),
      db.news.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          thumbnail: true,
          slug: true,
          categoryId: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      db.lectureship.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { id: "asc" },
      }),
      db.dosen.findMany({
        select: {
          id: true,
          nidn: true,
          name: true,
          expertise: true,
          photo: true,
          teaching: true,
          research: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      db.dosenLectureship.findMany({
        select: {
          id: true,
          dosenId: true,
          lectureshipId: true,
          startDate: true,
          endDate: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      db.statisticStudent.findMany({
        select: {
          id: true,
          year: true,
          enteredStudents: true,
          graduatedStudents: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { year: "asc" },
      }),
      db.visionMission.findMany({
        select: {
          id: true,
          vision: true,
          mission: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { id: "asc" },
      }),
      db.partnership.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          files: true,
          startDate: true,
          endDate: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      db.alumni.findMany({
        select: {
          id: true,
          name: true,
          photo: true,
          video: true,
          message: true,
          year: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { year: "desc" },
      }),
      db.study.findMany({
        select: {
          id: true,
          source: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { id: "asc" },
      }),
      db.achievement.findMany({
        select: {
          id: true,
          name: true,
          achievementName: true,
          link: true,
          achievedAt: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { achievedAt: "desc" },
      }),
      db.organizationalStructure.findMany({
        select: {
          image: true,
          description: true,
        },
      }),
      db.facility.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          photo: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      db.accreditation.findMany({
        select: {
          id: true,
          category: true,
          prodi: true,
          title: true,
          grade: true,
          skNumber: true,
          skLink: true,
          certificateFile: true,
          institution: true,
          validFrom: true,
          validUntil: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const sections = [
      formatSection("category", categories),
      formatSection("news", news),
      formatSection("lectureships", lectureships),
      formatSection("dosen", dosen),
      formatSection("dosen_lectureships", dosenLectureships),
      formatSection("statistic_student", statisticStudents),
      formatSection("vission_mission", visionMission),
      formatSection("partnerships", partnerships),
      formatSection("alumni", alumni),
      formatSection("study", studies),
      formatSection("achievements", achievements),
      formatSection("organizational_structure", organizationalStructure),
      formatSection("facilities", facilities),
      formatSection("accreditations", accreditations),
    ];

    return sections.join("\n\n");
  },
};
