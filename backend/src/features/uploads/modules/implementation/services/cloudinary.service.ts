import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

const DEFAULT_TRANSFORMATIONS = 'f_auto,q_auto';

@Injectable()
export class CloudinaryService implements OnModuleInit {
  private folder = 'uploads';

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');
    const folder = this.configService.get<string>('CLOUDINARY_FOLDER');

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error(
        'Cloudinary non configuré : CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET sont requis',
      );
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    if (folder) this.folder = folder;
  }

  uploadBuffer(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: this.folder,
          resource_type: 'image',
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            return reject(
              new InternalServerErrorException(
                error?.message ?? 'Upload Cloudinary échoué',
              ),
            );
          }
          resolve(this.withTransformations(result.secure_url));
        },
      );

      Readable.from(buffer).pipe(stream);
    });
  }

  private withTransformations(secureUrl: string): string {
    return secureUrl.replace('/upload/', `/upload/${DEFAULT_TRANSFORMATIONS}/`);
  }
}
