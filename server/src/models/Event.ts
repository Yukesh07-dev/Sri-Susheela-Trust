import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  id: string;
  title: string;
  titleTa?: string;
  date: string;
  time?: string;
  location: string;
  locationTa?: string;
  shortDesc?: string;
  shortDescTa?: string;
  category?: string;
  imageUrl?: string;
  isUpcoming?: boolean;
  registeredCount?: number;
  attendees?: number;
  status: 'Upcoming' | 'Completed' | 'Draft';
  createdAt: Date;
}

const EventSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  titleTa: { type: String },
  date: { type: String, required: true },
  time: { type: String },
  location: { type: String, required: true },
  locationTa: { type: String },
  shortDesc: { type: String },
  shortDescTa: { type: String },
  category: { type: String, default: 'General' },
  imageUrl: { type: String },
  isUpcoming: { type: Boolean, default: true },
  registeredCount: { type: Number, default: 0 },
  attendees: { type: Number, default: 0 },
  status: { type: String, enum: ['Upcoming', 'Completed', 'Draft'], default: 'Upcoming' },
  createdAt: { type: Date, default: Date.now },
});

export const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
