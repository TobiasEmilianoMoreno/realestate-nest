import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity';
import { ResponseBuildingDto } from './dto/response-building.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private buildingsRepository: Repository<Building>,
  ) {}

  async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    const building = this.buildingsRepository.create(createBuildingDto);
    return this.buildingsRepository.save(building);
  }

  async findAll(): Promise<ResponseBuildingDto[]> {
    const buildings = await this.buildingsRepository.find({
      relations: ['type'],
    });

    return plainToInstance(ResponseBuildingDto, buildings, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<Building> {
    const building = await this.buildingsRepository.findOne({ where: { id } });
    if (!building) {
      throw new NotFoundException('Building not found');
    }
    return building;
  }

  async update(
    id: number,
    updateBuildingDto: UpdateBuildingDto,
  ): Promise<Building> {
    const building = await this.findOne(id);
    Object.assign(building, updateBuildingDto);
    return this.buildingsRepository.save(building);
  }

  async remove(id: number): Promise<void> {
    await this.buildingsRepository.delete(id);
  }

  async search(keyword: string): Promise<ResponseBuildingDto[]> {
    const query = this.buildingsRepository
      .createQueryBuilder('building')
      .where('LOWER(building.name) LIKE :keyword', {
        keyword: `%${keyword.toLowerCase()}%`,
      })
      .orWhere('LOWER(building.direction) LIKE :keyword', {
        keyword: `%${keyword.toLowerCase()}%`,
      });

    const results = await query.getMany();

    return plainToInstance(ResponseBuildingDto, results, {
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
}
