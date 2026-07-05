import type {
  ProjetCreateRequestDto,
  ProjetUpdateRequestDto,
} from '../../data/dtos/projet.dto';
import type { ProjetEntity } from '../entities/projet.entity';

export interface ProjetRepository {
  findAll(): Promise<ProjetEntity[]>;
  findBySlug(slug: string): Promise<ProjetEntity | null>;
  findById(id: string): Promise<ProjetEntity | null>;
  create(data: ProjetCreateRequestDto): Promise<boolean>;
  update(id: string, data: ProjetUpdateRequestDto): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  reorder(ids: string[]): Promise<boolean>;
}
