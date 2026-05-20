import { AdminEntity } from '@features/auth/domains/entities/admin.entity';
import {
  Admin,
  AdminDocument,
} from '@features/auth/domains/schemas/admin.schema';
import { IAdminRepository } from '@features/auth/interfaces/repositories/admin.irepository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminMapper } from '../mappers/admin.mapper';

@Injectable()
export class AdminRepository implements IAdminRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    private readonly adminMapper: AdminMapper,
  ) {}

  async findByIdentifiant(identifiant: string): Promise<AdminEntity | null> {
    const doc = await this.adminModel.findOne({ identifiant }).exec();
    return doc ? this.adminMapper.toEntity(doc) : null;
  }

  async findById(id: string): Promise<AdminEntity | null> {
    const doc = await this.adminModel.findById(id).exec();
    return doc ? this.adminMapper.toEntity(doc) : null;
  }

  async create(
    identifiant: string,
    passwordHash: string,
  ): Promise<AdminEntity> {
    const doc = await new this.adminModel({ identifiant, passwordHash }).save();
    return this.adminMapper.toEntity(doc);
  }

  async updatePassword(id: string, passwordHash: string): Promise<boolean> {
    const result = await this.adminModel
      .findByIdAndUpdate(id, { passwordHash }, { new: true })
      .exec();
    return !!result;
  }
}
