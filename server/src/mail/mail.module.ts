import { Module } from "@nestjs/common";
import { MailController } from "./mail.controller";
import { MailService } from "./mail.service";
import { EmailQueueModule } from "src/queue/email/email.queue.module";

@Module({
  imports: [EmailQueueModule],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
