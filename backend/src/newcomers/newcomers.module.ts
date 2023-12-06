import { Module } from '@nestjs/common'
import { NewcomersService } from './newcomers.service'
import { NewcomersController } from './newcomers.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { TrackerModule } from 'src/tracker/tracker.module'

@Module({
  providers: [NewcomersService],
  controllers: [NewcomersController],
  imports: [PrismaModule, TrackerModule],
})
export class NewcomersModule {}
