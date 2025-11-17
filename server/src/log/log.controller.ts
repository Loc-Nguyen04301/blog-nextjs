import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Request } from 'express';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) { }

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
}
