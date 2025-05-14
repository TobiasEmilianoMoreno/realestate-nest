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
    priceRange?: string;
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

    if (filters.priceRange) {
      let min: number = 0;
      let max: number = Number.MAX_SAFE_INTEGER;
      switch (filters.priceRange) {
        case '0-50000':
          max = 50000;
          break;
        case '50001-100000':
          min = 50001;
          max = 100000;
          break;
        case '100001-150000':
          min = 100001;
          max = 150000;
          break;
        case '150001-200000':
          min = 150001;
          max = 200000;
          break;
      }
      qb.andWhere('building.price BETWEEN :min AND :max', { min, max });
    }

    const results = await qb.getMany();
    return plainToInstance(ResponseBuildingDto, results, {
      excludeExtraneousValues: true,
    });
  }
}
