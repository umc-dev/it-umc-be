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
    const categoryIsExist = await categoryRepository.getByName(data.name);

    if (categoryIsExist) throw new BadRequestException('Category already exists');

    const slug = generateSlug(data.name);

    const dataToSave: CreateCategoryData = {
      name: data.name,
      slug,
    };

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

  // async getById(id: string): Promise<CategoryWithNewsResponse | null> {
  //   const category = await categoryRepository.getById(id);

  //   if (!category) throw new NotFoundException('Category not found');

  //   return category;
  // },

  async getBySlug(slug: string): Promise<CategoryWithNewsResponse | null> {
    const category = await categoryRepository.getBySlug(slug);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  },

  async getByName(name: string): Promise<CategoryResponse | null> {
    const category = await categoryRepository.getByName(name);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  },

  async update(slug: string, data: UpdateCategoryDto): Promise<CategoryResponse> {
    const category = await categoryRepository.getBySlug(slug);

    if (!category) throw new NotFoundException('Category not found');

    const dataToUpdate: UpdateCategoryData = { 
      ...data, 
    };

    // Jika data.name diubah, generate slug baru
    if (data.name && data.name !== category.name) {
      const categoryIsExist = await categoryRepository.getByName(data.name);

      // Cek apakah nama category sudah dipakai oleh category lain
      if (categoryIsExist) {
        throw new BadRequestException('Category name already in use');
      }

      dataToUpdate.slug = generateSlug(data.name);
    }

    const updated = await categoryRepository.update(slug, dataToUpdate);
    return updated;
  },

  async delete(slug: string): Promise<Boolean> {
    const category = await categoryRepository.getBySlug(slug);

    if (!category) throw new NotFoundException('Category not found');

    await categoryRepository.delete(slug);
    return true;
  },
};

