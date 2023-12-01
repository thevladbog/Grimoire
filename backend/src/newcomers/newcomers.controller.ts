import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewcomersService } from 'src/newcomers/newcomers.service';
import { CreateNewcomersDto } from 'src/newcomers/dto/CreateNewcomers.dto';

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
}
