import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    example: 'My.Name@text.me',
    description: 'Email',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Olga',
    description: 'Name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Velikaya',
    description: 'Surname',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    example: 'Velikaya_O',
    description: 'Corporate login',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
