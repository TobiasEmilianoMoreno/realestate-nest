import {
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  ParseEnumPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueStatDto } from './dto/revenue-state.dto';
import { ViewType } from './enum/view-type.enum';
import { AuthGuard } from 'src/common/guards/auth.guard';
@Controller('revenues')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get()
  @UseGuards(AuthGuard)
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
