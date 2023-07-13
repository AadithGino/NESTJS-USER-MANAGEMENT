import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class AdminSigninDTO {
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @IsString()
  Password: string;
} 
