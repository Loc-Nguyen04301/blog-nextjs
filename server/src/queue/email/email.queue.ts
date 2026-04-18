import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { JOB_NAMES, QUEUE_NAMES } from "src/queue/queue.constants";

export interface SendEmailJobData {
  to: string;
  subject: string;
  body: string;
}

@Injectable()
export class EmailQueue {
  constructor(
    @InjectQueue(QUEUE_NAMES.EMAIL)
    private queue: Queue,
  ) {}

  async addSendEmailJob(data: SendEmailJobData) {
    await this.queue.add(JOB_NAMES.SEND_EMAIL, data);
  }
}
