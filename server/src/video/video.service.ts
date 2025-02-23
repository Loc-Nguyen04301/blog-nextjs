import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findAll() {
    return `This action returns all video`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
