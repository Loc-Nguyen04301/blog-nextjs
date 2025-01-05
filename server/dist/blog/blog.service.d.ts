import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';
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
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBlogDto: UpdateBlogDto): string;
    remove(id: number): string;
}
