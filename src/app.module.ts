import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './modules/user';
import { validate } from './core/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
