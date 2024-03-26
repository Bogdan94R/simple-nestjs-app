import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';

import { PaginatedResult } from '@utils';

import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(
    @Query('page', ParseIntPipe) page: number,
  ): Promise<PaginatedResult<UserDto>> {
    return this.userService.getUsers(page);
  }
}
