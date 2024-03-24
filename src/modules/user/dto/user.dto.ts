import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail } from 'class-validator';

import { User } from '@prisma/client';

export class UserDto implements User {
  @ApiProperty()
  @Allow()
  id!: number;

  @ApiProperty()
  @Allow()
  firstName!: string | null;

  @ApiProperty()
  @Allow()
  lastName!: string | null;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
