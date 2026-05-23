import {
  CreateProjectDto,
  UpdateProjectDto,
} from '@features/projects/domains/dtos/project.dto';
import { ProjectEntity } from '@features/projects/domains/entities/project.entity';

export type CreateProjectPayload = CreateProjectDto & { slug: string };
export type UpdateProjectPayload = UpdateProjectDto & { slug?: string };

export interface IProjectRepository {
  findAll(): Promise<ProjectEntity[] | null>;
  findById(id: string): Promise<ProjectEntity | null>;
  findBySlug(slug: string): Promise<ProjectEntity | null>;
  findByTitle(title: string): Promise<ProjectEntity | null>;
  create(payload: CreateProjectPayload): Promise<boolean>;
  update(id: string, payload: UpdateProjectPayload): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
