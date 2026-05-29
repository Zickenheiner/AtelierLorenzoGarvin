import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({
    example: '/static/3b8c2e1f-1234-4abc-9876-abcdef012345.jpg',
    description: 'URL publique du fichier uploadé',
  })
  url: string;
}
