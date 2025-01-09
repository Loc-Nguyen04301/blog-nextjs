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
        title: string;
        content: string;
        description: string;
        thumbnail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(page: string, itemsPerPage: string, keyword: string): Promise<{
        total: number;
        pageNumbers: number;
        page: number;
        listBlogs: {
            categories: number[];
            id: string;
            title: string;
            description: string;
            thumbnail: string;
            createdAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        blogReturn: {
            categories: number[];
            id: string;
            title: string;
            content: string;
            description: string;
            thumbnail: string;
            createdAt: Date;
        };
    }>;
    update(id: string, updateBlogDto: UpdateBlogDto): string;
    remove(id: string): string;
}
