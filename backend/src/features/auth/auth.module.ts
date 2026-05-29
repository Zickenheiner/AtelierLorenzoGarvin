import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './domains/schemas/admin.schema';
import { AuthController } from './modules/controllers/auth.controller';
import { AdminMapper } from './modules/implementation/mappers/admin.mapper';
import { AdminRepository } from './modules/implementation/repositories/admin.repository';
import { AuthService } from './modules/implementation/services/auth.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AdminMapper,
    { provide: 'IAdminRepository', useClass: AdminRepository },
    { provide: 'IAuthService', useClass: AuthService },
  ],
  exports: ['IAuthService'],
})
export class AuthModule {}
