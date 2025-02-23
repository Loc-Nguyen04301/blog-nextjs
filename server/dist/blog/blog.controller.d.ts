import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
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
    findAll(page: string, itemsPerPage: string, keyword: string): Promise<{
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
    findByCategory(categoryId: string, itemsPerPage: string, page: string): Promise<{
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
    getBlogStats(): Promise<{
        statisticMonths: {
            time: any;
            blogNumbers: number;
        }[];
    }>;
    findBlogByMonth(year: number, month: number, page: string, itemsPerPage: string): Promise<{
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
    update(id: string, updateBlogDto: UpdateBlogDto): string;
    remove(id: string): string;
}
