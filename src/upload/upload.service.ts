import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Bucket } from './validators/Bucket.dto';
import {
  PutObjectCommand,
  S3Client,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private S3 = new S3Client({
    region: this.configService.get('AWS_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFile_AWS_S3(
    files: Express.Multer.File[],
    bucket: Bucket,
  ): Promise<string[]> {
    try {
      const uploadedFileKeys: string[] = [];

      for (const file of files) {
        const uploadResult: PutObjectCommandOutput = await this.S3.send(
          new PutObjectCommand({
            Bucket: bucket.buketName,
            Key: file.originalname,
            Body: file.buffer,
          }),
        );

        if (!uploadResult) {
          throw new Error('Failed to upload file');
        }

        uploadedFileKeys.push(file.originalname);
      }

      return uploadedFileKeys;
    } catch (error) {
      throw new HttpException(
        'Failed to upload file to S3' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
