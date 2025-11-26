import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { LogService } from './log.service';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';

@Controller('api/v1/log')
export class LogController {
  constructor(private readonly logService: LogService,
    @Inject('RABBITMQ_SERVICE')
    private readonly rmqClient: ClientProxy,
  ) { }

  @Post()
  create(@Body() createLogDto: any) {
    return this.logService.create(createLogDto);
  }

  @Post("createRmq")
  createRmq(@Body() createLogDto: any) {
    this.rmqClient.emit('log_created', {
      message: "message",
      user: "I'm current user",
      timestamp: new Date(),
    });

    return { success: true };
  }

  @EventPattern('log_created')
  handleLog(@Payload() data: any) {
    console.log('📥 Received log:', data);
  }

  @Get()
  findAll() {
    return this.logService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogDto: any) {
    return this.logService.update(+id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logService.remove(+id);
  }
}
