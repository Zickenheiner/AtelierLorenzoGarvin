import { UploadResponseDto } from '@features/uploads/domains/dtos/upload.dto';
import {
  PUBLIC_PREFIX,
  multerImageOptions,
} from '@features/uploads/utils/upload-config';
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

@ApiBearerAuth('AccessToken')
@Controller('uploads')
export class UploadsController {
  @ApiOperation({
    summary: 'Upload une image',
    description:
      'Upload une image (jpg/png/webp, max 5 MB) et retourne son URL publique',
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
  upload(@UploadedFile() file: Express.Multer.File): UploadResponseDto {
    if (!file) {
      throw new BadRequestException('Aucun fichier reçu');
    }
    return { url: `${PUBLIC_PREFIX}/${file.filename}` };
  }
}
