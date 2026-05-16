import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app =
    await NestFactory.create(
      AppModule,
    );

  // =========================
  // GLOBAL API PREFIX
  // =========================

  app.setGlobalPrefix('api');

  // =========================
  // GLOBAL VALIDATION
  // =========================

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      forbidNonWhitelisted: true,

      transform: true,
    }),
  );

  // =========================
  // COOKIE PARSER
  // =========================

  app.use(cookieParser());

  // =========================
  // ENABLE CORS
  // =========================

  app.enableCors({
    origin: true,

    credentials: true,
  });

  await app.listen(
    process.env.PORT ?? 3000,
  );

  console.log(
    `🚀 Server running on http://localhost:${process.env.PORT ?? 3000}`,
  );
}

bootstrap();