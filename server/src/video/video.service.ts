import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VideoPageParams } from 'src/blog/types';

@Injectable()
export class VideoService {
  constructor(private prisma: PrismaService) { }

  async uploadFile(fileData: Blob) {
    try {
      const formData = new FormData();
      formData.append("file", fileData);
      formData.append("upload_preset", "blog_nextjs_upload_image");
      const res = await fetch("https://api.cloudinary.com/v1_1/dr98sm712/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return { urlVideo: data.secure_url };
    } catch (error) {
      return error;
    }
  }

  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  async findAll({ itemsPerPage, page }: VideoPageParams) {
    try {
      const skip = (page - 1) * itemsPerPage;

      const [videos, total] = await this.prisma.$transaction([
        this.prisma.video.findMany({
          where: {},
          skip,
          take: itemsPerPage,
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            title: true,
            description: true,
            videoUrl: true,
            viewers: true,
            videoTags: {
              select: {
                id: true,
                tagName: true
              }
            },
            duration: true,
            createdAt: true
          }
        }),
        this.prisma.video.count()
      ])

      return {
        total,
        pageNumbers: Math.ceil(total / itemsPerPage),
        page,
        videos
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const video = await this.prisma.video.findUnique({ where: { id } })
      return {
        video
      };
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
