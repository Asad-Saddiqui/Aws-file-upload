import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('upload')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async get() {
    return this.appService.getHello();
  }
}
