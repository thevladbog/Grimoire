import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewcomersService } from 'src/newcomers/newcomers.service';
import { CreateNewcomersDto } from 'src/newcomers/dto/CreateNewcomers.dto';
import { FoundNewcomerDto } from 'src/newcomers/dto/FoundNewcomer.dto';

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
  async createNewcomer(@Body() dto: CreateNewcomersDto): Promise<number> {
    return await this.newcomersService.createNewcomer(dto);
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
