import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogByMonthPageParams, BlogPageParams } from './types';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) { }

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

  async findAll({ itemsPerPage, keyword, page }: BlogPageParams) {
    try {
      const skip = (page - 1) * itemsPerPage;

      const [blogs, total] = await this.prisma.$transaction([
        this.prisma.blog.findMany({
          where: {
            title: { contains: keyword, mode: 'insensitive' }
          },
          skip,
          take: itemsPerPage,
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            categories: {
              select: {
                id: true,
                name: true
              }
            },
            createdAt: true
          }
        }),
        this.prisma.blog.count({
          where: {
            title: { contains: keyword, mode: 'insensitive' }
          },
        })
      ])

      const blogsReturn = blogs.map(blog => {
        return {
          ...blog, categories: blog.categories.map(c => c.id)

        }
      })

      return {
        total,
        pageNumbers: Math.ceil(total / itemsPerPage),
        page,
        listBlogs: blogsReturn,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const blog = await this.prisma.blog.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
          categories: {
            select: {
              id: true,
              name: true
            }
          },
          createdAt: true,
          content: true
        }
      })
      const blogReturn = { ...blog, categories: blog.categories.map(c => c.id) }


      if (!blogReturn) throw new HttpException('Not get Blog', HttpStatus.BAD_REQUEST);
      return { blogReturn }
    } catch (error) {
      throw error;
    }
  }

  async findByCategory({ categoryId, page, itemsPerPage }: { categoryId: number, page: number, itemsPerPage?: number }) {
    try {
      const skip = (page - 1) * itemsPerPage;


      const [blogs, total] = await this.prisma.$transaction([
        this.prisma.blog.findMany({
          where: {
            categories: {
              some: {
                id: categoryId
              }
            }
          },
          skip,
          take: itemsPerPage,
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            categories: {
              select: {
                id: true,
                name: true
              }
            },
            createdAt: true
          }
        }),
        this.prisma.blog.count({
          where: {
            categories: {
              some: {
                id: categoryId
              }
            }
          },
        })
      ])

      const blogsReturn = blogs.map(blog => {
        return {
          ...blog, categories: blog.categories.map(c => c.id)

        }
      })

      return {
        total,
        pageNumbers: Math.ceil(total / itemsPerPage),
        page,
        listBlogsByCategory: blogsReturn,
      };
    } catch (error) {
      throw error;
    }
  }

  async getBlogStats() {
    const resultQuery = await this.prisma.$queryRawUnsafe(`
      SELECT
        TO_CHAR(b."createdAt", 'MM-YYYY') AS time,
        COUNT(*) AS "blogNumbers"
      FROM "Blog" b
      GROUP BY TO_CHAR(b."createdAt", 'MM-YYYY')
      ORDER BY TO_CHAR(b."createdAt", 'MM-YYYY');
    `) as []
    const statisticMonths = resultQuery.map((row: any) => ({
      time: row.time,
      blogNumbers: Number(row.blogNumbers),
    }));
    return { statisticMonths };
  }

  async findBlogByMonth({ itemsPerPage, page, year, month }: BlogByMonthPageParams) {
    try {
      const skip = (page - 1) * itemsPerPage;

      const startDate = `${year}-${month}-01T00:00:00.000Z`;
      const endDate = new Date(year, month, 0).toISOString();

      const [blogs, total] = await this.prisma.$transaction([
        this.prisma.blog.findMany({
          where: {
            createdAt: {
              gte: new Date(startDate),
              lt: new Date(endDate),
            },
          },
          skip,
          take: itemsPerPage,
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            categories: {
              select: {
                id: true,
                name: true
              }
            },
            createdAt: true
          }
        }),
        this.prisma.blog.count({
          where: {
            createdAt: {
              gte: new Date(startDate),
              lt: new Date(endDate),
            },
          },
        })
      ])

      const blogsReturn = blogs.map(blog => {
        return {
          ...blog, categories: blog.categories.map(c => c.id)

        }
      })

      return {
        total,
        pageNumbers: Math.ceil(total / itemsPerPage),
        page,
        listBlogs: blogsReturn,
      };
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
