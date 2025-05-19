import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private firebaseAuthService: FirebaseAuthService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const isEmailRegisteredInFirebase =
      await this.firebaseAuthService.isEmailRegistered(email);
    if (!isEmailRegisteredInFirebase) {
      throw new UnauthorizedException(
        'El correo electrónico no está registrado en Firebase',
      );
    }

    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }

    return null;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const isEmailRegisteredInFirebase =
      await this.firebaseAuthService.isEmailRegistered(email);
    if (isEmailRegisteredInFirebase) {
      throw new ConflictException('El email ya está registrado en Firebase');
    }

    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new ConflictException(
        'El email ya está registrado en la base de datos',
      );
    }

    try {
      const firebaseUser = await this.firebaseAuthService.createUserInFirebase(
        email,
        password,
      );
      const user = await this.usersService.create({
        email,
        password,
        firebaseUuid: firebaseUser.uid,
      });

      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch {
      throw new InternalServerErrorException(
        'Error al registrar el usuario en Firebase',
      );
    }
  }

  async loginWithFirebase(idToken: string): Promise<{ access_token: string }> {
    const decoded = await this.firebaseAuthService.verifyToken(idToken);
    if (!decoded || !decoded.email) {
      throw new UnauthorizedException(
        'Token de Firebase inválido o email no proporcionado',
      );
    }

    let user = await this.usersService.findByEmail(decoded.email);
    if (!user) {
      user = await this.usersService.create({
        email: decoded.email,
        password: '',
        firebaseUuid: decoded.uid,
      });
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
