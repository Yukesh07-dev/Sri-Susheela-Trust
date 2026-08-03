import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Pending' | 'Read' | 'Replied' | 'Archived';
  adminNotes?: string;
  createdAt: Date;
  updatedAt?: Date;
}

const ContactSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, default: 'N/A' },
  phone: { type: String, required: true },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, default: '' },
  status: { type: String, enum: ['Pending', 'Read', 'Replied', 'Archived'], default: 'Pending' },
  adminNotes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

export const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
