import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateNewcomersDto } from 'src/newcomers/dto/CreateNewcomers.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NewcomersService {
  constructor(private readonly prismaService: PrismaService) {}
  async createNewcomer(dto: CreateNewcomersDto): Promise<number> {
    const newcomer = await this.prismaService.newcomers.create({
      data: {
        name: dto.name,
        middleName: dto.middleName,
        surname: dto.surname,
        email: dto.email,
        mobile: dto.mobile,
        firstDay: dto.startDate,
      },
    });

    console.log(newcomer);

    const relatedEmployee =
      await this.prismaService.relatedEmployees.createMany({
        data: [
          {
            type: 'manager',
            name: dto.manager,
            newcId: newcomer.id,
          },
          {
            type: 'recruiter',
            name: dto.recruiter,
            newcId: newcomer.id,
          },
        ],
      });

    if (dto.accesses.length > 0) {
      const data: Prisma.AccessesCreateManyInput[] = [];
      dto.accesses.map((item) =>
        data.push({
          system: item.name,
          comment: item.comment,
          role: item.type,
          internalId: item.id,
          newcId: newcomer.id,
        }),
      );
      await this.prismaService.accesses.createMany({
        data,
      });
    }

    if (dto.equipment.length > 0) {
      const data: Prisma.EquipmentsCreateManyInput[] = [];
      dto.equipment.map((item) =>
        data.push({
          type: item.name,
          comment: item.comment,
          qty: item.qty,
          internalId: item.id,
          newcId: newcomer.id,
        }),
      );
      await this.prismaService.equipments.createMany({
        data,
      });
    }

    console.log(relatedEmployee);
    console.log(dto);
    return newcomer.id;
  }
}
