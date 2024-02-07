import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto';
import { USERS } from './mock-users';

@Injectable()
export class UserService {
  private readonly users: Array<CreateUserDto & { id: number }> = USERS;

  getUsers(): UserDto[] {
    return this.users.map((user) => {
      const userDto = new UserDto();
      userDto.id = user.id;
      userDto.name = user.name;
      userDto.email = user.email;
      userDto.phone = user.phone;
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
}
