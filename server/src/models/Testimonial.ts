import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  id: string;
  name: string;
  nameTa?: string;
  role: string;
  roleTa?: string;
  quote: string;
  quoteTa?: string;
  avatarUrl?: string;
  rating?: number;
  createdAt: Date;
}

const TestimonialSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nameTa: { type: String },
  role: { type: String, required: true },
  roleTa: { type: String },
  quote: { type: String, required: true },
  quoteTa: { type: String },
  avatarUrl: { type: String },
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now },
});

export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
