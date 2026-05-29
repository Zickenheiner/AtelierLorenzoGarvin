import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { extname } from 'path';
import { memoryStorage } from 'multer';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export const multerImageOptions: MulterOptions = {
  storage: memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (_req, file, cb) => {
    const mimeOk = ALLOWED_MIMES.has(file.mimetype);
    const extOk = ALLOWED_EXTS.has(extname(file.originalname).toLowerCase());
    if (!mimeOk || !extOk) {
      return cb(
        new BadRequestException(
          'Format non supporté. Formats acceptés : jpg, png, webp.',
        ),
        false,
      );
    }
    cb(null, true);
  },
};
