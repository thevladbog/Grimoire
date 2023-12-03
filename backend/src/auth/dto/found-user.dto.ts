import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLES } from '@prisma/client';

export class FoundUserDto {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  'id': number;

  @ApiProperty({
    example: 'My.Name@text.me',
    description: 'Email',
  })
  'email': string;

  @ApiProperty({
    example: 'Galina',
    description: 'Name',
  })
  'name': string;

  @ApiProperty({
    example: 'Velikaya',
    description: 'Surname',
  })
  'surname': string;

  @ApiProperty({
    example: 'Velikaya_G',
    description: 'Login',
  })
  'login': string;

  @ApiProperty({
    example: [USER_ROLES.RECRUITER],
    description: 'User roles',
    isArray: true,
  })
  'role': USER_ROLES[];

  @ApiProperty({
    example: 'https://url_to_picture/',
    description: 'User avatar',
  })
  'avatarUrl': string;

  @ApiProperty({
    example: '2023-12-03T19:07:47.429Z',
    description: 'User creation date',
  })
  'createdAt': string;

  @ApiProperty({
    example: '2023-12-03T19:07:47.429Z',
    description: 'User update date',
  })
  'updatedAt': string;
}
