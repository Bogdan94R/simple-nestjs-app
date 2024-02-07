import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { VERSION } from '../../../shared/constants';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller({
  path: 'users',
  version: VERSION.V1,
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

  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ): UserDto {
    return this.userService.updateUserById(id, payload);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number): UserDto {
    return this.userService.delete(id);
  }
}
