import { AccessTokenGuard } from '@core/guards/access-token.guard';
import { AtStrategy } from '@core/strategies/at.strategy';
import { AuthModule } from '@features/auth/auth.module';
import { ProjectsModule } from '@features/projects/projects.module';
import { UploadsModule } from '@features/uploads/uploads.module';
import {
  PUBLIC_PREFIX,
  UPLOAD_DEST,
} from '@features/uploads/utils/upload-config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      ignoreEnvFile: false,
      expandVariables: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), UPLOAD_DEST),
      serveRoot: PUBLIC_PREFIX,
      serveStaticOptions: {
        index: false,
        fallthrough: false,
      },
    }),
    AuthModule,
    ProjectsModule,
    UploadsModule,
  ],
  providers: [
    AtStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
