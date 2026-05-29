import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ _id: false })
export class Spec {
  @Prop({ type: String, required: true })
  label: string;

  @Prop({ type: String, required: true })
  value: string;
}

export const SpecSchema = SchemaFactory.createForClass(Spec);

@Schema({ _id: false })
export class Drawing {
  @Prop({ type: String, required: true })
  img: string;

  @Prop({ type: String, required: true })
  alt: string;
}

export const DrawingSchema = SchemaFactory.createForClass(Drawing);

@Schema({ _id: false })
export class GalleryItem {
  @Prop({ type: String, required: true })
  img: string;

  @Prop({ type: String, required: true })
  alt: string;
}

export const GalleryItemSchema = SchemaFactory.createForClass(GalleryItem);

@Schema({ _id: false })
export class Hero {
  @Prop({ type: String, required: true })
  img: string;

  @Prop({ type: String, required: true })
  alt: string;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, unique: true, trim: true })
  slug: string;

  @Prop({ type: String, required: true, unique: true, trim: true })
  title: string;

  @Prop({ type: String, required: true })
  narrative: string;

  @Prop({ type: String, required: true })
  resume: string;

  @Prop({ type: HeroSchema, required: true })
  hero: Hero;

  @Prop({ type: [SpecSchema], default: [] })
  spec: Spec[];

  @Prop({ type: [DrawingSchema], default: [] })
  drawings: Drawing[];

  @Prop({ type: [GalleryItemSchema], default: [] })
  gallery: GalleryItem[];

  @Prop({ type: Boolean, default: false })
  featured: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
