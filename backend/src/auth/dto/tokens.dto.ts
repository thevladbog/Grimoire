import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty({
    description: 'Access Jwt Token',
  })
  @IsString()
  'access_token': string;

  @ApiProperty({
    description: 'Refresh JwtToken',
  })
  @IsString()
  'refresh_token': string;
}
