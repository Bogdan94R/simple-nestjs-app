import { Injectable, NotFoundException } from '@nestjs/common';

import { USERS } from '../mock-users';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  private users: Array<CreateUserDto & { id: number }> = USERS;

  getUsers(): UserDto[] {
    return this.users.map((user) => {
      const userDto = new UserDto();
      userDto.id = user.id;
      userDto.firstName = user.firstName;
      userDto.lastName = user.lastName;
      userDto.email = user.email;
      userDto.phoneNumber = user.phoneNumber;
      return userDto;
    });
  }

  getUserById(id: number): UserDto {
    const user = this.getUsers().find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  createUser(payload: CreateUserDto): UserDto {
    const id = new Date().getTime();
    this.users.push({ id, ...payload });
    return this.getUserById(id);
  }

  updateUserById(id: number, payload: UpdateUserDto): UserDto {
    this.users = this.getUsers().map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...payload,
        };
      }
      return user;
    }) as Array<CreateUserDto & { id: number }>;

    return this.getUserById(id);
  }

  delete(id: number): UserDto {
    const deletedUser = this.getUserById(id);
    this.users = this.users.filter((user) => user.id !== id);
    return deletedUser;
  }
}
