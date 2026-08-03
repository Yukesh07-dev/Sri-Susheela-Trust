import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  id: string;
  title: string;
  titleTa?: string;
  category: string;
  type?: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  description?: string;
  createdAt: Date;
}

const GallerySchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  titleTa: { type: String },
  category: { type: String, default: 'General' },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  mediaUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Gallery = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
