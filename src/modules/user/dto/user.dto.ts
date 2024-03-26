import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail } from 'class-validator';

import { User } from '@db-prisma-client';

export class UserDto implements User {
  @ApiProperty()
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

  password!: string;
}
