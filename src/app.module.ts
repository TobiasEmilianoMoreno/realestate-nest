import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildingsModule } from './buildings/buildings.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RevenueModule } from './revenue/revenue.module';

import ormconfig from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRoot(ormconfig),
    BuildingsModule,
    UsersModule,
    AuthModule,
    RevenueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
