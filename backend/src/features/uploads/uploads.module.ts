import { Module } from '@nestjs/common';
import { UploadsController } from './modules/controllers/uploads.controller';
import { CloudinaryService } from './modules/implementation/services/cloudinary.service';

@Module({
  controllers: [UploadsController],
  providers: [CloudinaryService],
})
export class UploadsModule {}
