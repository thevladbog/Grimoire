import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RequestsType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class FoundRelatedEmployeeDto {
  @ApiProperty({
    example: '1206d249-edba-4f6d-b914-ef3ce309cd88',
  })
  id: string;

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

export class FoundCorporateInfoDto {
  @ApiProperty({
    example: 'e57f4b2a-e40c-489c-98b5-3125d6ebaadc',
  })
  id: string;

  @ApiProperty({
    example: 'Vladimir Borisov',
  })
  nameEn: string;

  @ApiProperty({
    example: 'Vladimir.Borisov@company.com',
  })
  corporateEmail: string;

  @ApiProperty({
    example: 'COMPANY',
  })
  domain: string;

  @ApiProperty({
    example: 'Borisov_Vl',
  })
  login: string;

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
    example: '2c77f7c9-0629-4a44-87cb-9312ee92f214',
  })
  id: string;

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
    example: 'f3b8a207-c284-4d6f-9d37-485fc4bafd87',
  })
  id: string;

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
    example: '75116a69-e256-4b0b-a982-3d071a78bd2b',
  })
  id: string;

  @ApiProperty({
    example: Object.values(RequestsType)[2],
  })
  @IsEnum(RequestsType, {
    message:
      "Request's type must be one of these values: " +
      Object.values(RequestsType).join(', '),
  })
  @IsString()
  type: RequestsType;

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
    example: 'e05f51fb-874d-4bf4-adaf-2ab4a475b744',
  })
  externalId: string;

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

  @ApiProperty({
    type: () => FoundCorporateInfoDto,
    isArray: false,
  })
  @Type(() => FoundCorporateInfoDto)
  CorporateInfo: FoundCorporateInfoDto;
}

export class FoundAllNewcomersDto {
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
    example: 'e05f51fb-874d-4bf4-adaf-2ab4a475b744',
  })
  externalId: string;

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
  @Optional()
  RelatedEmployees: FoundRelatedEmployeeDto[];

  @ApiProperty({
    type: () => FoundCorporateInfoDto,
    isArray: false,
  })
  @Optional()
  @Type(() => FoundCorporateInfoDto)
  CorporateInfo: FoundCorporateInfoDto;
}
