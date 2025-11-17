import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) { }

  async createLog(params: {
    userId?: string;
    action: string;
    module?: string;
    entityId?: string;
    description?: string;
    request?: Request;
  }) {
    const { userId, action, module, entityId, description, request } = params;
    const ipAddress = request?.ip || request?.headers['x-forwarded-for']?.toString();
    const userAgent = request?.headers['user-agent'];

    return this.prisma.logActivity.create({
      data: {
        userId,
        action,
        module,
        entityId,
        description,
        ipAddress,
        userAgent,
      },
    });
  }
}
