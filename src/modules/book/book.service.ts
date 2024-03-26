import { Injectable } from '@nestjs/common';

import { PrismaService } from '@db-prisma';
import { PaginatedResult, paginationHelper } from '@utils';
import { USER_SELECT } from '@constants';

import { BookDto, CreateBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BookService {
  private readonly bookSelect = {
    id: true,
    title: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
    user: {
      select: USER_SELECT,
    },
    categories: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  getBooks(page: number): Promise<PaginatedResult<BookDto>> {
    return paginationHelper(
      () =>
        this.prisma.$transaction([
          this.prisma.book.count(),
          this.prisma.book.findMany({
            select: this.bookSelect,
            orderBy: {
              createdAt: 'desc',
            },
          }),
        ]),
      { page },
    );
  }

  getBook(id: number): Promise<BookDto | null> {
    return this.prisma.book.findFirst({
      select: this.bookSelect,
      where: { id },
    });
  }

  createBook(payload: CreateBookDto): Promise<BookDto> {
    return this.prisma.book.create({
      data: payload,
    });
  }

  updateBook(id: number, payload: UpdateBookDto): Promise<BookDto> {
    return this.prisma.book.update({
      where: { id },
      data: payload,
    });
  }

  deleteBook(id: number): Promise<BookDto> {
    return this.prisma.book.delete({ where: { id } });
  }
}
