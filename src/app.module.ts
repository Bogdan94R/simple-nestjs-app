import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './modules/user';
import { validate } from './core/env.validation';
import { BookModule } from './modules/book/book.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    UserModule,
    BookModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
