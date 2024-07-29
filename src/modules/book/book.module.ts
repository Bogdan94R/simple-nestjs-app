import { Module } from '@nestjs/common';

import { PrismaModule } from '@db-prisma';

import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
