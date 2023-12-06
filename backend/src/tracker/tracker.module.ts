import { Module } from '@nestjs/common'
import { TrackerService } from './tracker.service'
import { TrackerController } from './tracker.controller'
import { JwtModule } from '@nestjs/jwt'
import { HttpModule } from '@nestjs/axios'

@Module({
  providers: [TrackerService],
  controllers: [TrackerController],
  imports: [JwtModule.register({}), HttpModule],
  exports: [TrackerService],
})
export class TrackerModule {}
