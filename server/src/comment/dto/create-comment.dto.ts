import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsUUID()
  blogId?: string;

  @IsOptional()
  @IsUUID()
  videoId?: string;
}
