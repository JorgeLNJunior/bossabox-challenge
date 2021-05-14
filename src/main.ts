import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as expressWinston from 'express-winston';
import * as helmet from 'helmet';
import * as winston from 'winston';

import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  app.use(helmet());
  app.enableCors();
  app.use(
    expressWinston.logger({
      format: winston.format.json(),
      transports: [new winston.transports.File({ dirname: 'logs' })],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({ forbidUnknownValues: true, whitelist: true }),
  );

  await app.listen(3000);
}
bootstrap();
