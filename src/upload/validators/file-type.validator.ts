import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileTypeValidator implements PipeTransform {
  constructor(private readonly options: { allowedTypes: string[] }) {}

  transform(value: any) {
    const { allowedTypes } = this.options;
    const fileType = value.mimetype; // Extract file extension from mimetype
    if (!allowedTypes.includes(fileType)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, and JPG images are allowed',
      );
    }

    return value;
  }
}
