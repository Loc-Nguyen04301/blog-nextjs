import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { Public } from "src/common/decorators/public.decorator";
import { UserEntity } from "src/user/entities/user.entity";

@Controller("api/v1/comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseInterceptors(new ResponseInterceptor("Create Comment Success"))
  create(@CurrentUser() user: UserEntity, @Body() dto: CreateCommentDto) {
    return this.commentService.create(user.id, dto);
  }

  @Public()
  @Get("blog/:blogId")
  @UseInterceptors(new ResponseInterceptor("Get Comments Success"))
  findByBlog(@Param("blogId") blogId: string) {
    return this.commentService.findByBlog(blogId);
  }

  @Public()
  @Get("video/:videoId")
  @UseInterceptors(new ResponseInterceptor("Get Comments Success"))
  findByVideo(@Param("videoId") videoId: string) {
    return this.commentService.findByVideo(videoId);
  }

  @Patch(":id")
  @UseInterceptors(new ResponseInterceptor("Update Comment Success"))
  update(
    @CurrentUser() user: UserEntity,
    @Param("id") id: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentService.update(user.id, id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@CurrentUser() user: UserEntity, @Param("id") id: string) {
    return this.commentService.remove(user.id, id);
  }
}
