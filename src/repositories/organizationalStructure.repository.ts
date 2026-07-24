import { db } from "../utils/prisma";

export const organizationalStructureRepository = {
  async getOne(prodi: 'S1' | 'D3') {
    return db.organizationalStructure.findUnique({
      where: { prodi },
    });
  },

  async create(data: { image: string; description: string; prodi: 'S1' | 'D3' }) {
    return db.organizationalStructure.create({
      data,
    });
  },

  async update(prodi: 'S1' | 'D3', data: { image?: string; description?: string }) {
    return db.organizationalStructure.update({
      where: { prodi },
      data,
    });
  },

  async delete(prodi: 'S1' | 'D3') {
    return db.organizationalStructure.delete({
      where: { prodi },
    });
  },
};
