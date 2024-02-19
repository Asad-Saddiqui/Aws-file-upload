import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileTypeValidator implements PipeTransform {
  constructor(private readonly options: { allowedTypes: string[] }) {}

  transform(value: any) {
    // Extract allowedTypes from options
    const { allowedTypes } = this.options;
    const fileType = value.mimetype; // Extract file extension from mimetype
    // Check if the extracted file type is allowed
    if (!allowedTypes.includes(fileType)) {
      // If not allowed, throw a BadRequestException with an error message
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, and JPG images are allowed',
      );
    }
    // If file type is allowed, return the value
    return value;
  }
}
