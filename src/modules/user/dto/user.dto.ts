import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

import { User, Role } from '@db-prisma-client';

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

  @ApiProperty()
  role!: Role;

  @Exclude()
  password!: string;
}
