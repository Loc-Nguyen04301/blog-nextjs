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
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBlogDto: UpdateBlogDto): string;
    remove(id: string): string;
}
