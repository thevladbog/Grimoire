import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FoundRelatedEmployeeDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'manager',
  })
  type: string;

  @ApiProperty({
    example: 'Борисов Владимир Игоревич',
  })
  name: string;

  @ApiProperty({
    example: 6,
  })
  newcId: number;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  updatedAt: Date;
}

export class FoundEquipmentDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Standart Laptop (Windows)',
  })
  type: string;

  @ApiProperty({
    example: 1,
  })
  qty: number;

  @ApiProperty({
    example: 'Для работы удаленно',
  })
  comment: string;

  @ApiProperty({
    example: 'EQUIP125FDc',
  })
  internalId: string;

  @ApiProperty({
    example: 'EQUIPMENT-145',
  })
  requestId: string;

  @ApiProperty({
    example: 'В работе',
  })
  requestStatus: string;

  @ApiProperty({
    example: 6,
  })
  newcId: number;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  updatedAt: Date;
}

export class FoundAccessDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Jira Atlassian',
  })
  system: string;

  @ApiProperty({
    example: 'Лицензия',
  })
  role: string;

  @ApiProperty({
    example: 'Для работы с тасками',
  })
  comment: string;

  @ApiProperty({
    example: 'ACC589FDDDR2',
  })
  internalId: string;

  @ApiProperty({
    example: 'ACCESSES-365',
  })
  requestId: any;

  @ApiProperty({
    example: 'Необходима дополнительная информация',
  })
  requestStatus: any;

  @ApiProperty({
    example: 6,
  })
  newcId: number;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  updatedAt: Date;
}

export class FoundRelatedRequestDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'sec_check',
  })
  type: string;

  @ApiProperty({
    example: 'SEC-6598',
  })
  requestId: string;

  @ApiProperty({
    example: 'Решено',
  })
  requestStatus: string;

  @ApiProperty({
    example: 'Проведение SecCheck',
  })
  title: string;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  lastModified: Date;

  @ApiProperty({
    example: 6,
  })
  newcId: number;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  updatedAt: Date;
}

export class FoundNewcomerDto {
  @ApiProperty({
    example: 6,
  })
  id: number;

  @ApiProperty({
    example: 'Иван',
  })
  name: string;

  @ApiProperty({
    example: 'Владимирович',
  })
  middleName: string;

  @ApiProperty({
    example: 'Кринков',
  })
  surname: string;

  @ApiProperty({
    example: 'vl.krinkov@textme.ru',
  })
  email: string;

  @ApiProperty({
    example: '+79638527474',
  })
  mobile: string;

  @ApiProperty({
    example: 'Бухгалтер',
  })
  jobTitle: string;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  firstDay: Date;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-12-01T21:59:41.553Z',
  })
  updatedAt: Date;

  @ApiProperty({
    type: () => FoundRelatedEmployeeDto,
    isArray: true,
  })
  @Type(() => FoundRelatedEmployeeDto)
  RelatedEmployees: FoundRelatedEmployeeDto[];

  @ApiProperty({
    type: () => FoundEquipmentDto,
    isArray: true,
  })
  @Type(() => FoundEquipmentDto)
  Equipments: FoundEquipmentDto[];

  @ApiProperty({
    type: () => FoundAccessDto,
    isArray: true,
  })
  @Type(() => FoundAccessDto)
  Accesses: FoundAccessDto[];

  @ApiProperty({
    type: () => FoundRelatedRequestDto,
    isArray: true,
  })
  @Type(() => FoundRelatedRequestDto)
  RelatedRequests: FoundRelatedRequestDto[];
}
