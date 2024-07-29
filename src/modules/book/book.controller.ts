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

import { BookService } from './book.service';
import { PaginatedResult } from '@utils';
import { BookDto, CreateBookDto, UpdateBookDto } from './dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(
    @Query('page', ParseIntPipe) page: number,
  ): Promise<PaginatedResult<BookDto>> {
    return this.bookService.getBooks(page);
  }

  @Get(':id')
  getBook(@Param('id', ParseIntPipe) id: number): Promise<BookDto | null> {
    return this.bookService.getBook(id);
  }

  @Post()
  createBook(@Body() payload: CreateBookDto): Promise<BookDto> {
    return this.bookService.createBook(payload);
  }

  @Put(':id')
  updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookDto,
  ): Promise<BookDto> {
    return this.bookService.updateBook(id, payload);
  }

  @Delete(':id')
  deleteBook(@Param('id', ParseIntPipe) id: number): Promise<BookDto> {
    return this.bookService.deleteBook(id);
  }
}
