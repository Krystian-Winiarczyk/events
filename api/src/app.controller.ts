import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {UseGuards} from "@nestjs/common/decorators";
import {DevelopmentGuard} from "./guard/development/development.guard";

@Controller('dev')
@UseGuards(DevelopmentGuard)
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get('seed')
  seedDatabase() {
    return this.appService.seedDatabase();
  }

  @Get('drop')
  dropDatabase() {
    return this.appService.dropDatabase();
  }
}
