import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PaginatedResult, paginationHelper } from '@utils';

import { UpdateUserDto, UserDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly userSelect = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    createdAt: true,
    updatedAt: true,
    password: false,
  };
  constructor(private readonly prisma: PrismaService) {}

  getUsers(page: number): Promise<PaginatedResult<UserDto>> {
    return paginationHelper<UserDto>(
      (take, skip) => {
        return this.prisma.$transaction([
          this.prisma.user.count(),
          this.prisma.user.findMany({
            select: this.userSelect,
            orderBy: {
              createdAt: 'desc',
            },
            take,
            skip,
          }),
        ]);
      },
      { page },
    );
  }

  async getUser(where: { id?: number; email?: string }): Promise<UserDto> {
    const user = await this.prisma.user.findFirst({
      select: this.userSelect,
      where,
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  // TODO: add controller for update user profile
  async updateUserById(id: number, payload: UpdateUserDto): Promise<UserDto> {
    try {
      return await this.prisma.user.update({
        select: this.userSelect,
        where: { id },
        data: payload,
      });
    } catch (e) {
      throw new ForbiddenException();
    }
  }

  // TODO: add controller for delete functionality  when user in system
  async delete(id: number): Promise<UserDto> {
    try {
      return await this.prisma.user.delete({
        select: this.userSelect,
        where: { id },
      });
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
