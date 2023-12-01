import { IsArray, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AccessesForNewcomersDto {
  @ApiProperty({
    example: 'EQUIP125GFTT',
    description: 'Uniq ID',
    required: true,
  })
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    example: 'Jira Atlassian',
    description: 'Name of system',
  })
  readonly name: string;

  @ApiProperty({
    example: 'License',
    description: 'Type of rights',
  })
  readonly type: string;

  @ApiProperty({
    example: 'Для ведения задач',
    description: 'Business justifications',
  })
  readonly comment: string;
}

export class EquipmentForNewcomersDto {
  @ApiProperty({
    example: 'ACCESS125GFTT',
    description: 'Uniq ID',
    required: true,
  })
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    example: 'Standard Laptop (Windows)',
    description: 'Name of system',
  })
  readonly name: string;

  @ApiProperty({
    example: 1,
    description: 'Number of equipments',
  })
  readonly qty: number;

  @ApiProperty({
    example: 'Для работы в офисе',
    description: 'Business justifications',
  })
  readonly comment: string;
}

export class CreateNewcomersDto {
  @ApiProperty({
    example: 'Олег',
    description: 'Russian/English name',
    required: true,
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Борисов', description: 'Russian/English surname' })
  @IsOptional()
  readonly surname: string;

  @ApiProperty({
    example: 'Сергеевич',
    description: 'Russian/English middleName',
    required: true,
  })
  @IsNotEmpty()
  readonly middleName: string;

  @ApiProperty({
    example: 'Ivan.Borisov@text.me',
    description: 'E-mail address',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '+79635236988',
    description: 'Mobile phone number',
    required: true,
  })
  @IsNotEmpty()
  readonly mobile: string;

  @ApiProperty({
    example: 'YYYY-MM-DDTHH:mm:ssZ',
    description: 'First date at company',
    required: true,
  })
  @IsNotEmpty()
  readonly startDate: Date;

  @ApiProperty({
    example: 'Свердловский Иван Владимирович',
    description: 'Linear manager',
  })
  @IsOptional()
  readonly manager: string;

  @ApiProperty({
    example: 'Великая Анна Игоревна',
    description: 'Recruiter',
  })
  @IsOptional()
  readonly recruiter: string;

  @ApiProperty({
    type: () => EquipmentForNewcomersDto,
    isArray: true,
  })
  @IsArray()
  @IsOptional()
  readonly equipment: EquipmentForNewcomersDto[];

  @ApiProperty({
    type: () => AccessesForNewcomersDto,
    isArray: true,
  })
  @Type(() => AccessesForNewcomersDto)
  @IsArray()
  @IsOptional()
  readonly accesses: AccessesForNewcomersDto[];
}
