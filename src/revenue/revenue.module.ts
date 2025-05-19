import { Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueStat } from './entities/revenue.entity';
import { Period } from './entities/period.entity';
import { PeriodTranslation } from './entities/period-translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RevenueStat, Period, PeriodTranslation])],
  controllers: [RevenueController],
  providers: [RevenueService],
  exports: [RevenueService],
})
export class RevenueModule {}
