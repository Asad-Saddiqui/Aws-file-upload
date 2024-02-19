import { IsString, MinLength } from 'class-validator';

export class Bucket {
  @IsString({ message: 'Bucket name must be a string' })
  @MinLength(3, { message: 'Bucket name must be at least 3 characters long' })
  buketName: string;
}
