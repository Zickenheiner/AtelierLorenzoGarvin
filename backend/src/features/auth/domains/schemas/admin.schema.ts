import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, unique: true, trim: true })
  identifiant: string;

  @Prop({ type: String, required: true })
  passwordHash: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
