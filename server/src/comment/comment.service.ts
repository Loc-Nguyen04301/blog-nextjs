import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentGateway } from "./comment.gateway";

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private commentGateway: CommentGateway,
  ) {}

  async create(userId: string, dto: CreateCommentDto) {
    const comment = await this.prisma.comment.create({
      data: {
        description: dto.description,
        userId,
        blogId: dto.blogId ?? null,
        videoId: dto.videoId ?? null,
      },
      select: {
        id: true,
        description: true,
        createdAt: true,
        user: { select: { id: true, username: true, avatar: true } },
      },
    });

    if (dto.videoId) {
      this.commentGateway.emitNewComment(dto.videoId, comment);
    }

    return comment;
  }

  async findByBlog(blogId: string) {
    return this.prisma.comment.findMany({
      where: { blogId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        description: true,
        createdAt: true,
        user: { select: { id: true, username: true, avatar: true } },
      },
    });
  }

  async findByVideo(videoId: string) {
    return this.prisma.comment.findMany({
      where: { videoId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        description: true,
        createdAt: true,
        user: { select: { id: true, username: true, avatar: true } },
      },
    });
  }

  async update(userId: string, commentId: string, dto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) throw new NotFoundException("Comment not found");
    if (comment.userId !== userId) throw new ForbiddenException();

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { description: dto.description },
      select: {
        id: true,
        description: true,
        updatedAt: true,
      },
    });
  }

  async remove(userId: string, commentId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) throw new NotFoundException("Comment not found");
    if (comment.userId !== userId) throw new ForbiddenException();

    await this.prisma.comment.delete({ where: { id: commentId } });
  }
}
