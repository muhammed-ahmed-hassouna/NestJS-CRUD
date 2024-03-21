import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception.filter.ts/http-exception.filter';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  );
  const loggerInstance = app.get(Logger);
  app.useGlobalFilters(new HttpExceptionFilter(loggerInstance));
  app.use(cookieParser());
  const config = app.get(ConfigService);

  // Swagger
  const config2 = new DocumentBuilder()
    .setTitle('Nest Js CRUD')
    .setDescription('This project is a CRUD (Create, Read, Update, Delete) API built using NestJS framework. It provides endpoints to manage users along with authentication and authorization features.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth",
    ).build();
  const document = SwaggerModule.createDocument(app, config2);
  SwaggerModule.setup('api', app, document);
  await app.listen(config.get('port'));
}
bootstrap();
