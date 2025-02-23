import { Module } from '@nestjs/common';

import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { VideoModule } from './video/video.module';

@Module({
  imports: [PrismaModule, BlogModule, CategoryModule, VideoModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
