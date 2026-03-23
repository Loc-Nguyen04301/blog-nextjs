// Processor: category.processor.ts
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import * as XLSX from "xlsx";
import { PrismaService } from "src/prisma/prisma.service";
import { JOB_NAMES, QUEUE_NAMES } from "src/queue/queue.constants";

@Processor(QUEUE_NAMES.CATEGORY_IMPORT)
export class CategoryProcessor extends WorkerHost {
  constructor(private prisma: PrismaService) {
    super();
  }

  async process(job: Job<any>) {
    switch (job.name) {
      case JOB_NAMES.IMPORT_CATEGORY:
        const { filePath } = job.data;

        console.log("Processing file:", filePath);

        // đọc file excel
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data: any[] = XLSX.utils.sheet_to_json(sheet);

        console.log("Total rows:", data.length);

        // insert DB (batch)
        const BATCH_SIZE = 100;

        for (let i = 0; i < data.length; i += BATCH_SIZE) {
          const batch = data.slice(i, i + BATCH_SIZE) as { name: string }[];

          await this.prisma.category.createMany({
            data: batch.map((row) => ({
              name: row.name,
            })),
            skipDuplicates: true, // tránh lỗi unique
          });

          console.log(`Inserted ${i + batch.length}`);
        }

        console.log("Import done!");
        break;
    }
  }
}
