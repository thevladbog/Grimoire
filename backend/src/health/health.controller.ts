import { Controller, Get, Inject } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck, HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { PrismaOrmHealthIndicator } from './prismaorm.health';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Checks')
@Controller('health')
export class HealthController {
  constructor(
    // eslint-disable-next-line prettier/prettier
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    @Inject(PrismaOrmHealthIndicator)
    private db: PrismaOrmHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}
  
  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return await this.health.check([
      () => this.http.pingCheck('basic check', 'http://localhost:4566'),
      () => this.db.pingCheck('newcomers'),
      () => this.memory.checkHeap('memory_heap', 300*1024*1024),
      () => this.memory.checkRSS('memory_rss', 300*1024*1024)
    ]);
  }
}
