import { db } from "../utils/prisma";

export const organizationalStructureRepository = {
  async getOne() {
    return db.organizationalStructure.findFirst();
  },

  async create(data: { image: string; description: string }) {
    return db.organizationalStructure.create({
      data,
    });
  },

  async update(image: string, data: { image?: string; description?: string }) {
    return db.organizationalStructure.update({
      where: { image },
      data,
    });
  },

  async delete(image: string) {
    return db.organizationalStructure.delete({
      where: { image },
    });
  },
};
