import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Newcomers, Prisma, RequestsType } from '@prisma/client'
import { CreateNewcomersDto } from 'src/newcomers/dto/CreateNewcomers.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  FoundAllNewcomersDto,
  FoundNewcomerDto,
} from 'src/newcomers/dto/FoundNewcomer.dto'
import { TrackerService } from 'src/tracker/tracker.service'
import { CreateNewcomersIssue } from 'src/newcomers/templates'
import { CreateIssueDto } from 'src/tracker/dto'
import { ICreatedIssue } from 'src/tracker/types'

@Injectable()
export class NewcomersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tracker: TrackerService,
  ) {}
  async createNewcomer(dto: CreateNewcomersDto): Promise<number> {
    let newcomer: Newcomers
    try {
      newcomer = await this.prismaService.newcomers.create({
        data: {
          name: dto.name,
          middleName: dto.middleName,
          surname: dto.surname,
          email: dto.email,
          mobile: dto.mobile,
          firstDay: dto.startDate,
          jobTitle: dto.jobTitle,
        },
      })
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException(
            "Email address isn't unique",
            HttpStatus.BAD_REQUEST,
          )
        }
      }
      throw new BadRequestException(e)
    }

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
    })

    if (dto.accesses && dto.accesses.length > 0) {
      const data: Prisma.AccessesCreateManyInput[] = []
      dto.accesses.map((item) =>
        data.push({
          system: item.name,
          comment: item.comment,
          role: item.type,
          internalId: item.id,
          newcId: newcomer.id,
        }),
      )
      await this.prismaService.accesses.createMany({
        data,
      })
    }

    if (dto.equipment && dto.equipment.length > 0) {
      const data: Prisma.EquipmentsCreateManyInput[] = []
      dto.equipment.map((item) =>
        data.push({
          type: item.name,
          comment: item.comment,
          qty: item.count,
          internalId: item.id,
          newcId: newcomer.id,
        }),
      )
      await this.prismaService.equipments.createMany({
        data,
      })
    }

    const summary: string = `Новый сотрудник - ${dto.surname} ${dto.name} ${dto.middleName}`
    const queue: string = 'HIRE'
    const description: string = CreateNewcomersIssue(dto)

    const payload: CreateIssueDto = {
      summary,
      queue,
      description,
    }

    const issue: ICreatedIssue = await this.tracker.createTicket(payload)

    if (issue) {
      await this.prismaService.relatedRequests.create({
        data: {
          type: RequestsType.main,
          requestId: issue.key,
          requestStatus: issue.status.display,
          title: issue.summary,
          lastModified: new Date(issue.updatedAt).toISOString(),
          newcId: newcomer.id,
        },
      })
    }

    return newcomer.id
  }

  async getAllNewcomers(
    needCorporateInfo: boolean = false,
    needRelatedEmployees: boolean = false,
  ): Promise<FoundAllNewcomersDto[]> {
    return this.prismaService.newcomers.findMany({
      include: {
        CorporateInfo: needCorporateInfo,
        RelatedEmployees: needRelatedEmployees,
        RelatedRequests: true,
      },
    })
  }

  async getOneNewcomer(id: string): Promise<FoundNewcomerDto> {
    return this.prismaService.newcomers.findUnique({
      where: {
        id: +id,
      },
      include: {
        RelatedEmployees: true,
        Equipments: true,
        Accesses: true,
        RelatedRequests: true,
        CorporateInfo: true,
      },
    })
  }
}
