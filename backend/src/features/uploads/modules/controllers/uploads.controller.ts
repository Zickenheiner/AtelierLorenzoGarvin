import { UploadResponseDto } from '@features/uploads/domains/dtos/upload.dto';
import { multerImageOptions } from '@features/uploads/utils/upload-config';
import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CloudinaryService } from '../implementation/services/cloudinary.service';

@ApiBearerAuth('AccessToken')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @ApiOperation({
    summary: 'Upload une image vers Cloudinary',
    description:
      'Upload une image (jpg/png/webp, max 5 MB) vers Cloudinary et retourne son URL avec transformations f_auto,q_auto',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploadée avec succès',
    type: UploadResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Format invalide ou fichier trop volumineux',
  })
  @Post()
  @UseInterceptors(FileInterceptor('file', multerImageOptions))
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponseDto> {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu');
    }
    const url = await this.cloudinaryService.uploadBuffer(file.buffer);
    return { url };
  }
}
