import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@Controller('api/v1/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  @UseInterceptors(new ResponseInterceptor("Create Blog Success"))
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  @UseInterceptors(new ResponseInterceptor("Get Blog Success"))
  findAll(
    @Query('page') page: string,
    @Query('itemsPerPage') itemsPerPage: string,
    @Query('keyword') keyword: string,
  ) {
    console.log("call api blog")
    return this.blogService.findAll({
      keyword: keyword || "",
      page: Number(page) || 1,
      itemsPerPage: Number(itemsPerPage) || 5,
    });
  }

  @Get("category/:categoryId")
  @UseInterceptors(new ResponseInterceptor("Get Blog Success"))
  findByCategory(
    @Param('categoryId') categoryId: string,
    @Query('itemsPerPage') itemsPerPage: string,
    @Query('page') page: string,
  ) {
    return this.blogService.findByCategory({
      categoryId: +categoryId,
      page: Number(page) || 1,
      itemsPerPage: Number(itemsPerPage) || 5,
    });
  }

  @Get(':id')
  @UseInterceptors(new ResponseInterceptor("Get Blog Success"))
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Get('stats/month')
  @UseInterceptors(new ResponseInterceptor("Get Blog Success"))
  async getBlogStats() {
    return this.blogService.getBlogStats();
  }

  @Get('stats/month/:year/:month')
  @UseInterceptors(new ResponseInterceptor("Get Blog Success"))
  async findBlogByMonth(
    @Param('year') year: number,
    @Param('month') month: number,
    @Query('page') page: string,
    @Query('itemsPerPage') itemsPerPage: string,
  ) {
    return this.blogService.findBlogByMonth({
      page: Number(page) || 1,
      itemsPerPage: Number(itemsPerPage) || 5,
      year,
      month
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
