import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { PaginatedResult } from '@utils';

import { CategoryService } from './category.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(
    @Query('page', ParseIntPipe) page: number,
  ): Promise<PaginatedResult<CategoryDto>> {
    return this.categoryService.getCategories(page);
  }

  @Get(':id')
  getCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryDto | null> {
    return this.categoryService.getCategory(id);
  }

  @Post()
  createCategory(@Body() payload: CreateCategoryDto): Promise<CategoryDto> {
    return this.categoryService.createCategory(payload);
  }

  @Put(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoryService.updateCategory(id, payload);
  }

  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<CategoryDto> {
    return this.categoryService.deleteCategory(id);
  }
}
