import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envSchema } from './config/env.schema';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // env
  const env = envSchema.parse(process.env);

  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Stock price API')
    .setDescription(
      'A simple stock price checker app using Nest.js and free Stock Market API.',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(env.PORT);
}
void bootstrap();
