import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesStat } from './entity/sale.entity';
import { ResponseSaleDto } from './dto/response-sale-dto';
import { Period } from 'src/revenue/entities/period.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesStat)
    private salesStatRepository: Repository<SalesStat>,
    @InjectRepository(Period)
    private periodRepository: Repository<Period>,
  ) {}

  async getSalesStats(code: string): Promise<ResponseSaleDto[]> {
    const period = await this.periodRepository.findOne({
      where: { code },
    });
    if (!period) {
      throw new Error(`Period code "${code}" not found`);
    }

    const salesStats = await this.salesStatRepository.find({
      where: { periodId: period.id },
      order: { id: 'ASC' },
    });

    return salesStats.map((stat) => ({
      label: stat.channel,
      value: stat.value,
    }));
  }
}
