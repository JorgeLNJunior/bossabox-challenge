import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as expressWinston from 'express-winston';
import * as helmet from 'helmet';
import * as winston from 'winston';

import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  useContainer(app.select(MainModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Very Useful Tools to Remember')
    .setDescription('Bossabox challenge')
    .setVersion('1.0.0')
    .addTag('Tool')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

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
