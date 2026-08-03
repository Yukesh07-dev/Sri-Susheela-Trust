import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  key: string;
  data: any;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true, default: 'TRUST_INFO' },
  data: { type: Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const Settings = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
