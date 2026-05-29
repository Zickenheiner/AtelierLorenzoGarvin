import { ProjectEntity } from '@features/projects/domains/entities/project.entity';
import {
  Project,
  ProjectDocument,
} from '@features/projects/domains/schemas/project.schema';
import {
  CreateProjectPayload,
  IProjectRepository,
  UpdateProjectPayload,
} from '@features/projects/interfaces/repositories/project.irepository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectMapper } from '../mappers/project.mapper';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly projectMapper: ProjectMapper,
  ) {}

  async findAll(): Promise<ProjectEntity[] | null> {
    const docs = await this.projectModel.find().exec();
    return docs ? docs.map((doc) => this.projectMapper.toEntity(doc)) : null;
  }

  async findById(id: string): Promise<ProjectEntity | null> {
    const doc = await this.projectModel.findById(id).exec();
    return doc ? this.projectMapper.toEntity(doc) : null;
  }

  async findBySlug(slug: string): Promise<ProjectEntity | null> {
    const doc = await this.projectModel.findOne({ slug }).exec();
    return doc ? this.projectMapper.toEntity(doc) : null;
  }

  async findByTitle(title: string): Promise<ProjectEntity | null> {
    const doc = await this.projectModel.findOne({ title }).exec();
    return doc ? this.projectMapper.toEntity(doc) : null;
  }

  async create(payload: CreateProjectPayload): Promise<boolean> {
    const document = new this.projectModel(payload);
    const created = await document.save();
    return !!created;
  }

  async update(id: string, payload: UpdateProjectPayload): Promise<boolean> {
    const updated = await this.projectModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    return !!updated;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.projectModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
