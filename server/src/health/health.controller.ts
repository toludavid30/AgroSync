// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async checkHealth() {
    let dbStatus = 'connected';

    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch (error) {
      dbStatus = 'disconnected';
    }

    return {
      status: 'ok',
      db: dbStatus,
      timestamp: new Date().toISOString(),
    };
  }
}