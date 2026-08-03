import mongoose from 'mongoose';
import { seedDatabaseIfEmpty } from './seed.js';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<db_username>') || uri.includes('<db_password>')) {
    console.log('⚠️  MongoDB URI contains default placeholders (<db_username> / <db_password>).');
    console.log('📦  Using JSON File Storage & Local Fallback mode.');
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log('🍃 MongoDB Atlas Connected Successfully!');
    await seedDatabaseIfEmpty();
    return true;
  } catch (err: any) {
    console.error('❌ MongoDB Atlas Connection Error:', err?.message || err);
    console.log('📦 Falling back to JSON File Storage mode.');
    return false;
  }
};
