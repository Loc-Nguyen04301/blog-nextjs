import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
export declare class BlogService {
    create(createBlogDto: CreateBlogDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBlogDto: UpdateBlogDto): string;
    remove(id: number): string;
}
