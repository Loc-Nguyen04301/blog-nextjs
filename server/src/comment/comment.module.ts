import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { CommentGateway } from "./comment.gateway";

@Module({
  imports: [PrismaModule],
  controllers: [CommentController],
  providers: [CommentService, CommentGateway],
})
export class CommentModule {}
