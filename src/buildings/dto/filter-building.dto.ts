import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;
}
