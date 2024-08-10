import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '@db-prisma-client';

import { PrismaService } from '@db-prisma';
import { EQueryErrorCode } from '@db-prisma/constants';
import { PaginatedResult, paginationHelper } from '@utils';
import { USER_SELECT } from '@constants';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { hash } from '../../shared/utils/bcrypt.util';

@Injectable()
export class UserService {
  private readonly userSelect = USER_SELECT;
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

  async getUser(
    where: { id?: number; email?: string },
    select?: typeof USER_SELECT,
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      select: select ? select : this.userSelect,
      where,
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    user.password = await hash(user.password);
    try {
      return await this.prisma.user.create({ data: user });
    } catch (e) {
      if (e.code === EQueryErrorCode.UniqueConstraintViolation) {
        throw new BadRequestException();
      }
      throw new InternalServerErrorException(e);
    }
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
