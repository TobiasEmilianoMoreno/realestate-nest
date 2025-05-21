import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get(':periodCode')
  @UseGuards(AuthGuard)
  async getStatsByPeriod(@Param('periodCode') periodCode: string) {
    return await this.salesService.getSalesStats(periodCode);
  }
}
