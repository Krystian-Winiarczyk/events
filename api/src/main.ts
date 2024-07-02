import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config } from 'dotenv';
import { json, urlencoded } from 'express';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
    cors: true,
  });

  app.use(json({ limit: '25mb' }));
  app.use(urlencoded({ extended: true, limit: '25mb' }));

  await app.listen(3001);
}
bootstrap();
