import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ResponseInterceptor } from "src/common/interceptors/response.interceptor";
import { Public } from "src/common/decorators/public.decorator";

@Controller("api/v1/video")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Public()
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileData = new Blob([new Uint8Array(file.buffer)], {
      type: file.mimetype,
    });
    return this.videoService.uploadFile(fileData);
  }

  @Public()
  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Public()
  @Get()
  @UseInterceptors(new ResponseInterceptor("Get Video Success"))
  findAll(
    @Query("page") page: string,
    @Query("itemsPerPage") itemsPerPage: string,
  ) {
    return this.videoService.findAll({
      page: Number(page) || 1,
      itemsPerPage: Number(itemsPerPage) || 3,
    });
  }

  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.videoService.findOne(id);
  }

  @Public()
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Public()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.videoService.remove(+id);
  }
}
