// Producer: category.queue.ts
import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { JOB_NAMES, QUEUE_NAMES } from "src/queue/queue.constants";

@Injectable()
export class CategoryQueue {
  constructor(
    @InjectQueue(QUEUE_NAMES.CATEGORY_IMPORT)
    private queue: Queue,
  ) {}

  async addImportJob(data: { filePath: string }) {
    await this.queue.add(JOB_NAMES.IMPORT_CATEGORY, data);
  }
}
