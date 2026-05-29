import { AdminEntity } from '@features/auth/domains/entities/admin.entity';
import { AdminDocument } from '@features/auth/domains/schemas/admin.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminMapper {
  toEntity(doc: AdminDocument): AdminEntity {
    return new AdminEntity(doc._id, doc.identifiant, doc.passwordHash);
  }
}
