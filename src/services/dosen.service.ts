import NotFoundException from "../exceptions/NotFoundException";
import { dosenRepository } from "../repositories/dosen.repository";
import { lectureshipRepository } from "../repositories/lectureship.repository";
import {
  // CreateDosenData,
  // CreateDosenDTO,
  DosenResponse,
  DosenPositionData,
  PaginatedDosenResponse,
  UpdateDosenData,
  UpdateDosenDTO,
} from "../types/dosen.type";
import { deleteUploadedFile, saveUploadedFile } from "../utils/file";

export const dosenService = {
  async validatePositions(
    positions?: UpdateDosenDTO["positions"],
  ): Promise<DosenPositionData[] | undefined> {
    if (!positions) return undefined;

    await Promise.all(
      positions.map(async (position) => {
        const lectureship = await lectureshipRepository.getById(
          position.lectureshipId,
        );

        if (!lectureship) {
          throw new NotFoundException("Lectureship not found");
        }
      }),
    );

    return positions.map((position) => ({
      lectureshipId: position.lectureshipId,
      startDate: position.startDate,
      endDate: position.endDate ?? null,
    }));
  },

  // Create dosen
  // async create(
  //   data: CreateDosenDTO,
  //   file?: Express.Multer.File,
  // ): Promise<DosenResponse> {
  //   let uploaded: { url: string } | null = null;

  //   try {
  //     if (file) {
  //       uploaded = saveUploadedFile(file);
  //     }

  //     const positions = await this.validatePositions(data.positions);

  //     const dataToSave: CreateDosenData = {
  //       nidn: data.nidn,
  //       name: data.name,
  //       expertise: data.expertise,
  //       photo: uploaded.url,
  //       research: data.research,
  //       teaching: data.teaching,
  //       ...(positions && {
  //         positions: {
  //           create: positions,
  //         },
  //       }),
  //     };

  //     return await dosenRepository.create(dataToSave);
  //   } catch (err: unknown) {
  //     if (uploaded?.url) {
  //       deleteUploadedFile(uploaded.url);
  //     }
  //     throw err;
  //   }
  // },

  // Get all dosen
  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedDosenResponse> {
    const paginatedResult = await dosenRepository.getAll(limit, page, search);

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  // Get dosen by id
  async getById(id: string): Promise<DosenResponse> {
    const result = await dosenRepository.getById(id);

    if (!result) throw new NotFoundException("Dosen not found");

    return result;
  },

  // Update Dosen
  async update(
    id: string,
    data: UpdateDosenDTO,
    file?: Express.Multer.File,
  ): Promise<DosenResponse> {
    const dosen = await dosenRepository.getById(id);

    if (!dosen) throw new NotFoundException("Dosen not found");

    let newPhotoUrl: string;
    const oldPhotoUrl = dosen.photo;

    if (file) {
      const saved = saveUploadedFile(file);
      newPhotoUrl = saved.url;
    }

    const { positions: rawPositions, ...restData } = data;

    const updateData: UpdateDosenData = {
      ...restData,
    };

    // set thumbnail jika upload baru
    if (newPhotoUrl) {
      updateData.photo = newPhotoUrl;
    }

    if (rawPositions) {
      const positions = await this.validatePositions(rawPositions);
      updateData.positions = {
        deleteMany: {},
        create: positions ?? [],
      };
    }

    const updated = await dosenRepository.update(id, updateData);

    // Hapus file lama jika ada file baru
    if (newPhotoUrl && oldPhotoUrl) {
      deleteUploadedFile(oldPhotoUrl);
    }

    return updated;
  },

  // Delete dosen
  // async delete(id: string): Promise<DosenResponse> {
  //   const dosen = await dosenRepository.getById(id);

  //   if (!dosen) throw new NotFoundException("Dosen not found");

  //   if (dosen.photo) {
  //     deleteUploadedFile(dosen.photo);
  //   }

  //   return dosenRepository.delete(id);
  // },
};
