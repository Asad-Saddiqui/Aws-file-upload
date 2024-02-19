import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class MaxFileSizeValidator implements PipeTransform {
  constructor(private readonly options: { maxSize: number }) {}

  transform(value: any) {
    if (value.size > this.options.maxSize) {
      throw new BadRequestException('File size is too large');
    }
    return value;
  }
}
