import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BlogPageParams } from './types';
export declare class BlogService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBlogDto: CreateBlogDto): Promise<{
        categories: {
            id: number;
            name: string;
        }[];
    } & {
        title: string;
        content: string;
        description: string;
        thumbnail: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll({ itemsPerPage, keyword, page }: BlogPageParams): Promise<{
        total: number;
        pageNumbers: number;
        page: number;
        listBlogs: {
            categories: number[];
            title: string;
            description: string;
            thumbnail: string;
            id: string;
            createdAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        blogReturn: {
            categories: number[];
            title: string;
            description: string;
            thumbnail: string;
            id: string;
            createdAt: Date;
        };
    }>;
    update(id: number, updateBlogDto: UpdateBlogDto): string;
    remove(id: number): string;
}
