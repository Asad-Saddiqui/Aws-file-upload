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

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
          new FileTypeValidator({
            allowedTypes: ['image/jpeg', 'image/jpg', 'image/png'],
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
    @Body(new ValidationPipe()) buketName: Bucket,
  ) {
    return this.uploadService.uploadFile_AWS_S3(files, buketName);
  }
}
