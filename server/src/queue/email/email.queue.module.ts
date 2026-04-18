import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { QUEUE_NAMES } from "src/queue/queue.constants";
import { EmailQueue } from "./email.queue";
import { EmailProcessor } from "./email.processor";

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAMES.EMAIL,
    }),
  ],
  providers: [EmailProcessor, EmailQueue],
  exports: [EmailQueue],
})
export class EmailQueueModule {}
