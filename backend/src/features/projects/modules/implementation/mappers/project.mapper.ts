import { ProjectEntity } from '@features/projects/domains/entities/project.entity';
import { ProjectDocument } from '@features/projects/domains/schemas/project.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectMapper {
  toEntity(doc: ProjectDocument): ProjectEntity {
    return new ProjectEntity(
      doc._id,
      doc.slug,
      doc.title,
      doc.narrative,
      doc.resume,
      doc.hero,
      doc.spec,
      doc.drawings,
      doc.gallery,
    );
  }
}
