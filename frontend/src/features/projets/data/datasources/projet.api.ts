import request from '@/core/config/api';
import endpoints from '@/core/constants/endpoints';
import { ApiError } from '@/core/errors/api.error';
import type {
  ProjetCreateRequestDto,
  ProjetResponseDto,
  ProjetUpdateRequestDto,
} from '../dtos/projet.dto';

export class ProjetApi {
  private readonly baseUrl = endpoints.projects;

  findAll(): Promise<ProjetResponseDto[]> {
    return request<ProjetResponseDto[]>({
      url: this.baseUrl.list,
      method: 'GET',
    });
  }

  async findBySlug(slug: string): Promise<ProjetResponseDto | null> {
    try {
      return await request<ProjetResponseDto>({
        url: this.baseUrl.bySlug(slug),
        method: 'GET',
      });
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  }

  async findById(id: string): Promise<ProjetResponseDto | null> {
    try {
      return await request<ProjetResponseDto>({
        url: this.baseUrl.byId(id),
        method: 'GET',
      });
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  }

  create(data: ProjetCreateRequestDto): Promise<boolean> {
    return request<boolean>({
      url: this.baseUrl.list,
      method: 'POST',
      data,
    });
  }

  update(id: string, data: ProjetUpdateRequestDto): Promise<boolean> {
    return request<boolean>({
      url: this.baseUrl.byId(id),
      method: 'PATCH',
      data,
    });
  }

  delete(id: string): Promise<boolean> {
    return request<boolean>({
      url: this.baseUrl.byId(id),
      method: 'DELETE',
    });
  }
}
