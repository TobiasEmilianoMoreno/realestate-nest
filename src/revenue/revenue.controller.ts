import {
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  ParseEnumPipe,
  Query,
} from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueStatDto } from './dto/revenue-state.dto';
import { ViewType } from './enum/view-type.enum';

@Controller('revenues')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get()
  async getRevenue(
    @Query(
      'viewType',
      new DefaultValuePipe(ViewType.Monthly),
      new ParseEnumPipe(ViewType),
    )
    viewType: ViewType,
    @Headers('accept-language') locale: string,
  ): Promise<RevenueStatDto[]> {
    locale = (locale ?? 'en').slice(0, 2);
    return this.revenueService.findByViewType(viewType, locale);
  }
}
