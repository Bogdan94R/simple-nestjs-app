import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @Allow()
  id!: number;

  @ApiProperty()
  @Allow()
  firstName!: string;

  @ApiProperty()
  @Allow()
  lastName!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @Allow()
  phoneNumber!: string;
}
