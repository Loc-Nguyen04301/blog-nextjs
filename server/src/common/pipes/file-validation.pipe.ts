import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // "value" is an object containing the file's attributes and metadata
        const oneGB = 1000 * 1000 * 1000;
        return value.size < oneGB;
    }
}