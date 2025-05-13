import { Expose, Type } from 'class-transformer';

export class TypeBuildingDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

export class ResponseBuildingDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  image: string;

  @Expose()
  price: number;

  @Expose()
  size: number;

  @Expose()
  direction: string;

  @Expose()
  sale: boolean;

  @Expose()
  beds?: number | null;

  @Expose()
  floors?: number | null;

  @Expose()
  bathrooms?: number | null;

  @Expose()
  status?: string | null;

  @Expose()
  @Type(() => TypeBuildingDto)
  type: TypeBuildingDto;
}
