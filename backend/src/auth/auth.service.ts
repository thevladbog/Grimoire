import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto, TokensDto } from 'src/auth/dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async localSignup(dto: AuthDto): Promise<TokensDto> {
    const passwordHash = await this.hashData(dto.password);
    const newUser: User = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        name: dto.name,
        surname: dto.surname,
        login: dto.login,
      },
    });

    const tokens: TokensDto = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);

    return tokens;
  }

  async localSignin(dto: LoginDto): Promise<TokensDto> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        login: dto.login,
      },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatches: boolean = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens: TokensDto = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async localLogout(userId: number) {
    await this.prisma.user.update({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async getMyData(userId: number): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    delete user['passwordHash'];
    delete user['hashedRt'];

    return user;
  }

  async refreshTokens(
    userId: number,
    refreshToken: string,
  ): Promise<TokensDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const rtMatches: boolean = await bcrypt.compare(
      refreshToken,
      user.hashedRt,
    );

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens: TokensDto = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, email: string): Promise<TokensDto> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: 60 * 60 * 24 * 12,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, refreshToken: string): Promise<void> {
    const hash: string = await this.hashData(refreshToken);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}
