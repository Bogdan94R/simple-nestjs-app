import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@db-prisma-client';
import { USER_SELECT } from '@constants';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto';
import { comparePassword } from '../../shared/utils/bcrypt.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.getUser(
      { email },
      {
        ...USER_SELECT,
        password: true,
      },
    );

    if (user && (await comparePassword(password, user.password))) {
      return user;
    }
  }

  public async signUp(userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  public getCookieWithJwtToken(id: number, role: Role) {
    const token = this.jwtService.sign({ sub: id, role });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
