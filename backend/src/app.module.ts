import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NewcomersModule } from './newcomers/newcomers.module';

@Module({
  imports: [PrismaModule, NewcomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
