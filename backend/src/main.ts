import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  await app.listen(process.env.PORT || 4566);
}
bootstrap();
