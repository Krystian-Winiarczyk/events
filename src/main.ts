import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config } from 'dotenv';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn']
  });
  await app.listen(3001);
}
bootstrap();
