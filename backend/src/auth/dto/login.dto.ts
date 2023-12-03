import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'Velikaya_O',
    description: 'Corporate login',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
