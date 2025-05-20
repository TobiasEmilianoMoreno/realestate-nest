import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity';
import { ResponseBuildingDto } from './dto/response-building.dto';
import { plainToInstance } from 'class-transformer';
import { BuildingOverviewDto } from './dto/buildig-overview.dto';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private buildingsRepository: Repository<Building>,
  ) {}

  async findAll(): Promise<ResponseBuildingDto[]> {
    const buildings = await this.buildingsRepository.find({
      relations: ['type'],
    });

    return plainToInstance(ResponseBuildingDto, buildings, {
      excludeExtraneousValues: true,
    });
  }

  async filter(filters: {
    sale?: boolean;
    keyword?: string;
    typeName?: string;
    ambientes?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<ResponseBuildingDto[]> {
    const qb = this.buildingsRepository
      .createQueryBuilder('building')
      .leftJoinAndSelect('building.type', 'type');

    if (filters.sale !== undefined) {
      qb.andWhere('building.sale = :sale', { sale: filters.sale });
    }

    if (filters.keyword) {
      const kw = `%${filters.keyword.toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(building.name) LIKE :kw OR LOWER(building.direction) LIKE :kw)',
        { kw },
      );
    }

    if (filters.typeName) {
      qb.andWhere('LOWER(type.name) = :typeName', {
        typeName: filters.typeName.toLowerCase(),
      });
    }

    if (filters.ambientes) {
      if (filters.ambientes === '5+') {
        qb.andWhere('building.beds >= :minBeds', { minBeds: 5 });
      } else {
        const n = parseInt(filters.ambientes, 10);
        qb.andWhere('building.beds = :n', { n });
      }
    }

    if (filters.minPrice) {
      qb.andWhere('building.price >= :minPrice', {
        minPrice: filters.minPrice,
      });
    }

    if (filters.maxPrice) {
      qb.andWhere('building.price <= :maxPrice', {
        maxPrice: filters.maxPrice,
      });
    }

    const results = await qb.getMany();
    return plainToInstance(ResponseBuildingDto, results, {
      excludeExtraneousValues: true,
    });
  }

  async getBuildingOverview(): Promise<BuildingOverviewDto[]> {
    const raw = (await this.buildingsRepository.query(`
      SELECT *
      FROM building_overview
    `)) as BuildingOverviewDto[];

    return raw.map((r) =>
      plainToInstance(BuildingOverviewDto, {
        id: r.id,
        buildingName: r.building_name,
        imageUrl: r.image_url,
        pctChange: parseFloat(r.pct_change),
        direction: r.direction,
      }),
    );
  }
}
