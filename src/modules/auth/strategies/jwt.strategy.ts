import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { IJwtPayload } from '../interfaces';
import { UserService } from '../../user/user.service';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../../user/dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: IJwtPayload): Promise<UserDto> {
    const user = await this.userService.getUser({ id: payload.sub });
    if (!user) {
      throw new NotFoundException();
    }
    return plainToInstance(UserDto, user);
  }
}
