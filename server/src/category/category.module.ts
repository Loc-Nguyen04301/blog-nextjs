import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { CategoryQueueModule } from "src/queue/category/cateogy.queue.module";

@Module({
  imports: [PrismaModule, CategoryQueueModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
