import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { SentryFilter } from './filters/sentry.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const client = new PrismaClient();

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: 'sins@' + process.env.npm_package_version,
    environment: process.env.NODE_ENV,
    integrations: [
      new Sentry.Integrations.Prisma({ client }),
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],
  });
  const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('SINS')
    .setDescription('API server for Grimoire | HR System')
    .setVersion('1.0')
    .addServer('http://localhost:4566/', 'Local environment')
    .addServer('https://sins.v-b.tech/', 'Production')
    .addTag('Backend')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  await app.listen(process.env.PORT || 4566);
}
bootstrap();
