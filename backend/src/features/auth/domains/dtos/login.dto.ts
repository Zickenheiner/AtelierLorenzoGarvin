import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'admin',
    description: "Identifiant de l'admin",
  })
  @IsString()
  @IsNotEmpty()
  identifiant: string;

  @ApiProperty({
    example: 'MotDePasseSecret123!',
    description: "Mot de passe de l'admin",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs...',
    description: 'Refresh token JWT',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class AuthTokensResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs...',
    description: 'Access token JWT (courte durée)',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs...',
    description: 'Refresh token JWT (longue durée)',
  })
  refreshToken: string;

  @ApiProperty({
    example: 'admin',
    description: "Identifiant de l'admin connecté",
  })
  identifiant: string;
}
