import { Controller, Get, Param } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get(':periodCode')
  async getStatsByPeriod(@Param('periodCode') periodCode: string) {
    return await this.salesService.getSalesStats(periodCode);
  }
}
