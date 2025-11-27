import { Controller, Get, Post, Body, Req, Inject } from '@nestjs/common';
import { LogService } from './log.service';

import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('api/v1/log')
export class LogController {
  constructor(
    private readonly logService: LogService,
    @Inject('RABBITMQ_SERVICE') private readonly rmqClient: ClientProxy
  ) { }

  @Public()
  @Post()
  async create(@Req() req: Request, @Body() body: any) {
    return this.logService.createLog({
      userId: body.userId,
      action: body.action,
      module: body.module,
      entityId: body.entityId,
      description: body.description,
      request: req,
    });
  }

  @Public()
  @Post("log-rabbitmq")
  async logRmq(@Req() req: Request, @Body() body: any) {
    return this.rmqClient.emit("log_created", {
      message: 'A new log entry',
      level: 'info',
      timestamp: new Date(),
    })
  }
}
