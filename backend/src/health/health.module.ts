import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaOrmHealthIndicator } from 'src/health/prismaorm.health';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
  providers: [PrismaOrmHealthIndicator, PrismaService],
})
export class HealthModule {}
