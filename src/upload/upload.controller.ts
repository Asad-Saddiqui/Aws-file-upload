import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MaxFileSizeValidator } from './validators/max-file-size.validator';
import { FileTypeValidator } from './validators/file-type.validator';
import { ParseFilePipe } from './validators/parse-file.pipe';
import { UploadService } from './upload.service';
import { Bucket } from './validators/Bucket.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // Endpoint for handling file uploads
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    // Uploaded files, processed by FilesInterceptor
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          // Validate max file size
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
          // Validate file types
          new FileTypeValidator({
            allowedTypes: ['image/jpeg', 'image/jpg', 'image/png'],
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Body(new ValidationPipe()) buketName: Bucket,
  ) {
    // Call the uploadService to handle the file upload to AWS S3
    return this.uploadService.uploadFile_AWS_S3(files, buketName);
  }
}
