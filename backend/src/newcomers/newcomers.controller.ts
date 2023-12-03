import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NewcomersService } from 'src/newcomers/newcomers.service';
import { CreateNewcomersDto } from 'src/newcomers/dto/CreateNewcomers.dto';
import {
  FoundAllNewcomersDto,
  FoundNewcomerDto,
} from 'src/newcomers/dto/FoundNewcomer.dto';

@ApiTags('Newcomers')
@Controller('newcomers')
export class NewcomersController {
  constructor(private readonly newcomersService: NewcomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create newcomer' })
  @ApiResponse({
    status: 201,
    description: 'The newcomer has been successfully created.',
  })
  @ApiResponse({ status: 400, description: "Data isn't unique." })
  @ApiCreatedResponse({ type: Number })
  async createNewcomer(@Body() dto: CreateNewcomersDto): Promise<number> {
    return await this.newcomersService.createNewcomer(dto);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Getting all newcomers' })
  @ApiQuery({
    name: 'corporateInfo',
    type: Boolean,
    description: 'Are you need CorporateInfo data?',
    required: true,
  })
  @ApiQuery({
    name: 'relatedEmployees',
    type: Boolean,
    description: 'Are you need RelatedEmployees data?',
    required: true,
  })
  @ApiOkResponse({
    description: 'The newcomers records',
    type: FoundAllNewcomersDto,
    isArray: true,
  })
  async getAllNewcomers(
    @Query('corporateInfo', ParseBoolPipe) needCorporateInfo?: boolean,
    @Query('relatedEmployees', ParseBoolPipe)
    needRelatedEmployees?: boolean,
  ): Promise<FoundAllNewcomersDto[]> {
    return await this.newcomersService.getAllNewcomers(
      needCorporateInfo,
      needRelatedEmployees,
    );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Getting one newcomer' })
  @ApiResponse({
    status: 200,
    type: FoundNewcomerDto,
  })
  async getOneNewcomer(@Param('id') id: string): Promise<FoundNewcomerDto> {
    return await this.newcomersService.getOneNewcomer(id);
  }
}
