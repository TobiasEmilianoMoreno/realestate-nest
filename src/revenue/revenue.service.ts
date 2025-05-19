import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Period } from './entities/period.entity';
import { Repository } from 'typeorm';
import { RevenueStat } from './entities/revenue.entity';
import { RevenueStatDto } from './dto/revenue-state.dto';

@Injectable()
export class RevenueService {
  constructor(
    @InjectRepository(RevenueStat)
    private readonly revenueRepository: Repository<RevenueStat>,
    @InjectRepository(Period)
    private readonly periodRepository: Repository<Period>,
  ) {}

  async findByViewType(
    viewType: string,
    locale: string,
  ): Promise<RevenueStatDto[]> {
    const period = await this.periodRepository.findOne({
      where: { code: viewType.toLowerCase() },
      relations: ['translations'],
    });

    if (!period) {
      throw new BadRequestException(`Invalid viewType ${viewType}`);
    }

    const selectedTranslation =
      period.translations.find(
        (translation) => translation.locale === locale,
      ) ?? period.translations[0];

    const revenueStatistics = await this.revenueRepository.find({
      where: { period_id: period.id },
      order: { id: 'ASC' },
    });

    const revenueData = revenueStatistics.map((statistic) => ({
      label: selectedTranslation.label,
      sales: statistic.sales,
      revenue: statistic.revenue,
    }));

    return revenueData.map((dataPoint, index, fullList) => {
      if (fullList.length === 12) {
        const monthNames = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];
        return { ...dataPoint, label: monthNames[index] };
      }

      if (fullList.length <= 5) {
        const startingYear = 2021;
        return { ...dataPoint, label: String(startingYear + index) };
      }

      return dataPoint;
    });
  }
}
