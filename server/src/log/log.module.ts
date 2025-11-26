import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { RmqModule } from 'src/rmq/rmq.module';

@Module({
  imports: [RmqModule],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule { }
