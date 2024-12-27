import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): string;
    findAll(): any;
    findOne(id: string): string;
    update(id: string, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: string): string;
}
