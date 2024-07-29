import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Category } from '@db-prisma-client';

export class CategoryDto implements Category {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
