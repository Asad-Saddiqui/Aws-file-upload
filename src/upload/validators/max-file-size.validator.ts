import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class MaxFileSizeValidator implements PipeTransform {
  constructor(private readonly options: { maxSize: number }) {}

  transform(value: any) {
    // Check if the file size exceeds the maximum allowed size

    if (value.size > this.options.maxSize) {
      // If file size is too large, throw a BadRequestException with an error message
      throw new BadRequestException('File size is too large');
    }
    // If file size is within the allowed limit, return the value
    return value;
  }
}
