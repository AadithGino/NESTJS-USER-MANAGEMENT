import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UserDTO {
  @IsString({ message: 'Enter a valid name' })
  @IsNotEmpty({ message: 'Username is required' })
  Name: string;

  @IsEmail()
  Email: string;

  @IsString()
  Password: string;

  @IsNumber()
  // @MinLength(10)
  // @MaxLength(10)
  Number: number;
}

export class UserLoginDTO {
  
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  Password: string;
}

