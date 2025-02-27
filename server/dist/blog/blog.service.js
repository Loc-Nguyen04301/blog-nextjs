"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BlogService = class BlogService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBlogDto) {
        try {
            const { categories, content, description, thumbnail, title } = createBlogDto;
            const existingBlog = await this.prisma.blog.findUnique({
                where: {
                    title,
                },
            });
            if (existingBlog) {
                throw new common_1.HttpException('Blog with this title already exists', common_1.HttpStatus.BAD_REQUEST);
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
                throw new common_1.HttpException('Not created Blog', common_1.HttpStatus.BAD_REQUEST);
            return blog;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll({ itemsPerPage, keyword, page }) {
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
            ]);
            const blogsReturn = blogs.map(blog => {
                return {
                    ...blog, categories: blog.categories.map(c => c.id)
                };
            });
            return {
                total,
                pageNumbers: Math.ceil(total / itemsPerPage),
                page,
                listBlogs: blogsReturn,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
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
            });
            const blogReturn = { ...blog, categories: blog.categories.map(c => c.id) };
            if (!blogReturn)
                throw new common_1.HttpException('Not get Blog', common_1.HttpStatus.BAD_REQUEST);
            return { blogReturn };
        }
        catch (error) {
            throw error;
        }
    }
    async findByCategory({ categoryId, page, itemsPerPage }) {
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
            ]);
            const blogsReturn = blogs.map(blog => {
                return {
                    ...blog, categories: blog.categories.map(c => c.id)
                };
            });
            return {
                total,
                pageNumbers: Math.ceil(total / itemsPerPage),
                page,
                listBlogsByCategory: blogsReturn,
            };
        }
        catch (error) {
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
    `);
        const statisticMonths = resultQuery.map((row) => ({
            time: row.time,
            blogNumbers: Number(row.blogNumbers),
        }));
        return { statisticMonths };
    }
    async findBlogByMonth({ itemsPerPage, page, year, month }) {
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
            ]);
            const blogsReturn = blogs.map(blog => {
                return {
                    ...blog, categories: blog.categories.map(c => c.id)
                };
            });
            return {
                total,
                pageNumbers: Math.ceil(total / itemsPerPage),
                page,
                listBlogs: blogsReturn,
            };
        }
        catch (error) {
            throw error;
        }
    }
    update(id, updateBlogDto) {
        return `This action updates a #${id} blog`;
    }
    remove(id) {
        return `This action removes a #${id} blog`;
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogService);
//# sourceMappingURL=blog.service.js.map