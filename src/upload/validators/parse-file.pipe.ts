import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseFilePipe implements PipeTransform {
  constructor(private readonly options: { validators?: any[] } = {}) {}

  transform(files: any[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Please upload files');
    }

    const validatedFiles = [];
    for (const file of files) {
      if (!file || !file.originalname || !file.buffer) {
        throw new BadRequestException('Invalid file upload');
      }

      if (this.options.validators && this.options.validators.length > 0) {
        for (const validator of this.options.validators) {
          validator.transform(file);
        }
      }

      validatedFiles.push(file);
    }
    return validatedFiles;
  }
}
