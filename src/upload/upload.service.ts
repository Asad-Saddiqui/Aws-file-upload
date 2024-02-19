import { Injectable } from '@nestjs/common';
import { Bucket } from './validators/Bucket.dto';

@Injectable()
export class UploadService {
  async uploadFile_AWS_S3(files: Express.Multer.File[], buketName: Bucket) {
    console.log(files, buketName);
  }
}
