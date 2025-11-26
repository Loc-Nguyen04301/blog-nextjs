import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LogModule } from './log/log.module';
import * as redisStore from 'cache-manager-ioredis-yet';

@Module({
  imports: [PrismaModule, BlogModule, CategoryModule, VideoModule, AuthModule, UserModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        ttl: 60 * 1000, // 60s
      })
    }),
    LogModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
