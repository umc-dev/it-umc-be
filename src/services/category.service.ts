import { create } from "domain";
import NotFoundException from "../exceptions/NotFoundException";
import categoryRepository from "../repositories/category.repository";
import {
  CategoryResponse,
  CategoryWithNewsResponse,
  CategoryCreateDTO,
  CategoryUpdateDTO,
  PaginatedCategoryResponse,
} from '../types/category.type';
import BadRequestException from "../exceptions/BadRequestException";

const categoryService = {
  // Ambil semua kategori
  async getAll(
    limit: number,
    page: number,
    search: string,
  ): Promise<PaginatedCategoryResponse> {
    const paginatedResult = await categoryRepository.getAllCategory(
      limit,
      page,
      search,
    );

    return {
      data: paginatedResult.data,
      meta: paginatedResult.meta,
    }
  },

  // Ambil kategori berdasarkan id
  async getById(id: string): Promise<CategoryWithNewsResponse | null> {
    const category = await categoryRepository.getCategoryById(id);

    if(!category) {
      throw new NotFoundException("Category not found");
    }

    return category;
  },

  // Ambil kategori berdasarkan nama
  async getByName(name: string): Promise<CategoryResponse | null> {
    const category = await categoryRepository.getCategoryByName(name);

    if(!category) {
      throw new NotFoundException("Category not found");
    }

    return category;
  },

  // Menambah kategori
  async createCategory(data: CategoryCreateDTO): Promise<CategoryResponse> {
    const caategoryIsExist = await categoryRepository.getCategoryByName(data.name);

    if(caategoryIsExist) {
      throw new BadRequestException("Category already exists");
    }

    const newCategory = await categoryRepository.addCategory(data);
    return newCategory;
  },

  // Update kategori
  async updateCategory(id: string, data: CategoryUpdateDTO): Promise<CategoryResponse> {
    const category = await categoryRepository.getCategoryById(id);

    if(!category) { 
      throw new NotFoundException("Category not found");
    }
    
    if(data.name) {
      const categoryIsExist = await categoryRepository.getCategoryByName(data.name);
      if (data.name !== category.name && categoryIsExist) {
        throw new BadRequestException('Category name already in use');
      }
    }

    const updated = await categoryRepository.updateCategory(id, data);
    return updated;
  },

  // Hapus kategori
  async deleteCategory(id: string): Promise<Boolean> {
    const category = await categoryRepository.getCategoryById(id);

    if(!category) {
      throw new NotFoundException("Category not found");
    }

    await categoryRepository.deleteCategory(id);
    return true;
  },
}

export default categoryService;
