import { ApiProperty } from '@nestjs/swagger';

import { Book } from '@db-prisma-client';
import { IsNotEmpty } from 'class-validator';

export class BookDto implements Book {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  @IsNotEmpty()
  title!: string;

  @ApiProperty()
  userId!: number | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
