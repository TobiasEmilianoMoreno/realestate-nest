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
      .leftJoinAndSelect('building.type', 'type')
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
}
