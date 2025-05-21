import { Controller, Get, Post, Body } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { ResponseBuildingDto } from './dto/response-building.dto';
import { FilterBuildingDto } from './dto/filter-building.dto';
import { BuildingOverviewDto } from './dto/buildig-overview.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  findAll(): Promise<ResponseBuildingDto[]> {
    return this.buildingsService.findAll();
  }

  @Post('filter')
  filter(@Body() filters: FilterBuildingDto): Promise<ResponseBuildingDto[]> {
    return this.buildingsService.filter(filters);
  }

  @Get('overview')
  @UseGuards(AuthGuard)
  async overview(): Promise<BuildingOverviewDto[]> {
    return await this.buildingsService.getBuildingOverview();
  }
}
