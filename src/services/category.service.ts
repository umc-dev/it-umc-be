import { categoryRepository } from './../repositories/category.repository';
import {
  CategoryResponse,
  CategoryWithNewsResponse,
  CreateCategoryDto,
  UpdateCategoryDto,
  PaginatedCategoryResponse,
  CreateCategoryData,
  UpdateCategoryData,
} from '../types/category.type';
import BadRequestException from '../exceptions/BadRequestException';
import NotFoundException from '../exceptions/NotFoundException';
import { generateSlug } from '../utils';

export const categoryService = {
  async create(data: CreateCategoryDto): Promise<CategoryResponse> {
    const slug = generateSlug(data.name);

    const dataToSave: CreateCategoryData = {
      name: data.name,
      slug,
    };

    const categoryIsExist = await categoryRepository.getByName(data.name);

    if (categoryIsExist) throw new BadRequestException('Category already exists');

    const newCategory = await categoryRepository.add(dataToSave);
    return newCategory;
  },

  async getAll(
    limit: number,
    page: number,
    search: string
  ): Promise<PaginatedCategoryResponse> {
    const paginatedResult = await categoryRepository.getAll(
      limit,
      page,
      search
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    };
  },

  async getById(id: string): Promise<CategoryWithNewsResponse | null> {
    const category = await categoryRepository.getById(id);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  },

  async getByName(name: string): Promise<CategoryResponse | null> {
    const category = await categoryRepository.getByName(name);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  },

  async update(id: string, data: UpdateCategoryDto): Promise<CategoryResponse> {
    const category = await categoryRepository.getById(id);

    if (!category) throw new NotFoundException('Category not found');

    const dataToUpdate: UpdateCategoryData = { ...data };

    if (data.name && data.name !== category.name) {
      const categoryIsExist = await categoryRepository.getByName(data.name);

      // Cek apakah nama category sudah dipakai oleh category lain
      if (categoryIsExist) {
        throw new BadRequestException('Category name already in use');
      }

      // Jika aman, generate slug baru
      dataToUpdate.slug = generateSlug(data.name);
    }

    const updated = await categoryRepository.update(id, data);
    return updated;
  },

  async delete(id: string): Promise<Boolean> {
    const category = await categoryRepository.getById(id);

    if (!category) throw new NotFoundException('Category not found');

    await categoryRepository.delete(id);
    return true;
  },
};

