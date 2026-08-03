import mongoose, { Schema, Document } from 'mongoose';

export interface IProgram extends Document {
  id: string;
  title: string;
  titleTa?: string;
  shortDesc: string;
  shortDescTa?: string;
  description: string;
  descriptionTa?: string;
  category: string;
  iconName?: string;
  imageUrl: string;
  beneficiariesCount: string;
  beneficiariesCountTa?: string;
  features?: string[];
  featuresTa?: string[];
  createdAt: Date;
}

const ProgramSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  titleTa: { type: String },
  shortDesc: { type: String, required: true },
  shortDescTa: { type: String },
  description: { type: String, required: true },
  descriptionTa: { type: String },
  category: { type: String, default: 'welfare' },
  iconName: { type: String, default: 'Heart' },
  imageUrl: { type: String, required: true },
  beneficiariesCount: { type: String, default: '1,000+' },
  beneficiariesCountTa: { type: String },
  features: [{ type: String }],
  featuresTa: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const Program = mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);
