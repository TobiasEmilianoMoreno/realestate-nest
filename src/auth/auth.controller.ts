import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseLoginDto } from './dto/firebase-login.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() { email, password }: CreateUserDto) {
    return this.authService.register(email, password);
  }

  @Post('/login')
  async login(@Body() { email, password }: LoginDto) {
    const { access_token } = await this.authService.login(email, password);
    return { access_token };
  }

  @Post('firebase/google')
  async firebaseLogin(@Body() { token }: FirebaseLoginDto) {
    if (!token) {
      throw new BadRequestException('Se requiere el token de Firebase');
    }
    const { access_token } = await this.authService.loginWithFirebase(token);
    return { access_token };
  }
}
