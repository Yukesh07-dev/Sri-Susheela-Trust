import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  id: string;
  title: string;
  titleTa?: string;
  publishedDate: string;
  category: string;
  excerpt: string;
  excerptTa?: string;
  content: string;
  contentTa?: string;
  imageUrl: string;
  readTime?: string;
  author?: string;
  createdAt: Date;
}

const NewsSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  titleTa: { type: String },
  publishedDate: { type: String, required: true },
  category: { type: String, default: 'General' },
  excerpt: { type: String, required: true },
  excerptTa: { type: String },
  content: { type: String, required: true },
  contentTa: { type: String },
  imageUrl: { type: String, required: true },
  readTime: { type: String, default: '3 min read' },
  author: { type: String, default: 'Sri Susheela Trust Editorial' },
  createdAt: { type: Date, default: Date.now },
});

export const News = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
