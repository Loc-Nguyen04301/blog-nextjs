import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto) {
    try {
      const { categories, content, description, thumbnail, title } =
        createBlogDto;
      const existingBlog = await this.prisma.blog.findUnique({
        where: {
          title,
        },
      });
      if (existingBlog) {
        throw new HttpException(
          'Blog with this title already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const blog = await this.prisma.blog.create({
        data: {
          title,
          content,
          description,
          thumbnail,
          categories: {
            connect: categories.map((id) => ({ id })),
          },
        },
        include: {
          categories: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      if (!blog)
        throw new HttpException('Not created Blog', HttpStatus.BAD_REQUEST);

      return blog;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
