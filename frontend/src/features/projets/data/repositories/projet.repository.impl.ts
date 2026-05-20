import type { ProjetEntity } from '../../domain/entities/projet.entity';
import type { ProjetRepository } from '../../domain/repositories/projet.repository';
import { ProjetApi } from '../datasources/projet.api';
import { ProjetMapper } from '../mappers/projet.mapper';

export class ProjetRepositoryImpl implements ProjetRepository {
  private readonly api = new ProjetApi();

  async findBySlug(slug: string): Promise<ProjetEntity | null> {
    const dto = await this.api.findBySlug(slug);
    return dto ? ProjetMapper.toEntity(dto) : null;
  }
}
