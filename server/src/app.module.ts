import { Module } from '@nestjs/common';

import { BlogModule } from './blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    BlogModule,
    PrismaModule,
    CategoryModule,
  ],
  providers: [],
})
export class AppModule { }
