import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@db-prisma';
import { PaginatedResult, paginationHelper } from '@utils';

import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  getCategories(page: number): Promise<PaginatedResult<CategoryDto>> {
    return paginationHelper<CategoryDto>(
      (take, skip) =>
        this.prisma.$transaction([
          this.prisma.category.count(),
          this.prisma.category.findMany({
            orderBy: {
              createdAt: 'desc',
            },
            take,
            skip,
          }),
        ]),
      { page },
    );
  }

  getCategory(id: number): Promise<CategoryDto | null> {
    return this.prisma.category.findFirst({
      where: { id },
    });
  }

  createCategory(payload: CreateCategoryDto): Promise<CategoryDto> {
    return this.prisma.category.create({ data: payload });
  }

  async updateCategory(
    id: number,
    payload: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: payload,
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async deleteCategory(id: number): Promise<CategoryDto> {
    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
