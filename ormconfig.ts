import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/users/entities/user.entity';
import { Building } from 'src/buildings/entities/building.entity';
import { BuildingType } from 'src/buildings/entities/building-type.entity';
dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const common: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Building, BuildingType],
  logging: true,
  synchronize: process.env.NODE_ENV === 'development',
};

export default {
  ...common,
  synchronize: process.env.NODE_ENV === 'development',
  migrationsRun: process.env.NODE_ENV !== 'development',
} as DataSourceOptions;
