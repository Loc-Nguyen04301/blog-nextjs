import { Injectable } from "@nestjs/common";
import { EmailQueue } from "src/queue/email/email.queue";
import { SendMailDto } from "./dto/send-mail.dto";

@Injectable()
export class MailService {
  constructor(private readonly emailQueue: EmailQueue) {}

  async sendMail(dto: SendMailDto) {
    await this.emailQueue.addSendEmailJob(dto);
    return { message: "Email queued successfully" };
  }
}
