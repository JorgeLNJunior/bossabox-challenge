import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ forbidUnknownValues: true, whitelist: true }),
  );

  await app.listen(3000);
}
bootstrap();
