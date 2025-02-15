import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll() {
    try {
      const listCategories = await this.prisma.category.findMany({
        select: {
          id: true,
          name: true,
          _count: true
        }
      });
      const listCategoriesReturn = listCategories.map((c) => {
        return {
          id: c.id,
          name: c.name,
          numberBlogs: c._count.blogs
        }
      })

      if (listCategoriesReturn)
        return { listCategoriesReturn }
      else throw new HttpException('Not Get Categories', HttpStatus.BAD_REQUEST);
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
