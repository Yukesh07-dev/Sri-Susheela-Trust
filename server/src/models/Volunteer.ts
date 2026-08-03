import mongoose, { Schema, Document } from 'mongoose';

export interface IVolunteer extends Document {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message?: string;
  joinedDate: string;
  status: 'Active' | 'Pending' | 'Inactive';
  createdAt: Date;
}

const VolunteerSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, default: 'N/A' },
  phone: { type: String, required: true },
  role: { type: String, default: 'General Volunteer' },
  message: { type: String, default: '' },
  joinedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  status: { type: String, enum: ['Active', 'Pending', 'Inactive'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export const Volunteer = mongoose.models.Volunteer || mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);
