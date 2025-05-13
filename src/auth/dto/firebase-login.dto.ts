import { IsString, IsNotEmpty } from 'class-validator';

export class FirebaseLoginDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
