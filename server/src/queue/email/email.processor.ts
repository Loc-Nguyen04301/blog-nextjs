import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import * as nodemailer from "nodemailer";
import { JOB_NAMES, QUEUE_NAMES } from "src/queue/queue.constants";
import { SendEmailJobData } from "./email.queue";

@Processor(QUEUE_NAMES.EMAIL)
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.MAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async process(job: Job<SendEmailJobData>) {
    switch (job.name) {
      case JOB_NAMES.SEND_EMAIL:
        await this.handleSendEmail(job.data);
        break;
    }
  }

  private async handleSendEmail(data: SendEmailJobData) {
    const { to, subject, body } = data;

    this.logger.log(`Sending email to ${to} — subject: "${subject}"`);

    try {
      await this.transporter.sendMail({
        from: `"Blog App" <${process.env.MAIL_USER}>`,
        to,
        subject,
        html: body,
      });

      this.logger.log(`Email sent to ${to}`);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(
        `Failed to send email to ${to}: ${err.message}`,
        err.stack,
      );
      throw err;
    }
  }
}
