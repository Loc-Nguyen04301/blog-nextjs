import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogByMonthPageParams, BlogPageParams } from './types';
export declare class BlogService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBlogDto: CreateBlogDto): Promise<{
        categories: {
            id: number;
            name: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        title: string;
        content: string;
        description: string;
        thumbnail: string;
        updatedAt: Date;
    }>;
    findAll({ itemsPerPage, keyword, page }: BlogPageParams): Promise<{
        total: number;
        pageNumbers: number;
        page: number;
        listBlogs: {
            categories: number[];
            id: string;
            createdAt: Date;
            title: string;
            description: string;
            thumbnail: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        blogReturn: {
            categories: number[];
            id: string;
            createdAt: Date;
            title: string;
            content: string;
            description: string;
            thumbnail: string;
        };
    }>;
    findByCategory({ categoryId, page, itemsPerPage }: {
        categoryId: number;
        page: number;
        itemsPerPage?: number;
    }): Promise<{
        total: number;
        pageNumbers: number;
        page: number;
        listBlogsByCategory: {
            categories: number[];
            id: string;
            createdAt: Date;
            title: string;
            description: string;
            thumbnail: string;
        }[];
    }>;
    getBlogStats(): Promise<{
        statisticMonths: {
            time: any;
            blogNumbers: number;
        }[];
    }>;
    findBlogByMonth({ itemsPerPage, page, year, month }: BlogByMonthPageParams): Promise<{
        total: number;
        pageNumbers: number;
        page: number;
        listBlogs: {
            categories: number[];
            id: string;
            createdAt: Date;
            title: string;
            description: string;
            thumbnail: string;
        }[];
    }>;
    update(id: number, updateBlogDto: UpdateBlogDto): string;
    remove(id: number): string;
}
