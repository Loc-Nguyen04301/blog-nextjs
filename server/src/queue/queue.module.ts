import { Module } from "@nestjs/common";
import { QueueCoreModule } from "./queue-core.module";
import { CategoryQueueModule } from "src/queue/category/cateogy.queue.module";
import { EmailQueueModule } from "src/queue/email/email.queue.module";

@Module({
  imports: [QueueCoreModule, CategoryQueueModule, EmailQueueModule],
  exports: [CategoryQueueModule, EmailQueueModule],
})
export class QueueModule {}
