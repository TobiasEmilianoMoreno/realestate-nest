import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';
import { TypeBuildingDto } from './response-building.dto';
import { Type } from 'class-transformer';

export class FilterBuildingDto {
  @IsOptional()
  @IsBoolean()
  sale?: boolean;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @Type(() => TypeBuildingDto)
  type?: TypeBuildingDto;

  @IsOptional()
  @IsString()
  typeName?: string;

  @IsOptional()
  @IsIn(['1', '2', '3', '4', '5+'])
  ambientes?: string;

  @IsOptional()
  @IsIn(['0-50000', '50001-100000', '100001-150000', '150001-200000'])
  priceRange?: string;
}
