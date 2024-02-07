import { Allow, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  @Allow()
  id!: number;

  @IsNotEmpty()
  @ApiProperty()
  name!: string;

  @IsEmail()
  @ApiProperty()
  email!: string;

  @Allow()
  @ApiProperty()
  phone!: string;
}
