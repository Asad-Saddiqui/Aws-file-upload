import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseFilePipe implements PipeTransform {
  constructor(private readonly options: { validators?: any[] } = {}) {}

  transform(files: any[]) {
    // Check if files array is empty
    if (!files || files.length === 0) {
      throw new BadRequestException('Please upload files');
    }

    const validatedFiles = [];
    // Loop through each file in the files array
    for (const file of files) {
      // Check if file object or its properties are missing
      if (!file || !file.originalname || !file.buffer) {
        throw new BadRequestException('Invalid file upload');
      }
      // Validate the file using custom validators if provided
      if (this.options.validators && this.options.validators.length > 0) {
        for (const validator of this.options.validators) {
          validator.transform(file);
        }
      }

      validatedFiles.push(file);
    }

    // Return the array of validated files
    return validatedFiles;
  }
}
