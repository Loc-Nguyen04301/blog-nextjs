import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty({ message: 'Title must not be empty.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Content must not be empty.' })
  content: string;

  @IsString()
  description: string;

  @IsString()
  thumbnail: string;

  @IsArray()
  categories: number[];
}
