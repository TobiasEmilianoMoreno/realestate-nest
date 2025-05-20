import { Controller, Get, Post, Body } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { ResponseBuildingDto } from './dto/response-building.dto';
import { FilterBuildingDto } from './dto/filter-building.dto';
import { BuildingOverviewDto } from './dto/buildig-overview.dto';

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
  async overview(): Promise<BuildingOverviewDto[]> {
    return await this.buildingsService.getBuildingOverview();
  }
}
