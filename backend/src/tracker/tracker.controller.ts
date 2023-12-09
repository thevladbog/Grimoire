import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TrackerService } from 'src/tracker/tracker.service'
import { CreateIssueDto } from 'src/tracker/dto'
import { SentryInterceptor } from 'src/filters/sentry.interceptor';

@UseInterceptors(SentryInterceptor)
@Controller('tracker')
export class TrackerController {
  // eslint-disable-next-line prettier/prettier
  constructor(private trackerService: TrackerService) {}

  @Get()
  async getTicket() {
    return await this.trackerService.getTicket('GRIMOIRE-3')
  }

  @Post()
  async createTicket(@Body() data: CreateIssueDto) {
    return await this.trackerService.createTicket(data)
  }
}
