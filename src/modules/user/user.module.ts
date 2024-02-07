import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserV1Module } from './v1';
import { UserService } from './user.service';

@Module({
  imports: [UserV1Module],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
