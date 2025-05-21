import { Controller, Get, Post, Body } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { ResponseBuildingDto } from './dto/response-building.dto';
import { FilterBuildingDto } from './dto/filter-building.dto';
import { BuildingOverviewDto } from './dto/buildig-overview.dto';
import { FirebaseAuthGuard } from 'src/auth/firebase-auth/firebase-auth.guard';
import { UseGuards } from '@nestjs/common';

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
  @UseGuards(FirebaseAuthGuard)
  async overview(): Promise<BuildingOverviewDto[]> {
    return await this.buildingsService.getBuildingOverview();
  }
}
