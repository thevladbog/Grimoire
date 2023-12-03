import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto, FoundUserDto, LoginDto, TokensDto } from 'src/auth/dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';
import { User } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  @ApiOperation({ summary: 'SignUp' })
  @ApiCreatedResponse({ type: TokensDto })
  @HttpCode(HttpStatus.CREATED)
  async localSignup(@Body() dto: AuthDto): Promise<TokensDto> {
    return await this.authService.localSignup(dto);
  }

  @Post('/local/signin')
  @ApiOperation({ summary: 'SignIn' })
  @ApiCreatedResponse({ type: TokensDto })
  @HttpCode(HttpStatus.OK)
  async localSignin(@Body() dto: LoginDto): Promise<TokensDto> {
    return await this.authService.localSignin(dto);
  }

  @UseGuards(AtGuard)
  @Post('/local/logout')
  @ApiOperation({ summary: 'Logout' })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('jwt')
  async localLogout(@GetCurrentUser('sub') userId: number): Promise<void> {
    return await this.authService.localLogout(userId);
  }

  @UseGuards(RtGuard)
  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: TokensDto })
  @ApiBearerAuth('jwt-refresh')
  async refreshTokens(
    @GetCurrentUser('sub') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<TokensDto> {
    return await this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AtGuard)
  @Get('/local/myData')
  @ApiOperation({ summary: 'Getting current user info' })
  @ApiBearerAuth('jwt')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: FoundUserDto })
  async getMyData(@GetCurrentUser('sub') userId: number): Promise<User> {
    return await this.authService.getMyData(userId);
  }
}
