import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { createWriteStream } from 'fs';
import { get } from 'http';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('SINS')
    .setDescription('API server for Grimoire | HR System')
    .setVersion('1.0')
    .addServer('http://localhost:4566/', 'Local environment')
    .addServer('https://sins.v-b.tech/', 'Production')
    .addTag('Backend')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 4566);

  if (process.env.NODE_ENV === 'development') {
    // write swagger ui files
    get(
      `http://sins.v-b.tech/swagger/swagger-ui-bundle.js`,
      function (response) {
        response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
        console.log(
          `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
        );
      },
    );

    get(
      `https://sins.v-b.tech/swagger/swagger-ui-init.js`,
      function (response) {
        response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
        console.log(
          `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
        );
      },
    );

    get(
      `https://sins.v-b.tech/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
        );
      },
    );

    get(`https://sins.v-b.tech/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
      );
    });
  }
}
bootstrap();
