import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';

import { Public } from './decorators';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { CreateUserDto, UserDto } from '../user/dto';
import { CurrentUser } from '../../shared/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(
    @CurrentUser() user: UserDto,
    @Res({ passthrough: true }) response: Response,
  ): UserDto {
    const cookie: string = this.authService.getCookieWithJwtToken(
      user.id,
      user.role,
    );
    response.setHeader('Set-Cookie', cookie);
    return user;
  }

  @Public()
  @Post('sign-up')
  async signUp(@Body() body: CreateUserDto): Promise<UserDto> {
    const user = await this.authService.signUp(body);
    return plainToInstance(UserDto, user);
  }

  @Post('log-out')
  @HttpCode(HttpStatus.OK)
  async logOut(@Res({ passthrough: true }) response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return {
      statusCode: HttpStatus.OK,
    };
  }
}
