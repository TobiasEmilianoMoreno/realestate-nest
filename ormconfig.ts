import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const common: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: true,
  synchronize: process.env.NODE_ENV === 'development',
};

export default {
  ...common,
  synchronize: process.env.NODE_ENV === 'development',
  migrationsRun: process.env.NODE_ENV !== 'development',
} as DataSourceOptions;
