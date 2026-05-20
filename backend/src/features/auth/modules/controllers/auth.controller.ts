import { Public } from '@core/decorators/public.decorator';
import {
  AuthTokensResponseDto,
  LoginDto,
  RefreshTokenDto,
} from '@features/auth/domains/dtos/login.dto';
import { IAuthService } from '@features/auth/interfaces/services/auth.iservice';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

const ACCESS_COOKIE_MAX_AGE = 1000 * 60 * 15; // 15 min
const REFRESH_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 jours

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: "Connexion de l'admin",
    description: 'Authentifie un admin et retourne access + refresh tokens',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: AuthTokensResponseDto })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthTokensResponseDto> {
    const tokens = await this.authService.login(dto);
    this.setAuthCookies(res, tokens);
    return tokens;
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Rafraîchit les tokens',
    description:
      'Émet un nouveau couple access/refresh à partir du refresh token (cookie ou body)',
  })
  @ApiBody({ type: RefreshTokenDto, required: false })
  @ApiResponse({ status: 200, type: AuthTokensResponseDto })
  async refresh(
    @Req() req: Request,
    @Body() body: Partial<RefreshTokenDto>,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthTokensResponseDto> {
    const cookies = req.cookies as Record<string, string> | undefined;
    const token = cookies?.refresh_token ?? body?.refreshToken;
    if (!token) {
      const { UnauthorizedException } = await import('@nestjs/common');
      throw new UnauthorizedException('Refresh token manquant');
    }
    const tokens = await this.authService.refresh(token);
    this.setAuthCookies(res, tokens);
    return tokens;
  }

  @Public()
  @Post('logout')
  @HttpCode(204)
  @ApiOperation({ summary: "Déconnexion (vide les cookies d'auth)" })
  logout(@Res({ passthrough: true }) res: Response): void {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }

  @Get('me')
  @ApiBearerAuth('AccessToken')
  @ApiOperation({ summary: "Retourne le profil de l'admin connecté" })
  @ApiResponse({
    status: 200,
    schema: {
      example: { id: '68b4d59919d9b7a94b4fde21', identifiant: 'admin' },
    },
  })
  async me(@Req() req: Request): Promise<{ id: string; identifiant: string }> {
    const user = (req as Request & { user?: { sub: string } }).user;
    if (!user) {
      const { UnauthorizedException } = await import('@nestjs/common');
      throw new UnauthorizedException();
    }
    return this.authService.me(user.sub);
  }

  private setAuthCookies(res: Response, tokens: AuthTokensResponseDto): void {
    const isProd = process.env.NODE_ENV === 'production';
    const cookieOpts = {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: isProd,
    };
    res.cookie('access_token', tokens.accessToken, {
      ...cookieOpts,
      maxAge: ACCESS_COOKIE_MAX_AGE,
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      ...cookieOpts,
      maxAge: REFRESH_COOKIE_MAX_AGE,
    });
  }
}
