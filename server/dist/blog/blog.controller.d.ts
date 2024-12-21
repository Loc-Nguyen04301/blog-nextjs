import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    create(createBlogDto: CreateBlogDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBlogDto: UpdateBlogDto): string;
    remove(id: string): string;
}
