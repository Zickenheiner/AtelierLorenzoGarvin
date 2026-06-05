import type { ProjetEntity } from '../../domain/entities/projet.entity';
import type { ProjetRepository } from '../../domain/repositories/projet.repository';
import { ProjetApi } from '../datasources/projet.api';
import type {
  ProjetCreateRequestDto,
  ProjetUpdateRequestDto,
} from '../dtos/projet.dto';
import { ProjetMapper } from '../mappers/projet.mapper';

export class ProjetRepositoryImpl implements ProjetRepository {
  private readonly api = new ProjetApi();

  async findAll(): Promise<ProjetEntity[]> {
    const dtos = await this.api.findAll();
    return dtos.map(ProjetMapper.toEntity);
  }

  async findBySlug(slug: string): Promise<ProjetEntity | null> {
    const dto = await this.api.findBySlug(slug);
    return dto ? ProjetMapper.toEntity(dto) : null;
  }

  async findById(id: string): Promise<ProjetEntity | null> {
    const dto = await this.api.findById(id);
    return dto ? ProjetMapper.toEntity(dto) : null;
  }

  create(data: ProjetCreateRequestDto): Promise<boolean> {
    return this.api.create(data);
  }

  update(id: string, data: ProjetUpdateRequestDto): Promise<boolean> {
    return this.api.update(id, data);
  }

  delete(id: string): Promise<boolean> {
    return this.api.delete(id);
  }

  reorder(ids: string[]): Promise<boolean> {
    return this.api.reorder(ids);
  }
}
