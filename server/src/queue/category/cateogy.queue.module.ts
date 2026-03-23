// category.queue.module.ts
import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { QUEUE_NAMES } from "src/queue/queue.constants";
import { CategoryQueue } from "./category.queue";
import { CategoryProcessor } from "./category.processor";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: QUEUE_NAMES.CATEGORY_IMPORT,
    }),
  ],
  providers: [CategoryProcessor, CategoryQueue],
  exports: [CategoryQueue],
})
export class CategoryQueueModule {}
