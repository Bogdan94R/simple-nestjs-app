import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { VERSION } from '../../shared/constants';
import { UserService } from './user.service';
import { CreateUserDto, UserDto } from './dto';

@Controller({
  path: 'users',
  version: VERSION.NEUTRAL,
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): UserDto[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): UserDto {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() payload: CreateUserDto): UserDto {
    return this.userService.createUser(payload);
  }
}
