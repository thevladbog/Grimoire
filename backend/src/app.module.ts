import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { NewcomersModule } from './newcomers/newcomers.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { TrackerModule } from './tracker/tracker.module'

@Module({
  imports: [
    PrismaModule,
    NewcomersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TrackerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
