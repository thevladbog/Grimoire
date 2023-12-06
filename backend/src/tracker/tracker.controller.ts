import { Body, Controller, Get, Post } from '@nestjs/common'
import { TrackerService } from 'src/tracker/tracker.service'
import { CreateIssueDto } from 'src/tracker/dto'

@Controller('tracker')
export class TrackerController {
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
