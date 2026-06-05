import {
  CreateProjectDto,
  UpdateProjectDto,
} from '@features/projects/domains/dtos/project.dto';
import { ProjectEntity } from '@features/projects/domains/entities/project.entity';
import {
  IProjectRepository,
  UpdateProjectPayload,
} from '@features/projects/interfaces/repositories/project.irepository';
import { IProjectService } from '@features/projects/interfaces/services/project.iservice';
import { slugify } from '@features/projects/utils/slugify';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ProjectService implements IProjectService {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async findAll(): Promise<ProjectEntity[] | null> {
    return this.projectRepository.findAll();
  }

  async findById(id: string): Promise<ProjectEntity | null> {
    return this.projectRepository.findById(id);
  }

  async findBySlug(slug: string): Promise<ProjectEntity | null> {
    return this.projectRepository.findBySlug(slug);
  }

  async create(dto: CreateProjectDto): Promise<boolean> {
    const title = dto.title.trim();
    const slug = slugify(title);
    if (!slug) {
      throw new BadRequestException(
        'Le titre ne permet pas de générer un slug valide',
      );
    }

    const existingByTitle = await this.projectRepository.findByTitle(title);
    if (existingByTitle) {
      throw new ConflictException(
        `Un projet avec le titre « ${title} » existe déjà`,
      );
    }

    const existingBySlug = await this.projectRepository.findBySlug(slug);
    if (existingBySlug) {
      throw new ConflictException(
        `Un projet avec le slug « ${slug} » existe déjà`,
      );
    }

    const maxOrder = await this.projectRepository.findMaxOrder();
    const order = dto.order ?? maxOrder + 1;

    return this.projectRepository.create({ ...dto, title, slug, order });
  }

  async update(id: string, dto: UpdateProjectDto): Promise<boolean> {
    const existing = await this.projectRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Projet introuvable (id: ${id})`);
    }

    const payload: UpdateProjectPayload = { ...dto };

    if (dto.title !== undefined) {
      const nextTitle = dto.title.trim();
      payload.title = nextTitle;

      if (nextTitle !== existing.getTitle()) {
        const titleConflict =
          await this.projectRepository.findByTitle(nextTitle);
        if (titleConflict && titleConflict.getId() !== id) {
          throw new ConflictException(
            `Un projet avec le titre « ${nextTitle} » existe déjà`,
          );
        }

        const nextSlug = slugify(nextTitle);
        if (!nextSlug) {
          throw new BadRequestException(
            'Le titre ne permet pas de générer un slug valide',
          );
        }

        if (nextSlug !== existing.getSlug()) {
          const slugConflict =
            await this.projectRepository.findBySlug(nextSlug);
          if (slugConflict && slugConflict.getId() !== id) {
            throw new ConflictException(
              `Un projet avec le slug « ${nextSlug} » existe déjà`,
            );
          }
          payload.slug = nextSlug;
        }
      }
    }

    return this.projectRepository.update(id, payload);
  }

  async delete(id: string): Promise<boolean> {
    return this.projectRepository.delete(id);
  }

  async reorder(ids: string[]): Promise<boolean> {
    const projets = await this.projectRepository.findAll();
    const existingCount = projets ? projets.length : 0;

    if (ids.length !== existingCount) {
      throw new BadRequestException(
        'La liste des ids ne correspond pas aux projets existants',
      );
    }

    if (new Set(ids).size !== ids.length) {
      throw new BadRequestException('La liste des ids contient des doublons');
    }

    const existingIds = new Set(projets!.map((p) => p.getId()));
    const allKnown = ids.every((id) => existingIds.has(id));
    if (!allKnown) {
      throw new BadRequestException('Un ou plusieurs ids sont invalides');
    }

    return this.projectRepository.reorder(ids);
  }
}
