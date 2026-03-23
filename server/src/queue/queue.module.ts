import { Module } from "@nestjs/common";
import { QueueCoreModule } from "./queue-core.module";
import { CategoryQueueModule } from "src/queue/category/cateogy.queue.module";

@Module({
  imports: [QueueCoreModule, CategoryQueueModule],
  exports: [CategoryQueueModule],
})
export class QueueModule {}
