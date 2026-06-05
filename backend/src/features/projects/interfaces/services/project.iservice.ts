import {
  CreateProjectDto,
  UpdateProjectDto,
} from '@features/projects/domains/dtos/project.dto';
import { ProjectEntity } from '@features/projects/domains/entities/project.entity';

export interface IProjectService {
  findAll(): Promise<ProjectEntity[] | null>;
  findById(id: string): Promise<ProjectEntity | null>;
  findBySlug(slug: string): Promise<ProjectEntity | null>;
  create(dto: CreateProjectDto): Promise<boolean>;
  update(id: string, dto: UpdateProjectDto): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  reorder(ids: string[]): Promise<boolean>;
}
