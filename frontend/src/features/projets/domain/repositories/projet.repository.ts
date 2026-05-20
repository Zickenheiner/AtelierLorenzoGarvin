import type { ProjetEntity } from '../entities/projet.entity';

export interface ProjetRepository {
  findBySlug(slug: string): Promise<ProjetEntity | null>;
}
