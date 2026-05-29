import {
  AuthTokensResponseDto,
  LoginDto,
} from '@features/auth/domains/dtos/login.dto';
import { IAdminRepository } from '@features/auth/interfaces/repositories/admin.irepository';
import { IAuthService } from '@features/auth/interfaces/services/auth.iservice';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

interface JwtPayload {
  sub: string;
  identifiant: string;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IAdminRepository')
    private readonly adminRepository: IAdminRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto): Promise<AuthTokensResponseDto> {
    const admin = await this.adminRepository.findByIdentifiant(dto.identifiant);
    if (!admin) {
      throw new UnauthorizedException('Identifiant ou mot de passe invalide');
    }

    const isValid = await argon2.verify(admin.getPasswordHash(), dto.password);
    if (!isValid) {
      throw new UnauthorizedException('Identifiant ou mot de passe invalide');
    }

    return this.issueTokens(admin.getId(), admin.getIdentifiant());
  }

  async refresh(refreshToken: string): Promise<AuthTokensResponseDto> {
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Refresh token invalide');
    }

    const admin = await this.adminRepository.findById(payload.sub);
    if (!admin) {
      throw new UnauthorizedException('Admin introuvable');
    }

    return this.issueTokens(admin.getId(), admin.getIdentifiant());
  }

  async me(adminId: string): Promise<{ id: string; identifiant: string }> {
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) {
      throw new UnauthorizedException('Admin introuvable');
    }
    return { id: admin.getId(), identifiant: admin.getIdentifiant() };
  }

  async seedAdmin(identifiant: string, password: string): Promise<string> {
    const existing = await this.adminRepository.findByIdentifiant(identifiant);
    if (existing) {
      throw new ConflictException(
        `Un admin avec l'identifiant "${identifiant}" existe déjà`,
      );
    }
    const passwordHash = await argon2.hash(password);
    const admin = await this.adminRepository.create(identifiant, passwordHash);
    return admin.getId();
  }

  private async issueTokens(
    adminId: string,
    identifiant: string,
  ): Promise<AuthTokensResponseDto> {
    const payload: JwtPayload = { sub: adminId, identifiant };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn:
          this.configService.get<string>('ACCESS_TOKEN_EXPIRATION_TIME') ??
          '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn:
          this.configService.get<string>('REFRESH_TOKEN_EXPIRATION_TIME') ??
          '7d',
      }),
    ]);

    return { accessToken, refreshToken, identifiant };
  }
}
