// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { FirebaseAuthStrategy } from './firebase.strategy';
import { UsersModule } from 'src/users/users.module';
import { FirebaseAuthService } from './firebase-auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthService, FirebaseAuthStrategy],
  exports: [AuthService, FirebaseAuthService],
})
export class AuthModule {}
